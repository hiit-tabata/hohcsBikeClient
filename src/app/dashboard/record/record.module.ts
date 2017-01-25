import { NgModule } from '@angular/core';

import { RecordComponent } from './record.component';
import { RecordChartsComponent } from "./record.charts.component";
import { BrowserModule }  from '@angular/platform-browser';
import { ChartModule } from 'angular2-chartjs';
import {RecordChartsModule } from "./record.charts.module";
@NgModule({
    imports: [
        BrowserModule,
        ChartModule,
        RecordChartsModule
    ],
    declarations: [
        RecordComponent
    ],
    exports: [RecordComponent]
})

export class RecordModule { }
