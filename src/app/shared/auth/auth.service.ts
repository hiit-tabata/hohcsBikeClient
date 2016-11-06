import { Injectable }             from '@angular/core';
import { Router }                 from '@angular/router';

import { User }                 from '../sdk/models/User';
import { UserApi }                from '../sdk/services/custom/User';
import { LoopBackConfig }         from '../sdk';
import { environment }            from '../../../environments/environment';
import { LoopBackAuth }           from '../sdk/services/core/auth.service';
import { Subject, Observable }    from 'rxjs';

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
        LoopBackConfig.setBaseURL(environment.BASE_URL);
        LoopBackConfig.setApiVersion(environment.API_VERSION);
  }

  public signin(email:string, password:string){
    this.userApi.login({email:email,password:password})
        .subscribe(token=>{
            this.loopBackAuth.setUser(token);
            // this.router.navigate([]);
            this.userId = token.userId;
            if(this.waitingLoginToken){
              this.userApi.findById(this.userId).subscribe(_user=>{
                this.user = _user;
                this.userSubject.next(_user);
              })
            }
          },
          err=>{
            this.router.navigateByUrl('/login');
          }
        );
  }

  public getUser(){
    this.userSubject = new Subject<User>();
    if(this.user != undefined){
      setTimeout(()=>{
        this.userSubject.next(this.user);
      },10);
    }else{
      if(this.userId == undefined){
          this.waitingLoginToken = true;
      }else{
        this.userApi.findById(this.userId).subscribe(_user=>{
          this.user = _user;
          this.userSubject.next(_user);
        })
      }
    }
    return this.userSubject.asObservable();
  }
}
