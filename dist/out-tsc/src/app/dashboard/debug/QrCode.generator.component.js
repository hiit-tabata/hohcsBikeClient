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
import { ElementRef } from '@angular/core';
import * as qrcode from 'qrcode-generator';
export var QrCodeGeneratorComponent = (function () {
    function QrCodeGeneratorComponent() {
        this.stringEditor = "{\"version\":1,\n    \"type\":\"gameOption\",\n    \"email\":\"admin@admin.admin\",\n    \"password\":\"admin\",\n    \"duration\":1200,\n    \"theme\":\"CNY\",\n    \"log\":true}";
    }
    QrCodeGeneratorComponent.prototype.ngOnInit = function () {
        this.createQrCode(this.stringEditor);
    };
    QrCodeGeneratorComponent.prototype.onQrStrChange = function () {
        console.log("onQrStrChange");
        this.createQrCode(this.stringEditor.replace('/n', ''));
    };
    QrCodeGeneratorComponent.prototype.createQrCode = function (str) {
        var qr = qrcode(8, "L");
        qr.addData(str);
        qr.make();
        this.qrCodeHolder.nativeElement.innerHTML = qr.createImgTag(4);
    };
    __decorate([
        ViewChild('qrCode'), 
        __metadata('design:type', ElementRef)
    ], QrCodeGeneratorComponent.prototype, "qrCodeHolder", void 0);
    QrCodeGeneratorComponent = __decorate([
        Component({
            selector: 'QrCodeGeneratorComponent',
            templateUrl: './QrCode.generator.component.html',
            styleUrls: ['./QrCode.generator.component.scss']
        }), 
        __metadata('design:paramtypes', [])
    ], QrCodeGeneratorComponent);
    return QrCodeGeneratorComponent;
}());
//# sourceMappingURL=../../../../../../src/app/dashboard/debug/QrCode.generator.component.js.map