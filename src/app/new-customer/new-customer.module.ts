import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NewCustomerComponent } from './new-customer.component';

@NgModule({
  imports: [
    CommonModule,
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
