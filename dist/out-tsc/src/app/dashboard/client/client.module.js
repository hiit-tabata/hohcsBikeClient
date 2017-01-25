var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ClientComponent } from './client.component';
import { EditClientComponent } from "./editClient.component";
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { QuillEditorModule } from 'ng2-quill-editor';
var ClientModule = (function () {
    function ClientModule() {
    }
    return ClientModule;
}());
ClientModule = __decorate([
    NgModule({
        imports: [
            DataTableModule,
            SharedModule,
            RouterModule,
            BrowserModule,
            FormsModule,
            QuillEditorModule
        ],
        declarations: [
            ClientComponent,
            EditClientComponent
        ],
        exports: [ClientComponent]
    })
], ClientModule);
export { ClientModule };
//# sourceMappingURL=../../../../../../src/app/dashboard/client/client.module.js.map