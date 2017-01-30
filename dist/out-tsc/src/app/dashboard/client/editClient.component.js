var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { ClientApi } from '../../shared/sdk/services/custom/Client';
import { Client } from '../../shared/sdk/models/Client';
import { RecordApi } from '../../shared/sdk/services/custom/Record';
import { Router, ActivatedRoute } from '@angular/router';
export var EditClientComponent = (function () {
    function EditClientComponent(clientApi, recordApi, route, router) {
        this.clientApi = clientApi;
        this.recordApi = recordApi;
        this.route = route;
        this.router = router;
        this.changed = false;
        this.showSubmit = false;
        this.editorContent = "<p>My HTML</p>";
        this.editorConfig = {
            placeholder: "输入公告内容，支持html"
        };
        this.client = new Client();
        this.client.remarks = "";
        this.getClient();
    }
    EditClientComponent.prototype.getClient = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            _this.clientId = params['id'];
            _this.clientApi.findById(_this.clientId, {})
                .subscribe(function (_client) {
                console.log(_client);
                _this.client = _client;
                if (!_this.client.remarks)
                    _this.editorContent = "";
                else
                    _this.editorContent = _this.client.remarks;
                _this.changed = false;
            }, function (err) { console.log(err); });
        });
    };
    EditClientComponent.prototype.onEditorCreated = function (quill) {
        var _this = this;
        this.qillObj = quill;
        setTimeout(function () { _this.changed = false; }, 100);
        console.log('this is quill object', quill);
    };
    EditClientComponent.prototype.onContentChanged = function (_a) {
        var quill = _a.quill, html = _a.html, text = _a.text;
        console.log(quill, html, text);
        if (this.editorContent != this.client.remarks)
            this.changed = true;
    };
    EditClientComponent.prototype.submitChanges = function () {
        var _this = this;
        var temp = new Client();
        temp.remarks = this.editorContent;
        this.clientApi.updateAttributes(this.client.id, temp)
            .subscribe(function (res) {
            console.log(res);
            _this.changed = false;
        }, function (err) { console.log(err); });
    };
    EditClientComponent = __decorate([
        Component({
            selector: 'editClient-component',
            template: "\n    <a class=\"btn btn-primary\" routerLink=\"../\" >Back</a>\n    <quill-editor [(ngModel)]=\"editorContent\"\n          [config]=\"editorConfig\"\n          (ready)=\"onEditorCreated($event)\"\n          (change)=\"onContentChanged($event)\"></quill-editor>\n    <button *ngIf=\"changed\" class=\"btn btn-primary\"  (click)=\"submitChanges()\" >Submit Changes</button>\n    "
        }), 
        __metadata('design:paramtypes', [ClientApi, RecordApi, ActivatedRoute, Router])
    ], EditClientComponent);
    return EditClientComponent;
}());
//# sourceMappingURL=../../../../../../src/app/dashboard/client/editClient.component.js.map