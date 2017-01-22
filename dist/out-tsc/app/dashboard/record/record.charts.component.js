var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
export var RecordChartsComponent = (function () {
    function RecordChartsComponent() {
        this.dataStr = "";
        this.data = [];
        this.options = [];
        this.hoverEnable = false;
        this.charts = [];
        var sensorName = ["left back", "right back", "right hip", "left hip", "hall"];
        for (var i = 0; i < 5; i++) {
            this.options[i] = {
                chart: {
                    type: 'area'
                },
                title: {
                    text: sensorName[i],
                    align: 'left',
                    margin: 0,
                    x: 30
                },
                credits: {
                    enabled: false
                },
                legend: {
                    enabled: false
                },
                series: [{
                        name: 's1',
                        data: [[Date.now() - 22000, 50], [Date.now() - 1500, 50], [Date.now(), 50]],
                        allowPointSelect: true,
                        fillOpacity: 0.3,
                    }],
                xAxis: {
                    crosshair: true,
                    events: {
                        setExtremes: this.syncExtremes
                    },
                    type: "datetime"
                },
                yAxis: {
                    title: {
                        text: null
                    },
                    min: 0,
                    max: 1024
                },
                plotOptions: {
                    area: {
                        marker: {
                            radius: 2
                        },
                        lineWidth: 1,
                        states: {
                            hover: {
                                lineWidth: 1
                            }
                        },
                        threshold: null
                    }
                },
                tooltip: {
                    positioner: function () {
                        return {
                            x: this.chart.chartWidth - this.label.width,
                            y: -1
                        };
                    },
                    borderWidth: 0,
                    backgroundColor: 'none',
                    pointFormat: '{point.y}',
                    headerFormat: '',
                    shadow: false,
                    style: {
                        fontSize: '18px'
                    },
                    valueDecimals: 1
                },
            };
        }
        this.options[4].yAxis.max = 2;
    }
    RecordChartsComponent.prototype.saveChart = function (chart, id) {
        this.charts[id] = chart;
    };
    RecordChartsComponent.prototype.onChartOver = function (e) {
        if (!this.hoverEnable)
            return;
        for (var _i = 0, _a = this.charts; _i < _a.length; _i++) {
            var chart = _a[_i];
            var event_1 = chart.pointer.normalize(e);
            var point = chart.series[0].searchPoint(event_1, true);
            if (point) {
                point.onMouseOver();
                point.series.chart.xAxis[0].update();
            }
        }
    };
    RecordChartsComponent.prototype.syncExtremes = function (e) {
        if (e.trigger !== 'syncExtremes') {
            for (var i in this.charts) {
                if (i == "0")
                    continue;
                var chart = this.charts[i];
                if (chart.xAxis[0].setExtremes) {
                    chart.xAxis[0].setExtremes(e.min, e.max, undefined, false, { trigger: 'syncExtremes' });
                }
            }
        }
    };
    RecordChartsComponent.prototype.ngOnChanges = function (changes) {
        this.data = JSON.parse(this.dataStr);
        var dataSet = [[], [], [], [], []];
        console.log(this.data[0]);
        for (var i = 0; i < this.data.length; i++)
            if (i % 2 == 0) {
                var dataSample = this.data[i];
                for (var j = 0; j < dataSet.length; j++) {
                    dataSet[j].push([
                        new Date(dataSample["timestamp"]).getTime(),
                        dataSample["sensor" + (j + 1)] ? (+dataSample["sensor" + (j + 1)]) : 0
                    ]);
                }
            }
        for (var i = 0; i < this.charts.length; i++) {
            this.charts[i].series[0].setData(dataSet[i]);
        }
    };
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], RecordChartsComponent.prototype, "dataStr", void 0);
    RecordChartsComponent = __decorate([
        Component({
            selector: 'RecordCharts',
            styleUrls: ['./record.charts.component.scss'],
            templateUrl: './record.charts.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], RecordChartsComponent);
    return RecordChartsComponent;
}());
//# sourceMappingURL=../../../../../src/app/dashboard/record/record.charts.component.js.map