import {Component, OnInit} from '@angular/core';
import {EventsService} from '../../../_services/events.service';
import {IEvent, IEventType} from '../../../_shared/interfaces';

@Component({
  selector: 'app-events-grid',
  templateUrl: './events-grid.component.html',
  styleUrls: ['./events-grid.component.scss']
})
export class EventsGridComponent implements OnInit {
  private allEvents: IEvent[];
  private eventTypes: IEventType[];

  constructor(private eventsService: EventsService) {
  }

  ngOnInit() {
    this.eventsService.getAllEvents().subscribe((res: IEvent[]) => {
      this.allEvents = res;
    });
    this.eventsService.getEventTypes().subscribe((res: IEventType[]) => {
      this.eventTypes = res;
    });
  }
}
