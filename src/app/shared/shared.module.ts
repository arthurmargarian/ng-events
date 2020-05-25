import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {SingleEventComponent} from './components/single-event/single-event.component';
import {LoaderComponent} from './components/loader/loader.component';
import {PlaceholderTranslateDirective} from './directives/placeholder-translate.directive';
import {HeaderComponent} from './components/header/header.component';

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
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  exports: [
    LoaderComponent,
    HeaderComponent,
    SingleEventComponent,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    PlaceholderTranslateDirective,
  ]
})
export class SharedModule {
}
