import { NgModule } from '@angular/core';

import { RecordComponent } from './record.component';
import { RecordChartsComponent } from "./record.charts.component";
import { BrowserModule }  from '@angular/platform-browser';
import { ChartModule } from 'angular2-chartjs';
import {RecordChartsModule } from "./record.charts.module";
import { RecordBuffer } from '../../shared/utils/serverBuffer';
import { RouterModule }             from '@angular/router';
import { EditRecordComponent } from "./editRecord.component"
import { FormsModule }   from '@angular/forms';
import { QuillEditorModule } from 'ng2-quill-editor';

@NgModule({
    imports: [
        BrowserModule,
        ChartModule,
        RecordChartsModule,
        RouterModule,
        QuillEditorModule,
        FormsModule
    ],
    declarations: [
        RecordComponent,
        EditRecordComponent
    ],
    exports: [RecordComponent],
    providers: [RecordBuffer]
})

export class RecordModule { }
