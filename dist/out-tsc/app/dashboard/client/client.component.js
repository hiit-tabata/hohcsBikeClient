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
import * as qrcode from 'qrcode-generator';
import { ElementRef, Renderer, ViewChild } from '@angular/core';
import { timeFix } from '../../shared/utils/timeFix';
export var ClientComponent = (function () {
    function ClientComponent(clientApi, recordApi, route, router, renderer) {
        this.clientApi = clientApi;
        this.recordApi = recordApi;
        this.route = route;
        this.router = router;
        this.renderer = renderer;
        this.client = new Client();
        this.records = [];
        this.duration = 1200;
        this.advanceUser = false;
    }
    ClientComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getRecords();
        var keycount = 0;
        this.keyDownListener = document.body.addEventListener('keydown', function (e) {
            if (e.keyCode == 13) {
                keycount++;
                console.log(keycount);
                if (keycount > 7) {
                    alert("you are chi hang! Hi");
                    _this.advanceUser = true;
                }
            }
            else
                keycount = 0;
        });
    };
    ClientComponent.prototype.onMinsValueChange = function () {
        this.createQrCode(8, "L", this.getQrCodePram(this.client.email, this.client.username));
    };
    ClientComponent.prototype.ngOnDestroy = function () {
        document.body.removeEventListener(this.keyDownListener);
    };
    ClientComponent.prototype.getRecords = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            _this.clientId = params['id'];
            console.log(_this.clientId);
            _this.clientApi.findById(_this.clientId, { include: "records" }).subscribe(function (_client) {
                _this.client = _client;
                _this.records = _this.client.records;
                for (var _i = 0, _a = _this.records; _i < _a.length; _i++) {
                    var record = _a[_i];
                    record.dateTime = timeFix(record.dateTime);
                }
                console.log(_this.client);
                _this.createQrCode(8, "L", _this.getQrCodePram(_client.email, _client.username));
            }, function (err) { console.log(err); });
        });
    };
    ClientComponent.prototype.getQrCodePram = function (email, password) {
        return {
            "version": 1,
            "type": "gameOption",
            "email": email,
            "password": password,
            "demo": false,
            "duration": this.duration,
            "theme": "loop",
            "log": true,
            "saveLocal": true
        };
    };
    ClientComponent.prototype.createQrCode = function (typeNumber, errorLevel, jsonPram) {
        var qr = qrcode(typeNumber, errorLevel);
        qr.addData(JSON.stringify(jsonPram));
        qr.make();
        this.qrCodeHolder.nativeElement.innerHTML = qr.createImgTag(4);
    };
    ClientComponent.prototype.deleteRecord = function (record) {
        var _this = this;
        this.recordApi.deleteById(record.id).subscribe(function (record) {
            _this.records = [];
            _this.getRecords();
        }, function (err) {
            console.log(err);
        });
    };
    __decorate([
        ViewChild('qrCode'), 
        __metadata('design:type', ElementRef)
    ], ClientComponent.prototype, "qrCodeHolder", void 0);
    ClientComponent = __decorate([
        Component({
            selector: 'client',
            templateUrl: './client.component.html'
        }), 
        __metadata('design:paramtypes', [ClientApi, RecordApi, ActivatedRoute, Router, Renderer])
    ], ClientComponent);
    return ClientComponent;
}());
//# sourceMappingURL=../../../../../src/app/dashboard/client/client.component.js.map