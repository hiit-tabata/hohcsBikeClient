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
import { RecordApi } from '../../shared/sdk/services/custom/Record';
import { DataSampleApi } from '../../shared/sdk/services/custom/DataSample';
export var DebugComponent = (function () {
    function DebugComponent(recordApi, dataSampleApi) {
        this.recordApi = recordApi;
        this.dataSampleApi = dataSampleApi;
    }
    DebugComponent.prototype.regulateData = function () {
        var _this = this;
        this.recordApi.find({
            where: {
                dateTime: {
                    lt: "2017-01-21T00:00:29.000Z"
                }
            }
        })
            .subscribe(function (_records) {
            console.dir(_records);
            var dataList = _records;
            var formmatData = function (samples) {
                var combinedSamples = [];
                var _samples = samples;
                var findRemoveSample = function (dateTime, sensorId) {
                    var targetIndex = _samples.findIndex(function (sample) {
                        return sample.dateTime == dateTime && sample.sensorId == sensorId;
                    });
                    if (targetIndex == -1) {
                        console.dir(_samples);
                        console.log("cannot find a index with target " + sensorId + " " + dateTime);
                        return { value: [0] };
                    }
                    var obj = _samples.splice(targetIndex, 1);
                    if (obj[0].value[0] == null)
                        return { value: [0] };
                    if (obj[0] == null) {
                        console.log("targetIndex is " + targetIndex);
                        console.log(obj);
                        return { value: [0] };
                    }
                    return obj[0];
                };
                var getcombinedSampleWithSameTime = function (mSample) {
                    var result = {
                        timestamp: mSample.dateTime,
                        sensor1: findRemoveSample(mSample.dateTime, "2").value[0],
                        sensor2: findRemoveSample(mSample.dateTime, "3").value[0],
                        sensor3: findRemoveSample(mSample.dateTime, "4").value[0],
                        sensor4: findRemoveSample(mSample.dateTime, "5").value[0],
                        sensor5: findRemoveSample(mSample.dateTime, "6").value[0],
                        sensor6: findRemoveSample(mSample.dateTime, "1").value[0],
                    };
                    return result;
                };
                while (_samples.length > 0) {
                    combinedSamples.push(getcombinedSampleWithSameTime(_samples[0]));
                }
                console.dir(combinedSamples);
                return combinedSamples;
            };
            var requestDataSamples = function (record) {
                console.log("I start working on record " + record.id);
                console.dir(record);
                if (record.processed) {
                    console.log(" " + record.id + " has been processed");
                    console.log(record);
                    requestDataSamples(dataList.shift());
                    return;
                }
                _this.dataSampleApi.find({
                    where: {
                        recordId: record.id
                    }
                }).subscribe(function (dataSamples) {
                    var dataSamplesLength = dataSamples.length;
                    if (dataSamples.length == 0) {
                        _this.recordApi.deleteById(record.id)
                            .subscribe(function (res) {
                            requestDataSamples(dataList.shift());
                            console.log("End  " + record.id + " record regulation, because of the dataSamples.length == 0. Still have " + dataList.length + " to go");
                        }, function (err) { console.error(err); });
                        return;
                    }
                    else {
                        console.log("record " + record.id + " have enough dataSamples (" + dataSamples.length + "). ");
                        console.dir(dataSamples);
                    }
                    var arrayOfCombined = formmatData(dataSamples);
                    record.duration = new Date(arrayOfCombined[arrayOfCombined.length - 1].timestamp).getTime() - new Date(arrayOfCombined[0].timestamp).getTime();
                    record.dataTypes = "pressure,pressure,pressure,pressure,hall,none";
                    record.sensorIds = "1,2,3,4,5,6";
                    record.processed = true;
                    record.data = JSON.stringify(arrayOfCombined);
                    console.log(record);
                    console.log("from length " + dataSamplesLength + " to " + arrayOfCombined.length + " old/6 = " + dataSamplesLength / 6);
                    _this.recordApi.replaceById(record.id, record)
                        .subscribe(function (record) {
                        console.log("End " + record.id + " record regulation. Still have " + dataList.length + " to go");
                        requestDataSamples(dataList.shift());
                    }, function (err) { console.error(err); });
                }, function (err) { console.error(err); });
            };
            requestDataSamples(dataList.shift());
        }, function (err) { console.log(err); });
    };
    DebugComponent = __decorate([
        Component({
            selector: 'debug',
            templateUrl: './debug.component.html'
        }), 
        __metadata('design:paramtypes', [RecordApi, DataSampleApi])
    ], DebugComponent);
    return DebugComponent;
}());
//# sourceMappingURL=../../../../../../src/app/dashboard/debug/qrCode.generator.component.js.map