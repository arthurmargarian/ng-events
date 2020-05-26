import {Component, DoCheck, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {IEvent, IEventType} from '../../../shared/interfaces';
import {EventsService} from '../../../services/events.service';
import {ModalService} from '../../../services/modal.service';

@Component({
  selector: 'app-events-table',
  templateUrl: './events-table.component.html',
  styleUrls: ['./events-table.component.scss']
})
export class EventsTableComponent implements OnInit, DoCheck {
  private eventTypes: IEventType[];
  private totalPageCount: number;
  private pages = [];
  private showLoader: boolean = true;
  limitedEvents: IEvent[];
  currentPage: number = 1;
  eventCountLimit: number = 4;
  currentEvent: IEvent;

  constructor(private eventsServices: EventsService, private modalService: ModalService) {
  }

  ngOnInit() {
    this.eventsServices.getEventTypes().subscribe((res: IEventType[]) => {
      this.eventTypes = res;
    });
    this.getCurrentPageEvents(this.currentPage, this.eventCountLimit);
  }

  ngDoCheck(): void {
    this.showLoader = !Boolean(this.limitedEvents && this.eventTypes);
  }

  createEvent() {
    this.modalService.open('create', this);
  }

  deleteEvent(event) {
    this.modalService.open('delete', this, event);
  }

  editEvent(currentEvent) {
    console.log(currentEvent);
    this.modalService.open('edit', this);
    this.currentEvent = currentEvent;
  }

  getCurrentPageEvents(currentPage, eventCountLimit) {
    this.eventsServices.getLimitedEvents(currentPage, eventCountLimit).subscribe((res: HttpResponse<any>) => {
      this.limitedEvents = res.body;
      this.pages = [];
      this.totalPageCount = Math.ceil((+res.headers.get('X-Total-Count') / eventCountLimit));
      this.currentPage = currentPage;
      for (let i = 0; i < this.totalPageCount; i++) {
        this.pages.push(i + 1);
      }
    });
  }
}
