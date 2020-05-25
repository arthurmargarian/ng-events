import {Component, DoCheck, ElementRef, Input, OnInit} from '@angular/core';
import {IEvent} from '../../../../shared/interfaces';
import {ModalService} from '../../../../services/modal.service';
import {EventsService} from '../../../../services/events.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit, DoCheck {
  @Input() id: string;
  private element: any;
  private event: IEvent;
  private dataReady: boolean;
  private eventsTableComp;


  constructor(private modalService: ModalService, private el: ElementRef, private eventsService: EventsService) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    this.modalService.add(this);
    this.element.addEventListener('click', el => {
      if (el.target.className === 'modal') {
        this.close();
      }
    });
  }

  ngDoCheck(): void {
    this.dataReady = Boolean(this.event && this.id);
  }


  open(event, eventsTableComp): void {
    this.element.style.display = 'block';
    this.event = event;
    this.eventsTableComp = eventsTableComp;
  }

  close(): void {
    this.element.style.display = 'none';
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  deleteEvent(id) {
    this.eventsService.deleteEvent(id).subscribe(res => {
      if (this.eventsTableComp.limitedEvents.length == 1) this.eventsTableComp.currentPage--;
        this.eventsTableComp.getCurrentPageEvents(this.eventsTableComp.currentPage, this.eventsTableComp.eventCountLimit);
    });
    this.closeModal('delete');
  }
}
