import { Component, OnInit } from '@angular/core';
import { ClientApi }         from '../../shared/sdk/services/custom/Client';
import { Client }            from '../../shared/sdk/models/Client';
import { RecordApi }         from '../../shared/sdk/services/custom/Record';
import { Record }            from '../../shared/sdk/models/Record';
import { Router, ActivatedRoute, Params }            from '@angular/router';
import * as qrcode            from 'qrcode-generator';
import {ElementRef, Renderer, ViewChild} from '@angular/core';


interface QrCodeJson{
    "version": number,
    "type":   string,
    "email": string,
    "password":string,
    "demo":boolean,
    "duration": number,
    "theme":string,
    "log": boolean,
    "saveLocal": boolean
}


@Component({
    selector: 'client',
    templateUrl: './client.component.html'
})

export class ClientComponent implements OnInit {
    @ViewChild('qrCode') qrCodeHolder:ElementRef;
    private clientId: string;
    private client:Client = new Client();
    private records:Record[] = [];

    constructor(
        private clientApi:ClientApi,
        private recordApi:RecordApi,
        private route: ActivatedRoute,
        private router:Router,
        private renderer: Renderer
    ) {}

    ngOnInit() {
        this.getRecords();
    }

    public getRecords(){
        this.route.params.forEach((params: Params) => {
            this.clientId = params['id'];
            console.log(this.clientId);
            //this.carService.getCarsMedium().then(cars => this.cars = cars);
            this.clientApi.findById(this.clientId,{include:"records"}).subscribe(
                _client=>{
                    this.client = _client;
                    this.records = this.client.records;
                    // console.log(this.client);
                    this.createQrCode(8, "L", this.getQrCodePram(_client.email,_client.username));
                },
                err=>{   console.log(err);     }
            );
          });

    }

    public getQrCodePram(email:string, password:string):QrCodeJson{
        return {
            "version": 1,
            "type":   "gameOption",
            "email": email,
            "password":password,
            "demo":false,
            "duration": 1200,
            "theme":"loop",
            "log": true,
            "saveLocal": true
            }
    }

    public createQrCode(typeNumber:number, errorLevel:string, jsonPram:QrCodeJson){
        var qr = qrcode(typeNumber, errorLevel);
        qr.addData(JSON.stringify(jsonPram));
        qr.make();
        this.qrCodeHolder.nativeElement.innerHTML = qr.createImgTag(4);
        // this.renderer.invokeElementMethod(this.qrCodeHolder.nativeElement,'focus');
    }

    public deleteRecord(record:Record){
        this.recordApi.deleteById(record.id).subscribe(record=>{
            this.records =[];
            this.getRecords();
        },
        err=>{
            console.log(err);
        });
    }
}
