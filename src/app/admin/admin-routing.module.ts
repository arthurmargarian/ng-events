import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EventsTableComponent} from './components/events-table/events-table.component';
import {NotFoundComponent} from '../not-found/not-found.component';

const routes: Routes = [
  {
    path: 'events',
    component: EventsTableComponent
  },
  {
    path:'**',
    component:NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
