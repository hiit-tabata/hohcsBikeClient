var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { ClientApi } from '../../shared/sdk/services/custom/Client';
import { RecordApi } from '../../shared/sdk/services/custom/Record';
import { Record } from '../../shared/sdk/models/Record';
var EditClientComponent = (function () {
    function EditClientComponent(clientApi, recordApi) {
        this.clientApi = clientApi;
        this.recordApi = recordApi;
        this.isChanged = false;
        this.editorContent = "<p>My HTML</p>";
        this.editorConfig = {
            placeholder: "输入公告内容，支持html"
        };
    }
    EditClientComponent.prototype.onEditorCreated = function (quill) {
        console.log('this is quill object', quill);
    };
    EditClientComponent.prototype.onContentChanged = function (_a) {
        var quill = _a.quill, html = _a.html, text = _a.text;
        this.isChanged = true;
        console.log(quill, html, text);
    };
    EditClientComponent.prototype.submitChanges = function () {
    };
    return EditClientComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Record)
], EditClientComponent.prototype, "record", void 0);
EditClientComponent = __decorate([
    Component({
        selector: 'editClient-component',
        template: "\n    <a routerLink=\"../\" >Back</a>\n    <quill-editor [(ngModel)]=\"editorContent\"\n          [config]=\"editorConfig\"\n          (ready)=\"onEditorCreated($event)\"\n          (change)=\"onContentChanged($event)\"></quill-editor>\n    <button (click)=\"submitChanges()\" >Submit Changes</button>\n    "
    }),
    __metadata("design:paramtypes", [ClientApi,
        RecordApi])
], EditClientComponent);
export { EditClientComponent };
//# sourceMappingURL=../../../../../../src/app/dashboard/client/editClient.component.js.map