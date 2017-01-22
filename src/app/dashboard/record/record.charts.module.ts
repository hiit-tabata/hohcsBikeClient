import { NgModule } from '@angular/core';

import { RecordChartsComponent } from "./record.charts.component";
import { BrowserModule }  from '@angular/platform-browser';
import { ChartModule as highchartsModule }       from 'angular2-highcharts';

@NgModule({
    imports: [
        BrowserModule,
        highchartsModule
    ],
    declarations: [
        RecordChartsComponent
    ],
    exports: [RecordChartsComponent]
})

export class RecordChartsModule { }
