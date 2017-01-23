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
var RecordComponent = (function () {
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
        });
    };
    return RecordComponent;
}());
RecordComponent = __decorate([
    Component({
        selector: 'record',
        templateUrl: './record.component.html',
        styleUrls: ['./record.component.scss']
    }),
    __metadata("design:paramtypes", [ClientApi,
        RecordApi,
        ActivatedRoute,
        Router,
        DataSampleApi])
], RecordComponent);
export { RecordComponent };
//# sourceMappingURL=../../../../../src/app/dashboard/record/record.component.js.map