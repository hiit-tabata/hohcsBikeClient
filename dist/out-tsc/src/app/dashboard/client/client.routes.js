import { ClientComponent } from './client.component';
import { EditClientComponent } from "./editClient.component";
export var ClientRoutes = [
    {
        path: 'client/:id',
        component: ClientComponent
    },
    {
        path: 'client/:id/edit',
        component: EditClientComponent
    }
];
//# sourceMappingURL=../../../../../../src/app/dashboard/client/client.routes.js.map