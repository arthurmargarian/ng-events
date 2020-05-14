import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authURL = environment.authURL;

  constructor(private http: HttpClient) {
  }

  login(userInfo) {
    return this.http.post(`${this.authURL}/auth/login`, userInfo);
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  isAdmin() {
    return !!localStorage.getItem('isAdmin');
  }

  logout() {
    localStorage.clear();
  }
}
