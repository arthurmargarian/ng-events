import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private baseURL = environment.baseURL;

  constructor(private http: HttpClient) {
  }

  getAllEvents() {
    return this.http.get(`${this.baseURL}/events`);
  }

  getLimitedEvents(page, limit = '4') {
    return this.http.get(`${this.baseURL}/events`, {
      observe: 'response',
      params: {
        '_page': page,
        '_limit': limit
      }
    });
  }

  getEventTypes() {
    return this.http.get(`${this.baseURL}/eventTypes`);
  }

  createEvent(event) {
    return this.http.post(`${this.baseURL}/events`, event);
  }

  deleteEvent(id) {
    return this.http.delete(`${this.baseURL}/events/${id}`);
  }

  editEvent(body,id) {
    return this.http.put(`${this.baseURL}/events/${id}`, body);
  }
}
