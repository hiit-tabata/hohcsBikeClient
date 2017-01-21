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
import { RouterModule } from '@angular/router';
import { DebugComponent } from './debug.component';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { BrowserModule } from '@angular/platform-browser';
import { DialogModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
export var DebugModule = (function () {
    function DebugModule() {
    }
    DebugModule = __decorate([
        NgModule({
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
        }), 
        __metadata('design:paramtypes', [])
    ], DebugModule);
    return DebugModule;
}());
//# sourceMappingURL=../../../../../src/app/dashboard/debug/debug.module.js.map