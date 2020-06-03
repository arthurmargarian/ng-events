import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {IUser} from '../../../shared/interfaces';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  private registerForm: FormGroup;
  private submitted: boolean;
  public validAccessKey: boolean;
  public isEmailUsed: boolean;
  public isPasswordsMatch: boolean;
  private isCheckboxChecked: boolean;

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.titleService.setTitle('Sign Up • Events');
    this.initForm();
  }

  public onSubmit(): void {
    this.submitted = true;
    if (this.registerForm.valid && this.isPasswordsMatch && !this.isEmailUsed) {
      if (!this.isCheckboxChecked) {
        const formData = {
          name: this.registerForm.get('name').value,
          srName: this.registerForm.get('srName').value,
          email: this.registerForm.get('email').value,
          password: this.registerForm.get('password').value,
          isAdmin: !this.registerForm.get('accessKey').disabled && this.validAccessKey,
        };
        this.userRegister(formData);
      } else {
        if (this.validAccessKey) {
          const formData = {
            name: this.registerForm.get('name').value,
            srName: this.registerForm.get('srName').value,
            email: this.registerForm.get('email').value,
            password: this.registerForm.get('password').value,
            isAdmin: !this.registerForm.get('accessKey').disabled && this.validAccessKey,
          };
          this.userRegister(formData);
        }
      }
    }

  }


  private initForm() {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      srName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required]),
      adminAccessCheckbox: new FormControl(''),
      accessKey: new FormControl('')
    });
    this.registerForm.get('accessKey').disable();
    this.validAccessKey = true;
  }

  private userRegister(formData): void {
    this.authService.register(formData)
      .subscribe(() => {
        this.toastr.success('Account Successfully Created.\n Now You Can Sign In.', 'Sign Up');
        this.router.navigate(['login']);
      });
  }

  public onNavigateSignIn(): void {
    this.router.navigate(['login']);
  }

  public onCheckboxChanges(): void {
    this.validAccessKey = true;
    this.registerForm.get('accessKey').enable();
      this.isCheckboxChecked = true;
    if (!this.registerForm.get('adminAccessCheckbox').value === false) {
      this.registerForm.get('accessKey').patchValue('');
      this.registerForm.get('accessKey').disable();
      this.isCheckboxChecked = false;
    }
    if (this.registerForm.get('accessKey').value === '') {
      this.validAccessKey = false;
    }
  }

  public onAccessKeyChanges(): void {
    this.validAccessKey = this.registerForm.get('accessKey').value === 'admin'; //TODO Admin Access Key
  }

  public onEmailChanges(): void {
    this.isEmailUsed = false;
    if (this.registerForm.get('email').valid) {
      const email = this.registerForm.get('email').value;
      this.checkEmail(email);
    }
  }

  private checkEmail(email: string): void {
    this.authService.emailValidator(email)
      .subscribe((res: IUser[]) => {
        if (res.length) {
          res.forEach(user => {
            this.isEmailUsed = user.email === email;
          });
        }
      });
  }

  public onPasswordChanges(): void {
    if (this.registerForm.get('password').valid) {
      const pass = this.registerForm.get('password').value;
      const passConfirm = this.registerForm.get('confirmPassword').value;
      this.isPasswordsMatch = pass === passConfirm;
    }
  }
}
