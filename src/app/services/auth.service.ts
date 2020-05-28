import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL = environment.baseURL;
  private authURL = environment.authURL;

  constructor(private http: HttpClient) {
  }

  public login(userCredentials) {
    return this.http.post(`${this.authURL}/auth/login`, userCredentials);
  }

  public register(userInfo) {
    return this.http.post(`${this.baseURL}/users`, userInfo);
  }

  public emailValidator(email:string){
    return this.http.get(`${this.baseURL}/users?email_like=${email}`);
  }

  public isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  public isAdmin() {
    return !!localStorage.getItem('isAdmin');
  }

  public logout() {
    localStorage.clear();
  }
}
