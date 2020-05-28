import {Component, Input} from '@angular/core';
import {IEvent, IEventType} from '../../../shared/interfaces';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent {
  @Input() event: IEvent;
  @Input() eventTypes: IEventType[];

  constructor(private modalService: NgbModal) {
  }

  public openModal(content): void {
    this.modalService.open(content, {centered: true});
  }

}
