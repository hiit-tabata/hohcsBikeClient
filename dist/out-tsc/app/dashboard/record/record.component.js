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
import { ClientApi } from '../../shared/sdk/services/custom/Client';
import { Client } from '../../shared/sdk/models/Client';
import { RecordApi } from '../../shared/sdk/services/custom/Record';
import { Record } from '../../shared/sdk/models/Record';
import { DataSampleApi } from '../../shared/sdk/services/custom/DataSample';
import { Router, ActivatedRoute } from '@angular/router';
import { timeFix } from '../../shared/utils/timeFix';
export var RecordComponent = (function () {
    function RecordComponent(clientApi, recordApi, route, router, dataSampleApi) {
        this.clientApi = clientApi;
        this.recordApi = recordApi;
        this.route = route;
        this.router = router;
        this.dataSampleApi = dataSampleApi;
        this.client = new Client();
        this.record = new Record();
        this.dataStr = "[]";
        this.dataSamples = [];
        this.dataSamplesCount = -1;
        this.recordId = "";
        this.showRawData = false;
        this.sensorEnable = [false, false, false, true, false, false];
        this.downloadingData = false;
        this.calDataOption = [{
                name: "hall sensor relative time",
                enable: false
            }];
        this.type = 'line';
        this.data = {
            datasets: [{
                    label: "loading",
                    data: [{ x: 3, y: 3 }]
                }]
        };
        this.options = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                        type: 'time',
                        position: 'bottom',
                        time: {
                            unit: 'minute',
                            displayFormats: {
                                minute: 'MMM YYYY h:mm:ss a'
                            }
                        }
                    }]
            },
            tooltips: false
        };
        this.calData = {
            datasets: [{
                    label: "loading",
                    data: [{ x: 3, y: 3 }]
                }]
        };
    }
    RecordComponent.prototype.ngOnDestroy = function () {
        document.body.removeEventListener(this.keyDownListener);
    };
    RecordComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getRecord();
        this.keyDownListener = document.body.addEventListener('keydown', function (e) {
            if (e.keyCode == 13) {
                _this.getRecord();
            }
        });
    };
    RecordComponent.prototype.getRecord = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            _this.recordId = params['id'];
            _this.recordApi.findById(_this.recordId, { include: ["client"] }).subscribe(function (_record) {
                _this.record = _record;
                _this.record.dateTime = timeFix(_this.record.dateTime);
                _this.dataSamples = _this.record.dataSamples;
                _this.dataStr = _record.data;
                console.dir(_record);
                if (Date.now() - new Date(_this.record.dateTime).getTime() < 60000 * 25) {
                    console.log("I will auto update ");
                    setTimeout(function () {
                        _this.getRecord();
                    }, 60000);
                }
            }, function (err) { console.log(err); });
            _this.dataSampleApi.count({
                recordId: params['id']
            }).subscribe(function (_count) {
                _this.dataSamplesCount = _count.count;
            });
            _this.updateSensorData();
        });
    };
    RecordComponent.prototype.toggleSensor = function (index) {
        if (this.downloadingData)
            return;
        for (var i = 0; i < this.sensorEnable.length; i++)
            this.sensorEnable[i] = false;
        this.sensorEnable[index] = true;
        this.updateSensorData();
    };
    RecordComponent.prototype.chooseCalResult = function (index) {
        if (this.downloadingData)
            return;
        for (var _i = 0, _a = this.calDataOption; _i < _a.length; _i++) {
            var item = _a[_i];
            item.enable = false;
        }
        this.calDataOption[index].enable = true;
        switch (index) {
            case 0:
                this.calHallRelativeTime();
                break;
        }
    };
    RecordComponent.prototype.calHallRelativeTime = function () {
        var _this = this;
        this.downloadingData = true;
        this.dataSampleApi.find({
            where: {
                sensorId: 6,
                recordId: this.recordId
            }
        }).subscribe(function (result) {
            console.log(result);
            _this.calData = {
                datasets: [{
                        label: _this.calDataOption[0].name,
                        data: [],
                        backgroundColor: '#000000',
                        pointHoverRadius: 0,
                        pointRadius: 0,
                        pointHitRadius: 0,
                        pointHoverBorderWidth: 0,
                        pointBorderWidth: 0
                    }]
            };
            var lastHallRecordTime;
            for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
                var sample = result_1[_i];
                if (sample.value[0] != 0) {
                    if (!lastHallRecordTime) {
                        lastHallRecordTime = sample.dateTime;
                        continue;
                    }
                    _this.calData.datasets[0].data.push({
                        x: sample.dateTime,
                        y: (new Date(sample.dateTime)).getTime() - (new Date(lastHallRecordTime)).getTime()
                    });
                    lastHallRecordTime = sample.dateTime;
                }
            }
            _this.downloadingData = false;
        });
    };
    RecordComponent.prototype.updateSensorData = function () {
        var _this = this;
        console.log("updateSensorData");
        var filter = { where: {
                or: []
            } };
        for (var sensor = 0; sensor < 6; sensor++)
            if (this.sensorEnable[sensor])
                filter.where.or.push({
                    sensorId: (sensor + 1),
                    recordId: this.recordId
                });
        this.downloadingData = true;
        this.dataSampleApi.find(filter).subscribe(function (result) {
            var tmp = {};
            var theColor = [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ];
            _this.data = {
                datasets: []
            };
            var sensorName = ["none", "left back", "right back", "right pat", "left pat", "hall"];
            for (var sensor = 0; sensor < 6; sensor++) {
                if (_this.sensorEnable[sensor]) {
                    tmp[(sensor + 1)] = {
                        label: sensorName[sensor],
                        data: [],
                        backgroundColor: theColor.shift(),
                        pointHoverRadius: 0,
                        pointRadius: 0,
                        pointHitRadius: 0,
                        pointHoverBorderWidth: 0,
                        pointBorderWidth: 0
                    };
                }
            }
            var tmpCounter = 0;
            for (var _i = 0, result_2 = result; _i < result_2.length; _i++) {
                var data = result_2[_i];
                tmp[data.sensorId].data.push({
                    y: data.value[0],
                    x: data.dateTime
                });
            }
            for (var lineName in tmp) {
                _this.data.datasets.push(tmp[lineName]);
            }
            _this.downloadingData = false;
        });
    };
    RecordComponent = __decorate([
        Component({
            selector: 'record',
            templateUrl: './record.component.html',
            styleUrls: ['./record.component.scss']
        }), 
        __metadata('design:paramtypes', [ClientApi, RecordApi, ActivatedRoute, Router, DataSampleApi])
    ], RecordComponent);
    return RecordComponent;
}());
//# sourceMappingURL=../../../../../src/app/dashboard/record/record.component.js.map