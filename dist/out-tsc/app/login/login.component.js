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
export var LoginComponent = (function () {
    function LoginComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.loading = false;
    }
    LoginComponent.prototype.login = function () {
        var _this = this;
        console.log("logining");
        this.loading = true;
        this.authService.signin("admin@admin.admin", "admin")
            .subscribe(function (res) {
            console.log(res);
            _this.router.navigateByUrl('/dashboard/home');
        }, function (err) {
            console.log(err);
        });
        console.log("logining");
    };
    LoginComponent = __decorate([
        Component({
            selector: 'login-cmp',
            templateUrl: 'login.component.html',
            styleUrls: ['login.scss']
        }), 
        __metadata('design:paramtypes', [AuthService, Router])
    ], LoginComponent);
    return LoginComponent;
}());
//# sourceMappingURL=../../../../src/app/login/login.component.js.map