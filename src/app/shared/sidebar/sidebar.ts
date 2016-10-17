import { Component } from '@angular/core';

@Component({
	selector: 'sidebar-cmp',
	templateUrl: 'sidebar.html',
  styleUrls: ['./sidebar.scss']
})

export class SidebarComponent {
	showMenu: string = '';
	addExpandClass(element: any) {
		if (element === this.showMenu) {
			this.showMenu = '0';
		} else {
			this.showMenu = element;
		}
	}
}
