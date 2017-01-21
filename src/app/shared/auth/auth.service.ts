import { Injectable }             from '@angular/core';
import { Router }                 from '@angular/router';

import { User }                 from '../sdk/models/User';
import { UserApi }                from '../sdk/services/custom/User';
import { LoopBackConfig }         from '../sdk';
import { environment }            from '../../../environments/environment';
import { LoopBackAuth }           from '../sdk/services/core/auth.service';
import { Subject, Observable, Observer }    from 'rxjs';

@Injectable()
export class AuthService {
  private user:User;
  private userId:string;
  private waitingLoginToken:boolean = false;
  private userSubject:Subject<User>;

  constructor(
    private userApi:UserApi,
    private loopBackAuth:LoopBackAuth,
    private router:Router
  ){
      console.log(`The url is ${environment.BASE_URL}`);
        LoopBackConfig.setBaseURL(environment.BASE_URL);
        LoopBackConfig.setApiVersion(environment.API_VERSION);
  }

  public signin(email:string, password:string){
    let loginSubject = new Subject<User>();
    this.userApi.login({email:email,password:password})
        .subscribe(token=>{
            this.loopBackAuth.setUser(token);
            // this.router.navigate([]);
            this.userId = token.userId;
            if(this.waitingLoginToken || !this.user){
              this.userApi.findById(this.userId).subscribe(_user=>{
                this.user = _user;
                if(this.userSubject)
                  this.userSubject.next(_user);
                loginSubject.next(_user);
              })
            }else{
              loginSubject.next(this.user);
            }
          },
          err=>{
            this.router.navigateByUrl('/login');
          }
        );
    return loginSubject;
  }

  isLoggedIn(){
    let isLoggedInSubject =  new Subject<boolean>();
    if(this.loopBackAuth.getCurrentUserData()){
      isLoggedInSubject.next(true);
    }else{
      isLoggedInSubject.thrownError(new Error("your are not loggin in"))
    }
    return isLoggedInSubject;
  }

  public getUser(){
    this.userSubject = new Subject<User>();
    if(this.user != undefined){
      setTimeout(()=>{
        this.userSubject.next(this.user);
        this.userSubject = undefined;
      },10);
    }else{
      if(this.userId == undefined){
          this.waitingLoginToken = true;
      }else{
        this.userApi.findById(this.userId).subscribe(_user=>{
          this.user = _user;
          this.userSubject.next(_user);
          this.userSubject = undefined;
        })
      }
    }
    return this.userSubject.asObservable();
  }
}
