var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserApi } from '../sdk/services/custom/User';
import { LoopBackConfig } from '../sdk';
import { environment } from '../../../environments/environment';
import { LoopBackAuth } from '../sdk/services/core/auth.service';
export var AuthService = (function () {
    function AuthService(userApi, loopBackAuth, router) {
        this.userApi = userApi;
        this.loopBackAuth = loopBackAuth;
        this.router = router;
        LoopBackConfig.setBaseURL(environment.BASE_URL);
        LoopBackConfig.setApiVersion(environment.API_VERSION);
    }
    AuthService.prototype.signin = function (email, password) {
        var _this = this;
        this.userApi.login({ email: email, password: password })
            .subscribe(function (token) {
            _this.loopBackAuth.setUser(token);
            _this.router.navigate(['/dashboard']);
        }, function (err) {
            alert(err);
        });
    };
    AuthService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [UserApi, LoopBackAuth, Router])
    ], AuthService);
    return AuthService;
}());
//# sourceMappingURL=../../../../../src/app/shared/Auth/auth.service.js.map