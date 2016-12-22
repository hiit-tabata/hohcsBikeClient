import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchByDateComponent } from './SearchByDate.component';
import { CarouselModule } from 'ng2-bootstrap/ng2-bootstrap';
import { RouterModule }             from '@angular/router';
import { BrowserModule }  from '@angular/platform-browser';
import { DatepickerModule } from 'ng2-bootstrap/components/datepicker';
import { FormsModule }   from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        CarouselModule,
        RouterModule,
        BrowserModule,
        DatepickerModule,
        FormsModule
    ],
    declarations: [SearchByDateComponent],
    exports: [SearchByDateComponent]
})

export class SearchByDateModule { }
