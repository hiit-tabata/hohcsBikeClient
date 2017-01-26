import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchByDateComponent } from './SearchByDate.component';
import { CarouselModule } from 'ng2-bootstrap/ng2-bootstrap';
import { RouterModule }             from '@angular/router';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { DatepickerModule } from 'ng2-bootstrap/datepicker';
import { TimeFixModule }     from '../../shared/utils/timeFix';

@NgModule({
    imports: [
        CommonModule,
        CarouselModule,
        RouterModule,
        BrowserModule,
        DatepickerModule.forRoot(),
        FormsModule,
        TimeFixModule
    ],
    declarations: [SearchByDateComponent],
    exports: [SearchByDateComponent]
})

export class SearchByDateModule { }
