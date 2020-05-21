import {NgModule} from '@angular/core';
import {LoginComponent} from './components/login/login.component';
import {SharedModule} from '../_shared/shared.module';


@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    // LoginComponent
  ],
  providers: []
})
export class GuestModule {
}
