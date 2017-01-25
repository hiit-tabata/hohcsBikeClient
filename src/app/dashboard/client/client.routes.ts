import { Route } from '@angular/router';

import { ClientComponent } from './client.component';
import { EditClientComponent } from "./editClient.component";

export const ClientRoutes: Route[] = [
	{
		path: 'client/:id',
		component: ClientComponent
	},
	{
		path: 'client/:id/edit',
		component:EditClientComponent
	}
];
