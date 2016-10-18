import { Route } from '@angular/router';

import { RecordComponent } from './record.component';

export const RecordRoutes: Route[] = [
	{
		path: 'record/:id',
		component:RecordComponent
	}
];
