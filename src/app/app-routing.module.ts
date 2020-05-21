import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './guest/components/login/login.component';
import {AuthGuard} from './_guards/auth.guard';
import {IsAdminGuard} from './_guards/is-admin.guard';
import {GuestGuard} from './_guards/guest.guard';
import {isNotAdminGuard} from './_guards/is-not-admin.guard';
import {NotFoundComponent} from './_not-found/not-found.component';
import {AdminDashboardComponent} from './admin/components/dashboard/dashboard.component';
import {UserDashboardComponent} from './user/components/dashboard/dashboard.component';

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
