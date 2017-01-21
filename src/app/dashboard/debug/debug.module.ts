import { NgModule } from '@angular/core';

import { RouterModule }             from '@angular/router';
import {DebugComponent } from './debug.component';

import {DataTableModule,SharedModule} from 'primeng/primeng';
import { BrowserModule }  from '@angular/platform-browser';
import {DialogModule} from 'primeng/primeng';

import { FormsModule }        from '@angular/forms';


@NgModule({
    imports: [
        DataTableModule,
        SharedModule,
        RouterModule,
        BrowserModule,
        DialogModule,
        FormsModule
    ],
    declarations: [DebugComponent],
    exports: [DebugComponent]
})

export class DebugModule { }
