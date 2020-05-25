import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {AdminModule} from './admin/admin.module';
import {UserModule} from './user/user.module';
import {GuestModule} from './guest/guest.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {SharedModule} from './shared/shared.module';
import {NotFoundComponent} from './not-found/not-found.component';
import {JwtInterceptorService} from './services/jwt-interceptor.service';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    SharedModule,
    GuestModule,
    UserModule,
    AdminModule,
    ToastrModule.forRoot()
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true}],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
