import {NgModule} from '@angular/core';
import {EventsTableComponent} from './components/events-table/events-table.component';
import {AdminDashboardComponent} from './components/dashboard/dashboard.component';
import {DeleteModalComponent} from './components/modals/delete-modal/delete-modal.component';
import {FormModalComponent} from './components/modals/form-modal/form-modal.component';
import {SharedModule} from '../shared/shared.module';

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
  exports: [],
  providers: []
})
export class AdminModule {
}
