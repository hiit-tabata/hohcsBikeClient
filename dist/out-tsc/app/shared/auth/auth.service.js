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
import { Subject } from 'rxjs';
export var AuthService = (function () {
    function AuthService(userApi, loopBackAuth, router) {
        this.userApi = userApi;
        this.loopBackAuth = loopBackAuth;
        this.router = router;
        this.waitingLoginToken = false;
        console.log("The url is " + environment.BASE_URL);
        LoopBackConfig.setBaseURL(environment.BASE_URL);
        LoopBackConfig.setApiVersion(environment.API_VERSION);
    }
    AuthService.prototype.signin = function (email, password) {
        var _this = this;
        var loginSubject = new Subject();
        this.userApi.login({ email: email, password: password })
            .subscribe(function (token) {
            _this.loopBackAuth.setUser(token);
            _this.userId = token.userId;
            if (_this.waitingLoginToken || !_this.user) {
                _this.userApi.findById(_this.userId).subscribe(function (_user) {
                    _this.user = _user;
                    if (_this.userSubject)
                        _this.userSubject.next(_user);
                    loginSubject.next(_user);
                });
            }
            else {
                loginSubject.next(_this.user);
            }
        }, function (err) {
            _this.router.navigateByUrl('/login');
        });
        return loginSubject;
    };
    AuthService.prototype.isLoggedIn = function () {
        var isLoggedInSubject = new Subject();
        if (this.loopBackAuth.getCurrentUserData()) {
            isLoggedInSubject.next(true);
        }
        else {
            isLoggedInSubject.thrownError(new Error("your are not loggin in"));
        }
        return isLoggedInSubject;
    };
    AuthService.prototype.getUser = function () {
        var _this = this;
        this.userSubject = new Subject();
        if (this.user != undefined) {
            setTimeout(function () {
                _this.userSubject.next(_this.user);
                _this.userSubject = undefined;
            }, 10);
        }
        else {
            if (this.userId == undefined) {
                this.waitingLoginToken = true;
            }
            else {
                this.userApi.findById(this.userId).subscribe(function (_user) {
                    _this.user = _user;
                    _this.userSubject.next(_user);
                    _this.userSubject = undefined;
                });
            }
        }
        return this.userSubject.asObservable();
    };
    AuthService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [UserApi, LoopBackAuth, Router])
    ], AuthService);
    return AuthService;
}());
//# sourceMappingURL=../../../../../src/app/shared/auth/auth.service.js.map