import { Component, OnInit, ViewChild } from '@angular/core';
import { UserApi }                      from '../../shared/sdk/services/custom/User.ts';
import { ClientApi }                    from '../../shared/sdk/services/custom/Client';
import { Client }                       from '../../shared/sdk/models/Client';
import { Dialog }                       from 'primeng/components/dialog/dialog';

@Component({
    selector: 'clients',
    templateUrl: './clients.component.html'
})

export class ClientsComponent{
    constructor() {}
}
