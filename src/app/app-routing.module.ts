import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './guest/components/login/login.component';
import {EventsGridComponent} from './user/components/events-grid/events-grid.component';
import {EventsTableComponent} from './admin/components/events-table/events-table.component';
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
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'events-grid',
    component: EventsGridComponent
  },
  {
    path: 'events-table',
    component: EventsTableComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({imports: [RouterModule.forRoot(routes)]})
export class AppRoutingModule {
}
