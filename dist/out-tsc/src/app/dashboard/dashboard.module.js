var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RecordModule } from './record/record.module';
import { HomeModule } from './home/home.module';
import { ClientsModule } from './clients/clients.module';
import { ClientModule } from './client/client.module';
import { BlankPageModule } from './blank-page/blankPage.module';
import { BSComponentModule } from './bs-component/bsComponent.module';
import { DebugModule } from './debug/debug.module';
import { SearchByDateModule } from './SearchByDate';
import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from '../shared/index';
export var DashboardModule = (function () {
    function DashboardModule() {
    }
    DashboardModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                RouterModule,
                HomeModule,
                BSComponentModule,
                BlankPageModule,
                ClientsModule,
                ClientModule,
                DebugModule,
                RecordModule,
                SearchByDateModule
            ],
            declarations: [DashboardComponent, SidebarComponent],
            exports: [DashboardComponent, SidebarComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], DashboardModule);
    return DashboardModule;
}());
//# sourceMappingURL=../../../../../src/app/dashboard/dashboard.module.js.map