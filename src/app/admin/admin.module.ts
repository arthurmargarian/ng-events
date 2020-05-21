import {NgModule} from '@angular/core';
import {EventsTableComponent} from './components/events-table/events-table.component';
import {SharedModule} from '../_shared/shared.module';
import {AdminDashboardComponent} from './components/dashboard/dashboard.component';
import {DeleteModalComponent} from './components/modals/delete-modal/delete-modal.component';
import {FormModalComponent} from './components/modals/form-modal/form-modal.component';

@NgModule({
  declarations: [
    EventsTableComponent,
    AdminDashboardComponent,
    DeleteModalComponent,
    FormModalComponent,
  ],
  imports: [
    SharedModule
  ],
  exports: [
    // FormModalComponent,
    // EventsTableComponent,
    // DeleteModalComponent,
    // AdminDashboardComponent,
  ],
  providers: []
})
export class AdminModule {
}
