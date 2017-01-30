var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchByDateComponent } from './SearchByDate.component';
import { CarouselModule } from 'ng2-bootstrap/ng2-bootstrap';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DatepickerModule } from 'ng2-bootstrap/datepicker';
import { TimeFixModule } from '../../shared/utils/timeFix';
export var SearchByDateModule = (function () {
    function SearchByDateModule() {
    }
    SearchByDateModule = __decorate([
        NgModule({
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
        }), 
        __metadata('design:paramtypes', [])
    ], SearchByDateModule);
    return SearchByDateModule;
}());
//# sourceMappingURL=../../../../../../src/app/dashboard/SearchByDate/SearchByDate.module.js.map