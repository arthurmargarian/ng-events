import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

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
    private router: Router
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
      console.log('auth logic');
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
