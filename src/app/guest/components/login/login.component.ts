import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ILoginRes} from '../../../shared/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;
  private errorMessage: string;
  private showLoader: boolean;
  private invalidForm: boolean;

  constructor(
    private titleService: Title,
    private router: Router,
    private authService:AuthService
  ) {
    this.titleService.setTitle('Login • Events');
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(
        '',
        [Validators.required, Validators.email]
      ),
      password: new FormControl(
        '',
        [Validators.required, Validators.minLength(6)]
      )
    });
  }

  loginSubmit() {
    this.showLoader = true;
    const formData = {...this.loginForm.value};
    if (this.loginForm.valid) {
      this.authService.login(formData)
        .subscribe(
          (res: ILoginRes) => {
            localStorage.setItem('token', res.access_token);
            localStorage.setItem('fullName', `${res.user.srName} ${res.user.name}`);
            this.showLoader = false;
            if (res.user.isAdmin) {
              localStorage.setItem('isAdmin', 'admin');
              this.router.navigate(['events-table']);
            } else {
              this.router.navigate(['events-grid']);
            }
          },
          (error: HttpErrorResponse) => {
            this.showLoader = false;
            this.invalidForm = true;
            this.errorMessage = error.error.message;
            this.loginForm.controls.password.reset();
          });
    } else {
      this.invalidForm = true;
      this.loginForm.controls.password.reset();
      this.showLoader = false;
      this.errorMessage = this.loginForm.controls.email.invalid ? 'Your email is invalid' : 'Your password is invalid';
    }
  }

  onFormChanges() {
    this.invalidForm = Boolean(this.loginForm.touched && this.loginForm.invalid);
    this.errorMessage = '';
  }
}
