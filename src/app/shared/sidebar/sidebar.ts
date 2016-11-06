import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service.ts';

@Component({
	selector: 'sidebar-cmp',
	templateUrl: 'sidebar.html',
  styleUrls: ['./sidebar.scss']
})

export class SidebarComponent {
	userName:string = "loading";
	showMenu: string = '';
	addExpandClass(element: any) {
		if (element === this.showMenu) {
			this.showMenu = '0';
		} else {
			this.showMenu = element;
		}
	}
	constructor(
		private authService:AuthService
	){
		this.authService.getUser().subscribe(user=>{
			this.userName = user.username;
		});
	}
}
