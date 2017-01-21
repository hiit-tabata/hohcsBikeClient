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
import { RecordApi } from '../../shared/sdk/services/custom/Record';
import { Router, ActivatedRoute } from '@angular/router';
import { Renderer } from '@angular/core';
import { DataSampleApi } from '../../shared/sdk/services/custom/DataSample';
import { timeFix } from '../../shared/utils/timeFix';
export var HomeComponent = (function () {
    function HomeComponent(clientApi, recordApi, route, dataSampleApi, router, renderer) {
        this.clientApi = clientApi;
        this.recordApi = recordApi;
        this.route = route;
        this.dataSampleApi = dataSampleApi;
        this.router = router;
        this.renderer = renderer;
        this.records = [];
        this.recordsDataSamplesCount = {};
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.getRecords();
    };
    HomeComponent.prototype.getRecords = function () {
        var _this = this;
        this.recordsDataSamplesCount = {};
        this.recordApi.find({
            where: {
                dateTime: {
                    gt: Date.now() - 1000 * 60 * 60 * 24 * 7
                }
            },
            include: ["client"]
        }).subscribe(function (_records) {
            _this.records = _records;
            for (var _i = 0, _a = _this.records; _i < _a.length; _i++) {
                var record = _a[_i];
                record.dateTime = timeFix(record.dateTime);
            }
            var _loop_1 = function(record_1) {
                _this.recordsDataSamplesCount[record_1.id] = "loading";
                _this.dataSampleApi.count({
                    recordId: record_1.id
                }).subscribe(function (result) {
                    _this.recordsDataSamplesCount[record_1.id] = result.count;
                });
            };
            for (var _b = 0, _records_1 = _records; _b < _records_1.length; _b++) {
                var record_1 = _records_1[_b];
                _loop_1(record_1);
            }
        }, function (err) { console.log(err); });
    };
    HomeComponent = __decorate([
        Component({
            selector: 'home-cmp',
            styleUrls: ['./home.component.scss'],
            templateUrl: 'home.component.html'
        }), 
        __metadata('design:paramtypes', [ClientApi, RecordApi, ActivatedRoute, DataSampleApi, Router, Renderer])
    ], HomeComponent);
    return HomeComponent;
}());
//# sourceMappingURL=../../../../../src/app/dashboard/home/home.component.js.map