import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';
import { RegisterComponent } from './register';
import { HOME_ROUTES } from './home/home.routing';
import { ProfileComponent } from './profile';
import { CanDeactivateGuard } from './_helpers/can-deactivate/can-deactivate.guard';
// import {CanDeactivateGuard} from './can-deactivate/can-deactivate.guard';

const routes: Routes = [
    { path: '', redirectTo: 'product', pathMatch: 'full'},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent, canDeactivate:[CanDeactivateGuard] },
    { path: 'profile', component: ProfileComponent },
    { path: 'product', children: HOME_ROUTES },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);