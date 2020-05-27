import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {SingleEventComponent} from './components/single-event/single-event.component';
import {LoaderComponent} from './components/loader/loader.component';
import {PlaceholderTranslateDirective} from './directives/placeholder-translate.directive';
import {HeaderComponent} from './components/header/header.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    SingleEventComponent,
    LoaderComponent,
    PlaceholderTranslateDirective,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  exports: [
    LoaderComponent,
    HeaderComponent,
    NgbModule,
    SingleEventComponent,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    PlaceholderTranslateDirective,
  ]
})
export class SharedModule {
}
