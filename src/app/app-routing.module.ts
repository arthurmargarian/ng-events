import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './guest/components/login/login.component';
import {AuthGuard} from './guards/auth.guard';
import {IsAdminGuard} from './guards/is-admin.guard';
import {GuestGuard} from './guards/guest.guard';
import {isNotAdminGuard} from './guards/is-not-admin.guard';
import {AdminDashboardComponent} from './admin/components/dashboard/dashboard.component';
import {UserDashboardComponent} from './user/components/dashboard/dashboard.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {RegisterComponent} from './guest/components/register/register.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuestGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [GuestGuard]
  },
  {
    path: 'events-grid',
    component: UserDashboardComponent,
    canActivate: [AuthGuard, isNotAdminGuard]
  },
  {
    path: 'events-table',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, IsAdminGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({imports: [RouterModule.forRoot(routes)]})
export class AppRoutingModule {
}
