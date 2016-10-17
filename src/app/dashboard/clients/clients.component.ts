import { Component, OnInit } from '@angular/core';
import { UserApi }           from '../../shared/sdk/services/custom/User.ts';

@Component({
    selector: 'clients',
    templateUrl: './clients.component.html'
})

export class ClientsComponent implements OnInit {

    constructor(private userApi: UserApi) {}

    ngOnInit() {
        //this.carService.getCarsMedium().then(cars => this.cars = cars);
    }
}
