import { NgModule } from '@angular/core';

import { RecordComponent } from './record.component';
import { BrowserModule }  from '@angular/platform-browser';
import { ChartModule } from 'angular2-chartjs';

@NgModule({
    imports: [
        BrowserModule,
        ChartModule
    ],
    declarations: [RecordComponent],
    exports: [RecordComponent]
})

export class RecordModule { }
