import { Component } from '@angular/core';

/**
*	This class represents the lazy loaded DashboardComponent.
*/

@Component({
	selector: 'dashboard-cmp',
	templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {

	constructor(){
		console.log("hello DashboardComponent");
	}
}
