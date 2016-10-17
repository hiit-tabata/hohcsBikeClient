import { Route }                    from '@angular/router';

import { HomeRoutes }               from './home';
import { BlankPageRoutes }          from './blank-page';
import { BSComponentRoutes }        from './bs-component';
import { ClientsRoutes }            from './clients';
import { ClientRoutes }             from './client';

import { DashboardComponent }       from './dashboard.component';

export const DashboardRoutes: Route[] = [
  	{
    	path: 'dashboard',
    	component: DashboardComponent,
    	children: [
	    	...HomeRoutes,
	    	...BSComponentRoutes,
	    	...BlankPageRoutes,
         ...ClientsRoutes,
         ...ClientRoutes
    	]
  	}
];
