import { Route }                    from '@angular/router';

import { HomeRoutes }               from './home';
import { BlankPageRoutes }          from './blank-page';
import { BSComponentRoutes }        from './bs-component';
import { ClientsRoutes }            from './clients';
import { ClientRoutes }             from './client';
import { RecordRoutes }             from './record';
import { SearchByDateRoute }        from './SearchByDate';
import { DebugRoutes }              from './debug';

import { DashboardComponent }       from './dashboard.component';
import { SidebarComponent }         from '../shared/index';
import { AuthGuard }                from '../shared/auth/AuthGuard';

export const DashboardRoutes: Route[] = [
  	{
    	path: 'dashboard',
    	component: DashboardComponent,
    	children: [
	    	...HomeRoutes,
	    	...BSComponentRoutes,
	    	...BlankPageRoutes,
         ...ClientsRoutes,
         ...ClientRoutes,
         ...RecordRoutes,
         ...SearchByDateRoute,
         ...DebugRoutes
    	],
      canActivate: [AuthGuard]
  	}
];
