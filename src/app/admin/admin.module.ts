import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import { EventsTableComponent } from './components/events-table/events-table.component';

@NgModule({
  declarations: [EventsTableComponent],
  imports: [
    SharedModule,
  ]
})
export class AdminModule { }
