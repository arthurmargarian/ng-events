import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../../../services/auth.service';
import {ILoginRes} from '../../../shared/interfaces';
import { ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;
  private showLoader: boolean;
  private validCredentials = true;
  private submitted: boolean;

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService
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
        [Validators.required]
      )
    });
  }

  loginSubmit() {
    this.submitted = true;
    const formData = {...this.loginForm.value};
    if (this.loginForm.valid) {
      this.validCredentials = true;
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
            this.validCredentials = false;
            this.toastrService.error(null, error.error.msg);
          });
    } else {
      this.showLoader = false;
    }
  }

   public onFormChanges():void {
     this.validCredentials = true;
  }
}
