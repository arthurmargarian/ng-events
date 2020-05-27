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
  private eventTypes: IEventType[];
  private totalPageCount: number;
  private pages = [];
  private showLoader: boolean = true;

  constructor(private eventsService: EventsService,
              private modalService: NgbModal,
              private calendar: NgbCalendar,
              private toastr: ToastrService,
              public fb: FormBuilder) {
  }

  ngOnInit():void {
    this.initForm();
    this.getEventTypes();
    this.getCurrentPageEvents(this.currentPage, this.eventCountLimit);

  }

  private initForm(): void {
    this.form = this.fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'description': ['', Validators.compose([Validators.required, Validators.minLength(20)])],
      'date': ['', Validators.compose([Validators.required])],
      'eventType': ['', Validators.compose([Validators.required])],
    });
  }

  private getEventTypes(): void {
    this.eventsService.getEventTypes()
      .subscribe((res: IEventType[]) => {
        this.eventTypes = res;
      });
  }

  public openModal(content):void {
    this.modalService.open(content, {windowClass: 'dark-modal', centered: true});
  }

  public selectToday(): void {
    this.date = this.calendar.getToday();
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

  public onCreateEvent(): void {
    if (this.form.valid) {
      const formData = {...this.form.value};
      formData.date = new Date(formData.date.year, formData.date.month, formData.date.day).toJSON();
      this.createEvent(formData);
    }
  }

  private createEvent(formData) {
    this.eventsService.createEvent(formData)
      .subscribe(res => {
        this.modalService.dismissAll();
        this.form.reset();
        this.getCurrentPageEvents(this.currentPage, this.eventCountLimit);
        this.toastr.success('New Event Successfully Created', 'Create');
      });
  }
}
