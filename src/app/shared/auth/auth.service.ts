import { Injectable }             from '@angular/core';
import { Router }                 from '@angular/router';

import { UserApi }                from '../sdk/services/custom/User';
import { LoopBackConfig }         from '../sdk';
import { environment }            from '../../../environments/environment';
import { LoopBackAuth }           from '../sdk/services/core/auth.service';

@Injectable()
export class AuthService {
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
          },
          err=>{
            this.router.navigateByUrl('/login');
          }
        );
  }
}
