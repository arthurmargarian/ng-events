import {Component, Input, OnChanges} from '@angular/core';
import {IEvent, IEventType} from '../../../_shared/interfaces';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnChanges {
  @Input() event: IEvent;
  @Input() eventTypes: IEventType[];
  private showLoader: Boolean = true;
  private showImage: Boolean = false;

  constructor() {
  }

  ngOnChanges() {
    this.showLoader = !Boolean(this.event && this.eventTypes);
    this.showImage = true;
  }
}