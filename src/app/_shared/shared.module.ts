import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlaceholderTranslateDirective} from './directives/placeholder-translate.directive';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {HeaderComponent} from './components/header/header.component';
import {LoaderComponent} from './components/loader/loader.component';

@NgModule({
  declarations: [
    PlaceholderTranslateDirective,
    HeaderComponent,
    LoaderComponent,
  ],
  imports: [],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PlaceholderTranslateDirective,
    HeaderComponent,
    LoaderComponent,
  ]
})
export class SharedModule {
}
