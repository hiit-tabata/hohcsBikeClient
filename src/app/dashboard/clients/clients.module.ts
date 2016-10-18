import { NgModule } from '@angular/core';

import { ClientsComponent } from './clients.component';

import {DataTableModule,SharedModule} from 'primeng/primeng';

@NgModule({
    imports: [
        DataTableModule,
        SharedModule
    ],
    declarations: [ClientsComponent],
    exports: [ClientsComponent]
})

export class ClientsModule { }
