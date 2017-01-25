import { Component } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';
import { Router }                 from '@angular/router';

/**
*	This class represents the lazy loaded LoginComponent.
*/

@Component({
	selector: 'login-cmp',
	templateUrl: 'login.component.html',
	styleUrls: ['login.scss']
})

export class LoginComponent {
	Email:string;
	Password:string;
	loading:boolean = false;

	constructor(
		private authService:AuthService,
    private router:Router
	){
	}

	login(){
		console.log("logining");
		this.loading=true;
    this.authService.signin("admin@admin.admin","admin")
		.subscribe(res=>{
			console.log(res);
			this.router.navigateByUrl('/dashboard/home');
		},err=>{
			console.log(err);
		})
		console.log("logining");
	}

}
