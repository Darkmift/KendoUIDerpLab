import { EOSH19, XBT, ETH } from './js/data.js';

$(document).ready(function() {
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

	$('#chart').kendoChart({
		tooltip: { visible: true },
		legend: { position: 'bottom' },
		series: [
			{
				data: XBT,
				name: 'Last Price',
				field: 'size',
				type: 'line',
				style: 'normal',
				markers: { visible: false },
			},
		],
	});

	var dataObj = { EOSH19, XBT, ETH };
	$('#tabs').kendoTabStrip({
		value: 'XBT',
		dataTextField: 'label',
		dataContentField: 'content',
		select: (e) => {
			var dataName = e.item.innerText;
			updatechart(dataName);
		},
		dataSource: [
			{
				label: 'XBT',
				content: '<div id="btc-grid"></div>',
			},
			{
				label: 'ETH',
				content: '<div id="usdt-grid"></div>',
			},
			{
				label: 'EOSH19',
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

	// var uri = `http://www.bitmex.com/api/v1/trade?reverse=false&symbol=XBT&startTime=01-06-2019 05:50:00&endTime=01-07-2019 05:51:30&count=20`;
	var btcData = getDatasource(XBT);
	var btcGridOptions = getGridOptions(btcData);

	// var uri = `http://www.bitmex.com/api/v1/trade?reverse=false&symbol=ETH&startTime=01-06-2019 05:50:00&endTime=01-07-2019 05:51:30&count=20`;
	var usdtData = getDatasource(ETH);
	var usdtGridOptions = getGridOptions(usdtData);
	// var uri = `http://www.bitmex.com/api/v1/trade?reverse=false&symbol=EOSH19&startTime=01-06-2019 05:50:00&endTime=01-07-2019 05:51:30&count=20`;
	var ltcData = getDatasource(EOSH19);
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
	function getDatasource(data) {
		return new kendo.data.DataSource({
			data: data,
			schema: {
				data: function(response) {
					const result = response.map((entry) => {
						return {
							Market: entry.symbol.toUpperCase(),
							LastPrice: entry.price.toFixed(2),
							Volume: entry.size,
						};
					});
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
	function getchartDataSource(data) {
		// startTime=01-06-2019 05:50:00&endTime=01-07-2019 05:51:30
		return new kendo.data.DataSource({
			data: data,
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

	function updatechart(dataName) {
		console.log('TCL: updatechart -> dataName', dataName);
		var chart = $('#chart').data('kendoChart');
		chart.setDataSource(dataObj[dataName]);
	}
});
