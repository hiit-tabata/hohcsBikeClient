import { Component } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';
import { Router }                 from '@angular/router';
/**
*	This class represents the lazy loaded DashboardComponent.
*/

@Component({
	selector: 'dashboard-cmp',
	templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {

	constructor(
		private authService:AuthService,
    private router:Router
	){
		authService.isLoggedIn().subscribe(()=>{},err=>{
			this.router.navigateByUrl('/login');
		})
		console.log("hello DashboardComponent");
	}
}
