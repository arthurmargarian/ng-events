import {Component, OnInit} from '@angular/core';
import {IEvent, IEventType} from '../../../shared/interfaces';
import {EventsService} from '../../../services/events.service';

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
