import { Route } from '@angular/router';

import { ClientComponent } from './client.component';

export const ClientRoutes: Route[] = [
	{
		path: 'client/:id',
		component: ClientComponent
	}
];
