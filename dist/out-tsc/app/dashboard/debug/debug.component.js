var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
export var DebugComponent = (function () {
    function DebugComponent() {
        this.charts = [];
        for (var i = 0; i < 5; i++) {
            this[("sensor" + i + "Options")] = {
                title: { text: "angular2-highcharts " + i + " example" },
                series: [{
                        name: 's1',
                        data: [2, 3, 5, 8, 13],
                        allowPointSelect: true
                    }],
                xAxis: {
                    crosshair: true,
                    events: {
                        setExtremes: this.syncExtremes
                    },
                    labels: {
                        format: '{value} km'
                    }
                },
            };
        }
    }
    DebugComponent.prototype.saveChart = function (chart, id) {
        this.charts[id] = chart;
    };
    DebugComponent.prototype.onChartOver = function (e) {
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
    DebugComponent.prototype.syncExtremes = function (e) {
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
    DebugComponent.prototype.ngOnInit = function () { };
    DebugComponent = __decorate([
        Component({
            selector: 'debug',
            templateUrl: './debug.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], DebugComponent);
    return DebugComponent;
}());
//# sourceMappingURL=../../../../../src/app/dashboard/debug/debug.component.js.map