var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import * as moment from "moment";
import { Pipe } from '@angular/core';
import { NgModule } from '@angular/core';
export function timeFix(IsoDate) {
    var d = new Date(IsoDate);
    return d.setHours(d.getHours() - 8);
}
export function formatMilliToMins(milliesc) {
    var d = moment.duration(milliesc, 'milliseconds');
    var mins = Math.floor(d.asMinutes());
    var sec = Math.floor(d.asSeconds()) - mins * 60;
    if (mins == 0)
        return sec + "sec";
    return mins + "mins " + sec + "sec";
}
export var formatMilliToMinsPip = (function () {
    function formatMilliToMinsPip() {
    }
    formatMilliToMinsPip.prototype.transform = function (value) {
        return formatMilliToMins(value);
    };
    formatMilliToMinsPip = __decorate([
        Pipe({
            name: 'formatMilliSec'
        }), 
        __metadata('design:paramtypes', [])
    ], formatMilliToMinsPip);
    return formatMilliToMinsPip;
}());
export var TimeFixModule = (function () {
    function TimeFixModule() {
    }
    TimeFixModule = __decorate([
        NgModule({
            imports: [],
            declarations: [
                formatMilliToMinsPip
            ],
            exports: [formatMilliToMinsPip]
        }), 
        __metadata('design:paramtypes', [])
    ], TimeFixModule);
    return TimeFixModule;
}());
//# sourceMappingURL=../../../../../../src/app/shared/utils/timeFix.js.map