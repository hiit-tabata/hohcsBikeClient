import { NgModule } from '@angular/core';

import { RouterModule }             from '@angular/router';
import {DebugComponent } from './debug.component';
import {QrCodeGeneratorComponent} from "./QrCode.generator.component";

import {DataTableModule,SharedModule} from 'primeng/primeng';
import { BrowserModule }  from '@angular/platform-browser';
import {DialogModule} from 'primeng/primeng';

import { FormsModule }        from '@angular/forms';
import { ChartModule }                  from 'angular2-highcharts';
import { TabsModule } from 'ng2-bootstrap';


@NgModule({
    imports: [
        DataTableModule,
        SharedModule,
        RouterModule,
        BrowserModule,
        DialogModule,
        FormsModule,
        ChartModule,
        TabsModule
    ],
    declarations: [
        DebugComponent,
        QrCodeGeneratorComponent
    ],
    exports: [DebugComponent, QrCodeGeneratorComponent]
})

export class DebugModule { }
