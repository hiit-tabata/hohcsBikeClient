import { NgModule } from '@angular/core';

import { RouterModule }             from '@angular/router';
import { ClientsComponent } from './clients.component';

import {DataTableModule,SharedModule} from 'primeng/primeng';
import { BrowserModule }  from '@angular/platform-browser';

@NgModule({
    imports: [
        DataTableModule,
        SharedModule,
        RouterModule,
        BrowserModule
    ],
    declarations: [ClientsComponent],
    exports: [ClientsComponent]
})

export class ClientsModule { }
