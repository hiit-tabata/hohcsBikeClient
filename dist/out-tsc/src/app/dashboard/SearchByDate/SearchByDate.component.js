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
export var SearchByDateComponent = (function () {
    function SearchByDateComponent(clientApi, recordApi, route, dataSampleApi, router, renderer) {
        this.clientApi = clientApi;
        this.recordApi = recordApi;
        this.route = route;
        this.dataSampleApi = dataSampleApi;
        this.router = router;
        this.renderer = renderer;
        this.records = [];
        this.recordsDataSamplesCount = {};
        this.selectedDate = new Date();
    }
    SearchByDateComponent.prototype.searchDate = function () {
        this.getRecords();
    };
    SearchByDateComponent.prototype.getRecords = function () {
        var _this = this;
        this.recordsDataSamplesCount = {};
        this.recordApi.find({
            where: {
                and: [{
                        dateTime: {
                            gt: this.selectedDate.toISOString()
                        }
                    },
                    {
                        dateTime: {
                            lt: new Date(this.selectedDate.getTime() + 1 * 24 * 60 * 60 * 1000).toISOString()
                        }
                    }]
            },
            include: ["client"]
        }).subscribe(function (_records) {
            _this.records = _records;
            for (var _i = 0, _a = _this.records; _i < _a.length; _i++) {
                var record = _a[_i];
                record.dateTime = timeFix(record.dateTime);
            }
            for (var _b = 0, _records_1 = _records; _b < _records_1.length; _b++) {
                var record_1 = _records_1[_b];
                _this.recordsDataSamplesCount[record_1.id] = "loading";
            }
        }, function (err) { console.log(err); });
    };
    SearchByDateComponent = __decorate([
        Component({
            selector: 'SearchByDate-cmp',
            styleUrls: ['./SearchByDate.component.scss'],
            templateUrl: 'SearchByDate.component.html'
        }), 
        __metadata('design:paramtypes', [ClientApi, RecordApi, ActivatedRoute, DataSampleApi, Router, Renderer])
    ], SearchByDateComponent);
    return SearchByDateComponent;
}());
//# sourceMappingURL=../../../../../../src/app/dashboard/SearchByDate/SearchByDate.component.js.map