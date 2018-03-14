import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextMaskModule } from 'angular2-text-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NewCustomerComponent } from './new-customer.component';

@NgModule({
  imports: [
    CommonModule,
    TextMaskModule,
    ReactiveFormsModule,
    HttpModule
  ],
  exports: [
    NewCustomerComponent
  ],
  declarations: [
    NewCustomerComponent
  ]
})
export class NewCustomerModule { }
