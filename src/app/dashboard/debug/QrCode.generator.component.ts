import { Component, OnInit, ViewChild } from '@angular/core';
import {ElementRef, Renderer} from '@angular/core';
import { Moment }  from "moment";
import * as qrcode            from 'qrcode-generator';

@Component({
    selector: 'QrCodeGeneratorComponent',
    templateUrl: './QrCode.generator.component.html',
    styleUrls: ['./QrCode.generator.component.scss']
})

export class QrCodeGeneratorComponent implements OnInit {
    @ViewChild('qrCode') qrCodeHolder:ElementRef;
    private stringEditor=`{"version":1,
    "type":"gameOption",
    "email":"admin@admin.admin",
    "password":"admin",
    "duration":1200,
    "theme":"CNY",
    "log":true}`;

    constructor(
    ) {
    }

    ngOnInit(){
        this.createQrCode(this.stringEditor);
    }

    onQrStrChange(){
        console.log("onQrStrChange");
        this.createQrCode(this.stringEditor.replace('/n',''));
    }

    public createQrCode(str:string){
        var qr = qrcode(8, "L");
        qr.addData(str);
        qr.make();
        this.qrCodeHolder.nativeElement.innerHTML = qr.createImgTag(4);
    }
}
