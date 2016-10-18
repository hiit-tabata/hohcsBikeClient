import { Component } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service.ts';
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
		private authService:AuthService
	){
		console.log("hello DashboardComponent");
	}
}
