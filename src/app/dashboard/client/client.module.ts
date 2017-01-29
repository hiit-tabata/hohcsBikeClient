import { NgModule } from '@angular/core';

import { RouterModule }             from '@angular/router';
import { BrowserModule }  from '@angular/platform-browser';

import { ClientComponent } from './client.component';
import { EditClientComponent } from "./editClient.component";
import {DataTableModule,SharedModule} from 'primeng/primeng';
import { FormsModule }   from '@angular/forms';
import { QuillEditorModule } from 'ng2-quill-editor';
import { TabsModule } from 'ng2-bootstrap';
import {InputSwitchModule} from 'primeng/primeng';
import {TriStateCheckboxModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';

@NgModule({
    imports: [
        DataTableModule,
        SharedModule,
        RouterModule,
        BrowserModule,
        FormsModule,
        QuillEditorModule,
        TabsModule,
        InputSwitchModule,
        TriStateCheckboxModule,
        DropdownModule
    ],
    declarations: [
        ClientComponent,
        EditClientComponent
    ],
    exports: [ClientComponent]
})

export class ClientModule { }
