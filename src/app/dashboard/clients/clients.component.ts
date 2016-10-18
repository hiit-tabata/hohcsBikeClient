import { Component, OnInit } from '@angular/core';
import { UserApi }           from '../../shared/sdk/services/custom/User.ts';
import { ClientApi }         from '../../shared/sdk/services/custom/Client';
import { Client }            from '../../shared/sdk/models/Client';


@Component({
    selector: 'clients',
    templateUrl: './clients.component.html'
})

export class ClientsComponent implements OnInit {
    private clients:Client[];

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
    }
}
