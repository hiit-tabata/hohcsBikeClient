var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { UserApi } from '../../shared/sdk/services/custom/User.ts';
import { ClientApi } from '../../shared/sdk/services/custom/Client';
import { Dialog } from 'primeng/components/dialog/dialog';
export var ClientsComponent = (function () {
    function ClientsComponent(userApi, clientApi) {
        this.userApi = userApi;
        this.clientApi = clientApi;
        this.username = "";
        this.email = "";
        this.password = "";
        this.display = false;
    }
    ClientsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.clientApi.find().subscribe(function (_clients) {
            _this.clients = _clients;
        }, function (err) {
            console.log(err);
        });
        if (window.innerWidth < 400)
            this.addClientDialog.width = window.innerWidth;
        else
            this.addClientDialog.width = window.innerWidth * 2 / 3;
    };
    ClientsComponent.prototype.showDialog = function () {
        this.display = true;
    };
    ClientsComponent.prototype.submitAddClient = function () {
        var _this = this;
        this.email = this.username;
        this.password = this.username;
        this.clientApi.create({
            username: this.username,
            email: this.email + "@hohcs.holmantai.net",
            password: this.password
        }).subscribe(function (_client) {
            _this.clients.push(_client);
            _this.display = false;
            _this.username = "";
            _this.email = "";
            _this.password = "";
        }, function (err) {
            console.log(err);
        });
    };
    __decorate([
        ViewChild("addClient"), 
        __metadata('design:type', Dialog)
    ], ClientsComponent.prototype, "addClientDialog", void 0);
    ClientsComponent = __decorate([
        Component({
            selector: 'clients',
            templateUrl: './clients.component.html'
        }), 
        __metadata('design:paramtypes', [UserApi, ClientApi])
    ], ClientsComponent);
    return ClientsComponent;
}());
//# sourceMappingURL=../../../../../src/app/dashboard/clients/clients.component.js.map