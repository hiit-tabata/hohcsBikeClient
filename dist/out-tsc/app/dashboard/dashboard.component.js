var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service.ts';
import { Router } from '@angular/router';
export var DashboardComponent = (function () {
    function DashboardComponent(authService, router) {
        var _this = this;
        this.authService = authService;
        this.router = router;
        authService.isLoggedIn().subscribe(function () { }, function (err) {
            _this.router.navigateByUrl('/login');
        });
        console.log("hello DashboardComponent");
    }
    DashboardComponent = __decorate([
        Component({
            selector: 'dashboard-cmp',
            templateUrl: 'dashboard.component.html',
            styleUrls: ['./dashboard.component.scss']
        }), 
        __metadata('design:paramtypes', [AuthService, Router])
    ], DashboardComponent);
    return DashboardComponent;
}());
//# sourceMappingURL=../../../../src/app/dashboard/dashboard.component.js.map