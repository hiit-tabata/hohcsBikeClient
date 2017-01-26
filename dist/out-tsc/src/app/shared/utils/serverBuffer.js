var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import Dexie from 'dexie';
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
var HohcsBufferDb = (function (_super) {
    __extends(HohcsBufferDb, _super);
    function HohcsBufferDb() {
        var _this = _super.call(this, "HohcsDatabase") || this;
        _this.version(1).stores({
            RecordTable: "id,dateTime,data,clientId,tags"
        });
        _this.RecordTable.mapToClass(RecordData);
        return _this;
    }
    return HohcsBufferDb;
}(Dexie));
var RecordData = (function () {
    function RecordData() {
    }
    return RecordData;
}());
var RecordBuffer = (function () {
    function RecordBuffer() {
        this.db = new HohcsBufferDb();
    }
    RecordBuffer.prototype.getRecordData = function (recordId) {
        return Observable.fromPromise(this.db.RecordTable.get(recordId));
    };
    RecordBuffer.prototype.put = function (record) {
        var _this = this;
        return Observable.fromPromise(this.db.transaction('rw', this.db.RecordTable, function () {
            _this.db.RecordTable.put(record);
        }));
    };
    RecordBuffer.prototype.add = function (record) {
        var _this = this;
        return Observable.fromPromise(this.db.transaction('rw', this.db.RecordTable, function () {
            _this.db.RecordTable.add(record);
        }));
    };
    RecordBuffer.prototype.delete = function (record) {
        var _this = this;
        return Observable.fromPromise(this.db.transaction('rw', this.db.RecordTable, function () {
            _this.db.RecordTable.delete(record.id);
        }));
    };
    return RecordBuffer;
}());
RecordBuffer = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], RecordBuffer);
export { RecordBuffer };
//# sourceMappingURL=../../../../../../src/app/shared/utils/serverBuffer.js.map