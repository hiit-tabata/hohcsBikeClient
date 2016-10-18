import { NgModule } from '@angular/core';

import { RouterModule }             from '@angular/router';
import { BrowserModule }  from '@angular/platform-browser';

import { ClientComponent } from './client.component';
import {DataTableModule,SharedModule} from 'primeng/primeng';

@NgModule({
    imports: [
        DataTableModule,
        SharedModule,
        RouterModule,
        BrowserModule
    ],
    declarations: [ClientComponent],
    exports: [ClientComponent]
})

export class ClientModule { }
