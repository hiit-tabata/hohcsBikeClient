import { Route } from '@angular/router';

import { RecordComponent } from './record.component';
import { EditRecordComponent } from "./editRecord.component"

export const RecordRoutes: Route[] = [
	{
		path: 'record/:id',
		component:RecordComponent
	},
	{
		path:'record/:id/edit',
		component:EditRecordComponent
	}
];
