import {NgModule} from '@angular/core';
import {LoginComponent} from './components/login/login.component';
import {SharedModule} from '../shared/shared.module';
import {RegisterComponent} from './components/register/register.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    SharedModule,
  ],
  exports: [],
  providers: []
})
export class GuestModule {
}
