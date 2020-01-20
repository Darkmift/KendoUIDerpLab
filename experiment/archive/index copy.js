$(document).ready(function() {
	var myCoins = { usdt: 'tether', btc: 'bitcoin', ltc: 'litecoin' };
	$('#splitter').kendoSplitter({
		panes: [
			{
				size: '40%',
				collapsible: true,
			},
			{
				collapsible: true,
			},
		],
	});
	$('#tabs').kendoTabStrip({
		value: 'BTC',
		dataTextField: 'label',
		dataContentField: 'content',
		dataSource: [
			{
				label: 'BTC',
				content: '<div id="btc-grid"></div>',
			},
			{
				label: 'USDT',
				content: '<div id="usdt-grid"></div>',
			},
			{
				label: 'LTC',
				content: '<div id="ltc-grid"></div>',
			},
		],
	});
	$('#picker').kendoDateTimePicker({
		dateInput: true,
		format: 'MM/dd/yyyy h tt',
		timeFormat: 'h:mm tt',
		interval: 60,
	});

	$('#chart').kendoChart({

	});

	var btcData = getDatasource(`https://api.coingecko.com/api/v3/coins/${myCoins.btc}`);
	var btcGridOptions = getGridOptions(btcData);

	var usdtData = getDatasource(`https://api.coingecko.com/api/v3/coins/${myCoins.usdt}`);
	var usdtGridOptions = getGridOptions(usdtData);

	var ltcData = getDatasource(`https://api.coingecko.com/api/v3/coins/${myCoins.ltc}`);
	var ltcGridOptions = getGridOptions(ltcData);

	$('#btc-grid').kendoGrid(btcGridOptions);
	$('#usdt-grid').kendoGrid(usdtGridOptions);
	$('#ltc-grid').kendoGrid(ltcGridOptions);

	$('#button-group').kendoButtonGroup({
		items: [
			{ text: '6H', selected: true },
			{ text: '12H', selected: true },
			{ text: '1D', selected: true },
			{ text: '2D', selected: true },
		],
	});
	function getDatasource(url) {
		return new kendo.data.DataSource({
			transport: {
				read: {
					url: url,
					dataType: 'json',
				},
			},
			schema: {
				data: function(response) {
					const result = {
						Market: response.symbol.toUpperCase(),
						LastPrice: response.market_data.current_price.usd.toFixed(4),
						Volume: response.market_data.total_volume.usd.toFixed(4),
					};
					console.log('TCL: getDatasource -> result', result);
					return result;
				},
				model: {
					fields: {
						Market: { type: 'string' },
						LastPrice: { type: 'number' },
						Volume: { type: 'number' },
					},
				},
			},
		});
	}
	function getchartDataSource(coinName, hours) {
		// startTime=01-06-2019 05:50:00&endTime=01-07-2019 05:51:30
		return new kendo.data.DataSource({
			transport: {
				read: {
					url: `https://www.bitmex.com/api/v1/trade?reverse=false&symbol=${coinName}&startTime=01-06-2019 ${hours[0]}&endTime=01-07-2019 ${hours[1]}&count=1000`,
					dataType: 'json',
				},
			},
			schema: {
				parse: function(response) {
					return response.Data.map(function(item) {
						const { timestamp, symbol, size, price, grossValue } = item;
						return {
							Timestamp: timestamp,
							Label: symbol,
							Amount: size,
							Price: price,
							Total: grossValue,
						};
					});
				},
			},
			aggregate: [
				{ field: 'Price', aggregate: 'count' },
				{ field: 'Price', aggregate: 'min' },
				{ field: 'Price', aggregate: 'max' },
				{ field: 'Price', aggregate: 'average' },
				{ field: 'Price', aggregate: 'sum' },
			],
		});
	}
	function getGridOptions(dataSource) {
		return {
			dataSource: dataSource,
			columns: [
				{ field: 'Market', width: '20%', template: '<strong>#: Market #</strong>' },
				{ field: 'LastPrice' },
				{ field: 'Volume' },
			],
		};
	}
});