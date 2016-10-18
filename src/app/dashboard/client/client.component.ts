import { Component, OnInit } from '@angular/core';
import { ClientApi }         from '../../shared/sdk/services/custom/Client';
import { Client }            from '../../shared/sdk/models/Client';
import { RecordApi }         from '../../shared/sdk/services/custom/Record';
import { Record }            from '../../shared/sdk/models/Record';
import { Router, ActivatedRoute, Params }            from '@angular/router';


@Component({
    selector: 'client',
    templateUrl: './client.component.html'
})

export class ClientComponent implements OnInit {
    private clientId: string;
    private client:Client = new Client();
    private records:Record[] = [];

    constructor(
        private clientApi:ClientApi,
        private recordApi:RecordApi,
        private route: ActivatedRoute,
        private router:Router
    ) {}

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.clientId = params['id'];
            console.log(this.clientId);
            //this.carService.getCarsMedium().then(cars => this.cars = cars);
            this.clientApi.findById(this.clientId,{include:"records"}).subscribe(
                _client=>{
                    this.client = _client;
                    this.records = this.client.records;
                    console.log(this.client);
                },
                err=>{   console.log(err);     }
            );
          });

    }
}
