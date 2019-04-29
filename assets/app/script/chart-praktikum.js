"use strict";

// Class definition
var KTamChartsChartsDemo = function() {

    // Private functions
    var demo1 = function() {
        var chart = AmCharts.makeChart("kt_amcharts_1", {
            "rtl": KTUtil.isRTL(),
            "type": "serial",
            "theme": "light",
            "dataProvider": [{
                "praktikum": "Praktikum A1",
                "jumlah": 202
            }, {
                "praktikum": "Praktikum A2",
                "jumlah": 188
            }, {
                "praktikum": "Praktikum A3",
                "jumlah": 180
            }, {
                "praktikum": "Praktikum A4",
                "jumlah": 132
            }, {
                "praktikum": "Praktikum A5",
                "jumlah": 112
            }, {
                "praktikum": "Praktikum A6",
                "jumlah": 111
            }, {
                "praktikum": "Praktikum A7",
                "jumlah": 98
            }, {
                "praktikum": "Praktikum A8",
                "jumlah": 71
            }, {
                "praktikum": "Praktikum A9",
                "jumlah": 66
            }, {
                "praktikum": "Praktikum A10",
                "jumlah": 58
            }],
            "valueAxes": [{
                "gridColor": "#FFFFFF",
                "gridAlpha": 0.2,
                "dashLength": 0
            }],
            "gridAboveGraphs": true,
            "startDuration": 1,
            "graphs": [{
                "balloonText": "[[category]]: <b>[[value]]</b>",
                "borderColor" : "#3e4651",
                "fillAlphas": 1,
                "lineAlpha": 0.2,
                "type": "column",
                "valueField": "jumlah"
                
            }],
            "chartCursor": {
                "categoryBalloonEnabled": false,
                "cursorAlpha": 0,
                "zoomable": false
            },
            "categoryField": "praktikum",
            "categoryAxis": {
                "color" : "#212121",
                "fontSize" : 8,
                "gridPosition": "start",
                "gridAlpha": 0,
                "tickPosition": "start",
                "tickLength": 2,
                "autoResize" : true
            },
            "export": {
                "enabled": true
            }

        });
    }

    return {
        // public functions
        init: function() {
            demo1();
        }
    };
}();

jQuery(document).ready(function() {
    KTamChartsChartsDemo.init();
});