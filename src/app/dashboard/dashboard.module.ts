import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { RouterModule }             from '@angular/router';

import { RecordModule }               from './record/record.module';
import { HomeModule }               from './home/home.module';
import { ClientsModule }            from './clients/clients.module';
import { ClientModule }             from './client/client.module';
import { BlankPageModule }          from './blank-page/blankPage.module';
import { BSComponentModule }        from './bs-component/bsComponent.module';
import { SearchByDateModule }       from './SearchByDate';

import { DashboardComponent }       from './dashboard.component';

import { SidebarComponent }         from '../shared/index';

@NgModule({ 
    imports: [
        CommonModule,
    	RouterModule,
    	HomeModule,
    	BSComponentModule,
        BlankPageModule,
        ClientsModule,
        ClientModule,
        RecordModule,
        SearchByDateModule
    ],
    declarations: [DashboardComponent, SidebarComponent],
    exports: [DashboardComponent, SidebarComponent]
})

export class DashboardModule { }
