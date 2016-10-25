import { Component, OnInit, ViewChild } from '@angular/core';
import { UserApi }                      from '../../shared/sdk/services/custom/User.ts';
import { ClientApi }                    from '../../shared/sdk/services/custom/Client';
import { Client }                       from '../../shared/sdk/models/Client';
import { Dialog }                       from 'primeng/components/dialog/dialog';

@Component({
    selector: 'clients',
    templateUrl: './clients.component.html'
})

export class ClientsComponent implements OnInit {
    private clients:Client[];
    @ViewChild("addClient") addClientDialog: Dialog;
    private username:string = "";
    private email:string = "";
    private password:string = ""; //+@hohcs.holmantai.net

    constructor(
        private userApi: UserApi,
        private clientApi:ClientApi
    ) {}

    ngOnInit() {
        //this.carService.getCarsMedium().then(cars => this.cars = cars);
        this.clientApi.find().subscribe(
            _clients=>{
                this.clients = _clients;
            },
            err=>{
                console.log(err);
            }
        );

        if(window.innerWidth < 400)
            this.addClientDialog.width = window.innerWidth;
        else
            this.addClientDialog.width = window.innerWidth*2/3;
    }


    display: boolean = false;

    showDialog() {
        this.display = true;
    }

    submitAddClient(){
        this.email = this.username;
        this.password = this.username;
        this.clientApi.create({
            username:this.username,
            email:this.email+"@hohcs.holmantai.net",
            password:this.password
        }).subscribe(_client=>{
            this.clients.push(_client);
            this.display = false;
            this.username = "";
            this.email = "";
            this.password = ""; //+@hohcs.holmantai.net
        },
        err=>{
            console.log(err);
        });
    }
}
