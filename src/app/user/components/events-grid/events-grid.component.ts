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

  ngOnInit(): void {
    this.getEventTypes();
    this.getAllEvents();
  }

  private getEventTypes(): void {
    this.eventsService.getEventTypes()
      .subscribe((res: IEventType[]) => {
        this.eventTypes = res;
      });
  }

  private getAllEvents(): void {
    this.eventsService.getAllEvents()
      .subscribe((res: IEvent[]) => {
        this.allEvents = res;
        this.allEvents.forEach((event, idx) => {
          if (event.description.length >= 80) {
            this.allEvents[idx]['shortDescription'] = event.description.slice(0, 80);
          }
          this.allEvents[idx]['imageUrl'] = `assets/images/${this.eventTypes[event.eventType - 1].type}.jpg`;
        });
      });
  }
}
