import {NgModule} from '@angular/core';
import {EventsGridComponent} from './components/events-grid/events-grid.component';
import {UserDashboardComponent} from './components/dashboard/dashboard.component';
import { EventCardComponent } from './components/event-card/event-card.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    EventsGridComponent,
    UserDashboardComponent,
    EventCardComponent
  ],
  imports: [
    SharedModule
  ],
  exports: []
})
export class UserModule {
}
