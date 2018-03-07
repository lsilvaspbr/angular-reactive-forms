import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {

  newCustomerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: Http) { }

  ngOnInit() {
    this.newCustomerForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, Validators.required],
      cpf: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]]
    });
  }

  addNewCustomer() {
    // console.log(this.newCustomerForm);
    this.http.post('https://httpbin.org/post',
      JSON.stringify(this.newCustomerForm.value))
      .map(res => res)
      .subscribe(data => {
        console.log(data);
        this.formReset();
      },
      (error: any) => alert('Error, please try again.'));
  }

  formReset() {
    this.newCustomerForm.reset();
  }

  touchedVerify(field) {
    return !this.newCustomerForm.get(field).valid && this.newCustomerForm.get(field).touched;
  }

  checkError(field) {
    return {
      'has-danger': this.touchedVerify(field)
      // 'form-control-feedback': this.touchedVerify(field)
    };
  }
}
