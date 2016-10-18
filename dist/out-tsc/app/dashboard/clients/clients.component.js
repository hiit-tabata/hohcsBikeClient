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
import { UserApi } from '../../shared/sdk/services/custom/User.ts';
import { ClientApi } from '../../shared/sdk/services/custom/Client';
export var ClientsComponent = (function () {
    function ClientsComponent(userApi, clientApi) {
        this.userApi = userApi;
        this.clientApi = clientApi;
    }
    ClientsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.clientApi.find().subscribe(function (_clients) {
            _this.clients = _clients;
        }, function (err) {
            console.log(err);
        });
    };
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