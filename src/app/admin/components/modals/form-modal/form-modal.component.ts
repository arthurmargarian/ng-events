import {Component, ElementRef, Input, OnChanges, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IEvent, IEventType} from '../../../../_shared/interfaces';
import {ModalService} from '../../../../_services/modal.service';
import {EventsService} from '../../../../_services/events.service';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss']
})
export class FormModalComponent implements OnInit, OnChanges {
  @Input() id: string;
  @Input() currentEvent;
  private element: any;
  private eventsTableComp;
  private form: FormGroup;
  private eventTypes: IEventType[];
  private now: number;
  private errorMessage: string;

  constructor(private modalService: ModalService, private el: ElementRef, private eventsService: EventsService) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    this.eventsService.getEventTypes().subscribe((res: IEventType[]) => {
      this.eventTypes = res;
    });

    this.modalService.add(this);

    this.element.addEventListener('click', el => {
      if (el.target.className === 'modal') {
        this.close();
      }
    });

////////////////////////////////////////////////// create
    if (this.id == 'create') {
      this.form = new FormGroup({
        name: new FormControl(
          '',
          [Validators.required, Validators.maxLength(10), Validators.minLength(3)]
        ),
        description: new FormControl(
          '',
          [Validators.required, Validators.minLength(30), Validators.maxLength(100)]
        ),
        date: new FormControl(
          '',
          [Validators.required]
        ),
        eventType: new FormControl(
          '',
          [Validators.required]
        ),
      });
    }
  }

  ngOnChanges(): void {
////////////////////////////////////////////////// edit
    if (this.currentEvent && this.id == 'edit') {
      this.form = new FormGroup({
        name: new FormControl(
          {
            disabled: true,
            value: this.currentEvent.name
          },
          [Validators.required, Validators.maxLength(10), Validators.minLength(3)]
        ),
        description: new FormControl(
          this.currentEvent.description,
          [Validators.required, Validators.minLength(30), Validators.maxLength(100)]
        ),
        date: new FormControl(
          this.currentEvent.date,
          [Validators.required]
        ),
        eventType: new FormControl(
          {
            disabled: true,
            value: this.currentEvent.name
          },
          [Validators.required]
        ),
      });
    }
  }

  open(currentEvent, eventsTableComp): void {
    this.now = Date.now();
    this.element.style.display = 'block';
    this.eventsTableComp = eventsTableComp;
  }

  close(): void {
    this.element.style.display = 'none';
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }


////////////////////////////////////////////////// edit
  editEvent() {
    if (this.form.valid) {
      const editedEvent: IEvent = {
        id: this.currentEvent.id,
        name: this.currentEvent.name,
        eventType: this.currentEvent.eventType,
        date: this.form.controls.date.value,
        description: this.form.controls.description.value
      };
      this.eventsService.editEvent(editedEvent, this.currentEvent.id).subscribe(() => {
        this.closeModal('edit');
        this.eventsTableComp.getCurrentPageEvents(this.eventsTableComp.currentPage, this.eventsTableComp.eventCountLimit);
      });
    } else {
      if (this.form.controls.description.invalid) {
        this.errorMessage = 'Description length must be min 30, max 100';
        return;
      }
    }
  }

////////////////////////////////////////////////// create
  createEvent() {
    if (this.form.valid) {
      const formData: IEvent = {...this.form.value};
      this.eventsService.createEvent(formData).subscribe(res => {
        this.eventsTableComp.getCurrentPageEvents(this.eventsTableComp.currentPage, this.eventsTableComp.eventCountLimit);
        this.form.reset();
      });
      this.closeModal('create');
    } else {
      if (this.form.controls.name.invalid) {
        this.errorMessage = 'Name length must be min 3, max 10';
        return;
      }
      if (this.form.controls.description.invalid) {
        this.errorMessage = 'Description length must be min 30, max 100';
        return;
      }
      if (this.form.controls.date.invalid) {
        this.errorMessage = 'You must choose some date for event';
        return;
      }
      if (this.form.controls.type.invalid) {
        this.errorMessage = 'You must choose some type for event';
        return;
      }
    }
  }

  formChanges() {
    this.errorMessage = '';
  }
}
