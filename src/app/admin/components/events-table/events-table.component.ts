import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {IEvent, IEventType} from '../../../shared/interfaces';
import {EventsService} from '../../../services/events.service';
import {NgbCalendar, NgbDateStruct, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-events-table',
  templateUrl: './events-table.component.html',
  styleUrls: ['./events-table.component.scss']
})
export class EventsTableComponent implements OnInit {

  public limitedEvents: IEvent[];
  public currentPage: number = 1;
  public eventCountLimit: number = 6;
  public form: FormGroup;
  public date: NgbDateStruct;
  public currentEvent: IEvent;
  private eventTypes: IEventType[];
  private totalPageCount: number;
  private pages = [];
  private showLoader: boolean = true;
  private isEdit: boolean;
  private submitted: boolean;

  constructor(private eventsService: EventsService,
              private modalService: NgbModal,
              private calendar: NgbCalendar,
              private toastr: ToastrService,
              public fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initForm();
    this.getEventTypes();
    this.getCurrentPageEvents(this.currentPage, this.eventCountLimit);

  }

  // INITIALIZATION

  private initForm(): void {
    this.form = this.fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
      'description': ['', Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(100)])],
      'date': ['', Validators.compose([Validators.required])],
      'eventType': ['', Validators.compose([Validators.required])],
    });
  }

  public getCurrentPageEvents(currentPage, eventCountLimit): void {
    this.eventsService.getLimitedEvents(currentPage, eventCountLimit)
      .subscribe((res: HttpResponse<any>) => {
        this.limitedEvents = res.body;
        this.pages = [];
        this.totalPageCount = Math.ceil((+res.headers.get('X-Total-Count') / eventCountLimit));
        this.currentPage = currentPage;
        for (let i = 0; i < this.totalPageCount; i++) {
          this.pages.push(i + 1);
        }
        this.showLoader = false;
      });
  }


  // EVENT HANDLERS

  public openModal(content, event?: IEvent): void {
    console.log(this.form.get('name').errors);
    if (event) {
      this.isEdit = true;
      this.currentEvent = event;
      this.form.get('name').disable();
      this.patchFormValues(event);
    } else {
      this.isEdit = false;
      this.form.get('name').enable();
    }
    this.modalService.open(content, {centered: true});
  }

  public onCreateEvent(): void {
    this.submitted = true;
    if (this.form.valid) {
      const formData = {...this.form.value};
      formData.date = new Date(formData.date.year, formData.date.month - 1, formData.date.day).toJSON();
      this.createEvent(formData);
    }
  }

  public onEditEvent(): void {
    this.submitted = true;
    if (this.form.valid) {
      const event = {...this.form.value};
      event.name = this.currentEvent.name;
      event.id = this.currentEvent.id;
      event.date = new Date(event.date.year, event.date.month - 1, event.date.day).toJSON();
      this.updateEvent(event);
    }
  }


  // HELPER FUNCTIONS

  public selectToday(): void {
    this.date = this.calendar.getToday();
  }

  private patchFormValues(event: IEvent): void {
    this.form.get('name').patchValue(event.name);
    this.form.get('description').patchValue(event.description);
    this.form.get('eventType').patchValue(event.eventType);
    let date = new Date(String(event.date));
    this.date = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    };
  }


  // API CALLS
  private createEvent(formData): void {
    this.eventsService.createEvent(formData)
      .subscribe(res => {
        this.modalService.dismissAll();
        this.form.reset();
        this.getCurrentPageEvents(this.currentPage, this.eventCountLimit);
        this.toastr.success('New Event Successfully Created.', 'Create');
      });
  }

  private updateEvent(event: IEvent): void {
    this.eventsService.updateEvent(event)
      .subscribe((res) => {
        this.modalService.dismissAll();
        this.toastr.success(`Event "${this.currentEvent.name}" Successfully Edited.`, 'Edit');
        this.currentEvent = null;
        this.form.reset();
        this.submitted = false;
        this.getCurrentPageEvents(this.currentPage, this.eventCountLimit);
      });
  }

  public onDeleteEvent(): void {
    this.eventsService.deleteEvent(this.currentEvent.id)
      .subscribe(() => {
        this.modalService.dismissAll();
        this.toastr.info(`Event "${this.currentEvent.name}" Successfully Deleted.`, 'Delete');
        this.currentEvent = null;
        this.getCurrentPageEvents(this.currentPage, this.eventCountLimit);
      });
  }

  private getEventTypes(): void {
    this.eventsService.getEventTypes()
      .subscribe((res: IEventType[]) => {
        this.eventTypes = res;
      });
  }
}


