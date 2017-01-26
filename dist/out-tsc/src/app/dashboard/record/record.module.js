var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RecordComponent } from './record.component';
import { BrowserModule } from '@angular/platform-browser';
import { ChartModule } from 'angular2-chartjs';
import { RecordChartsModule } from "./record.charts.module";
import { RecordBuffer } from '../../shared/utils/serverBuffer';
var RecordModule = (function () {
    function RecordModule() {
    }
    return RecordModule;
}());
RecordModule = __decorate([
    NgModule({
        imports: [
            BrowserModule,
            ChartModule,
            RecordChartsModule
        ],
        declarations: [
            RecordComponent
        ],
        exports: [RecordComponent],
        providers: [RecordBuffer]
    })
], RecordModule);
export { RecordModule };
//# sourceMappingURL=../../../../../../src/app/dashboard/record/record.module.js.map