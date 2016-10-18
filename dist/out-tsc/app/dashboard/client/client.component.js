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
export var ClientComponent = (function () {
    function ClientComponent(clientApi, recordApi, route, router) {
        this.clientApi = clientApi;
        this.recordApi = recordApi;
        this.route = route;
        this.router = router;
        this.client = new Client();
        this.records = [];
    }
    ClientComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            _this.clientId = params['id'];
            console.log(_this.clientId);
            _this.clientApi.findById(_this.clientId, { include: "records" }).subscribe(function (_client) {
                _this.client = _client;
                _this.records = _this.client.records;
                console.log(_this.client);
            }, function (err) { console.log(err); });
        });
    };
    ClientComponent = __decorate([
        Component({
            selector: 'client',
            templateUrl: './client.component.html'
        }), 
        __metadata('design:paramtypes', [ClientApi, RecordApi, ActivatedRoute, Router])
    ], ClientComponent);
    return ClientComponent;
}());
//# sourceMappingURL=../../../../../src/app/dashboard/client/client.component.js.map