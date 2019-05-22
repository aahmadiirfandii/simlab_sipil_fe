

// Create chart instance
var chart = am4core.create("chartdiv", am4charts.XYChart);

// Add data
chart.data = [{
  "date": new Date(2018, 3, 20),
  "value": 10
}, {
  "date": new Date(2018, 3, 21),
  "value": 9
}, {
  "date": new Date(2018, 3, 22),
  "value": 15
}, {
  "date": new Date(2018, 3, 23),
  "value": 6
}, {
  "date": new Date(2018, 3, 24),
  "value": 2
}, {
  "date": new Date(2018, 3, 25),
  "value": 0
}, {
  "date": new Date(2018, 3, 26),
  "value": 0
}];

// Create axes
var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
//dateAxis.dataFields.category = "category";
dateAxis.renderer.grid.template.location = 0;
dateAxis.renderer.minGridDistance = 30;
dateAxis.renderer.labels.template.horizontalCenter = "right";
dateAxis.renderer.labels.template.verticalCenter = "middle";
dateAxis.renderer.labels.template.rotation = 270;
dateAxis.tooltip.disabled = true;
dateAxis.renderer.minHeight = 110;


var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.renderer.minWidth = 20;

// Create series
var series = chart.series.push(new am4charts.ColumnSeries());
series.sequencedInterpolation = true;
series.dataFields.valueY = "value";
series.dataFields.dateX = "date";
series.name = "Sales";
series.tooltipText = "[{dateX}: bold]{valueY}[/]";
series.columns.template.strokeWidth = 0;

series.tooltip.pointerOrientation = "vertical";

series.columns.template.column.cornerRadiusTopLeft = 10;
series.columns.template.column.cornerRadiusTopRight = 10;
series.columns.template.column.fillOpacity = 0.7;

// on hover, make corner radiuses bigger
var hoverState = series.columns.template.column.states.create("hover");
hoverState.properties.cornerRadiusTopLeft = 0;
hoverState.properties.cornerRadiusTopRight = 0;
hoverState.properties.fillOpacity = 1;

series.columns.template.adapter.add("fill", function(fill, target) {
return chart.colors.getIndex(target.dataItem.index);
});

// Cursor
chart.cursor = new am4charts.XYCursor();


// Create scrollbars
/*chart.scrollbarX = new am4core.Scrollbar();*/