import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

import { AppComponent } from './app.component';
import { NewCustomerModule } from './new-customer/new-customer.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TextMaskModule,
    ReactiveFormsModule,
    NewCustomerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
