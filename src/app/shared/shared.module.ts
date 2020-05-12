import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { SingleEventComponent } from './components/single-event/single-event.component';
import { LoaderComponent } from './components/loader/loader.component';
import { PlaceholderTranslateDirective } from './directives/placeholder-translate.directive';

@NgModule({
  declarations: [SingleEventComponent, LoaderComponent, PlaceholderTranslateDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  exports: [
    SingleEventComponent,
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LoaderComponent,
    PlaceholderTranslateDirective,
  ]
})
export class SharedModule { }
