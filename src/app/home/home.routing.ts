import { HomeComponent, AddComponent, ViewComponent, UpdateComponent, DeleteComponent } from '.';
import { AuthGuard } from '@app/_helpers';
import { CanDeactivateGuard } from '../_helpers/can-deactivate/can-deactivate.guard';
import { top_viewedComponent } from './top_viewed/top_viewed.component';

export const HOME_ROUTES = [
    { path: '', component: HomeComponent },
    { path: 'add', component: AddComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard] },
    { path: 'view', component: ViewComponent },
    { path: 'delete', component: DeleteComponent, canActivate: [AuthGuard] },
    { path: 'update', component: UpdateComponent, canActivate: [AuthGuard] },
    { path: 'top', component: top_viewedComponent , canActivate: [AuthGuard]},
  ];