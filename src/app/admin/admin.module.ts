import {NgModule} from '@angular/core';
import {EventsTableComponent} from './components/events-table/events-table.component';
import {AdminDashboardComponent} from './components/dashboard/dashboard.component';
import {SharedModule} from '../shared/shared.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    EventsTableComponent,
    AdminDashboardComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
  ],
  exports: [],
  providers: []
})
export class AdminModule {
}
