import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import {SharedModule} from './shared/shared.module';
import {GuestModule} from './guest/guest.module';
import {UserModule} from './user/user.module';
import {AdminModule} from './admin/admin.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    SharedModule,
    GuestModule,
    UserModule,
    AdminModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
