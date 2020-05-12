import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from './not-found/not-found.component';
import {LoginComponent} from './guest/components/login/login.component';
import {EventsTableComponent} from './admin/components/events-table/events-table.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    loadChildren: './guest/guest.module#GuestModule',
  },
  {
    path: 'events',
    component: EventsTableComponent,
    loadChildren: './admin/admin.module#AdminModule'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
