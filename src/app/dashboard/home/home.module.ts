import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { CarouselModule } from 'ng2-bootstrap/ng2-bootstrap';
import { RouterModule }             from '@angular/router';
import { BrowserModule }  from '@angular/platform-browser';


@NgModule({
    imports: [
        CommonModule,
        CarouselModule,
        RouterModule,
        BrowserModule
    ],
    declarations: [HomeComponent],
    exports: [HomeComponent]
})

export class HomeModule { }
