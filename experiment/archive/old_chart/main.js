var stats = [
	{
		value1: 30,
		value2: 1,
		date1: new Date('2011/12/20'),
		date2: new Date('2012/01/01'),
	},
	{
		value1: 50,
		value2: 2,
		date1: new Date('2011/12/21'),
		date2: new Date('2012/01/04'),
	},
	{
		value1: 45,
		value2: 3,
		date1: new Date('2011/12/24'),
		date2: new Date('2012/01/05'),
	},
];

$('#chart').kendoChart({
	dataSource: {
		data: stats,
	},
	seriesDefaults: {
		type: 'line',
	},
	series: [
		{
			field: 'value1',
			categoryField: 'date1',
			categoryAxis: 'cat1',
		},
		{
			field: 'value2',
			categoryField: 'date2',
			categoryAxis: 'cat2',
		},
		{
			field: 'value3',
			categoryField: 'date2',
			categoryAxis: 'cat3',
		},
	],
	categoryAxis: [
		{
			labels: {
				background: 'green',
				color: 'white',
			},
			name: 'cat1',
			baseUnit: 'days',
			justified: true,
		},
		{
			labels: {
				background: 'orange',
				color: 'red',
			},
			name: 'cat2',
			baseUnit: 'days',
			justified: true,
		},
		{
			name: 'cat3',
			baseUnit: 'days',
			background: '#B4A5A2',
			justified: true,
		},
	],
});
