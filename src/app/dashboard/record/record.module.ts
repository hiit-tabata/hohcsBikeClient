import { NgModule } from '@angular/core';

import { RecordComponent } from './record.component';
import { BrowserModule }  from '@angular/platform-browser';

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [RecordComponent],
    exports: [RecordComponent]
})

export class RecordModule { }
