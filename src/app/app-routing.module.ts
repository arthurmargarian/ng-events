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

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuestGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
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
