import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import { EventsTableComponent } from './components/events-table/events-table.component';
import {AdminRoutingModule} from './admin-routing.module';

@NgModule({
  declarations: [EventsTableComponent],
  imports: [
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
