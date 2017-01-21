import { HomeRoutes } from './home';
import { BlankPageRoutes } from './blank-page';
import { BSComponentRoutes } from './bs-component';
import { ClientsRoutes } from './clients';
import { ClientRoutes } from './client';
import { RecordRoutes } from './record';
import { SearchByDateRoute } from './SearchByDate';
import { DebugRoutes } from './debug';
import { DashboardComponent } from './dashboard.component';
export var DashboardRoutes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: HomeRoutes.concat(BSComponentRoutes, BlankPageRoutes, ClientsRoutes, ClientRoutes, RecordRoutes, SearchByDateRoute, DebugRoutes)
    }
];
//# sourceMappingURL=../../../../src/app/dashboard/dashboard.routes.js.map