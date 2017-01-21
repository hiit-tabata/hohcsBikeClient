import { Component, OnInit, ViewChild } from '@angular/core';
import { UserApi }                      from '../../shared/sdk/services/custom/User.ts';
import { ClientApi }                    from '../../shared/sdk/services/custom/Client';
import { Client }                       from '../../shared/sdk/models/Client';
import { Dialog }                       from 'primeng/components/dialog/dialog';

@Component({
    selector: 'debug',
    templateUrl: './debug.component.html'
})

export class DebugComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
