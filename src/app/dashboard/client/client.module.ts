import { NgModule } from '@angular/core';

import { ClientComponent } from './client.component';

import {DataTableModule,SharedModule} from 'primeng/primeng';

@NgModule({
    imports: [
        DataTableModule,
        SharedModule
    ],
    declarations: [ClientComponent],
    exports: [ClientComponent]
})

export class ClientModule { }
