import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {LoaderComponent} from './components/loader/loader.component';
import {HeaderComponent} from './components/header/header.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    LoaderComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
  ],
  exports: [
    LoaderComponent,
    HeaderComponent,
    NgbModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule {
}
