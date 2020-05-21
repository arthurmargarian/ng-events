import {NgModule} from '@angular/core';
import {EventsGridComponent} from './components/events-grid/events-grid.component';
import {SharedModule} from '../_shared/shared.module';
import {UserDashboardComponent} from './components/dashboard/dashboard.component';
import { EventCardComponent } from './components/event-card/event-card.component';

@NgModule({
  declarations: [
    EventsGridComponent,
    UserDashboardComponent,
    EventCardComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    // UserDashboardComponent,
    // EventsGridComponent,
    // EventCardComponent
  ]
})
export class UserModule {
}
