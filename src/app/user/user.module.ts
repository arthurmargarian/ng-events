import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import { EventsGridComponent } from './components/events-grid/events-grid.component';

@NgModule({
  declarations: [EventsGridComponent],
  imports: [
    SharedModule
  ]
})
export class UserModule { }
