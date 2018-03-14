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

  public cpfMask = [/[0-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  public phoneMask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public zipCodeMask = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  cpfPattern = /^\d{3}.\d{3}.\d{3}-\d{2}$/;
  phonePattern = /^\(\d{2}\) \d{5}-\d{4}$/;
  zipCodePattern = /^\d{5}\-\d{3}$/;

  genders = ['Masculino', 'Feminino'];

  zipCodeInvalid = true;

  constructor(private formBuilder: FormBuilder, private http: Http) {
  }

  ngOnInit() {
    this.newCustomerForm = this.formBuilder.group({
      firstName: [null, [Validators.required, Validators.minLength(1)]],
      lastName: [null, [Validators.required, Validators.minLength(1)]],
      email: [null, [Validators.required, Validators.email]],
      cpf: [null, [Validators.required, Validators.pattern(this.cpfPattern)]],
      phone: [null, [Validators.required, Validators.pattern(this.phonePattern)]],
      gender: [null, Validators.required],
      zipCode: [null, [Validators.required, Validators.pattern(this.zipCodePattern)]],
      street: [null, [Validators.required, Validators.minLength(11)]],
      number: [null, [Validators.required, Validators.minLength(1)]],
      complement: [null],
      neighborhood: [null, [Validators.required, Validators.minLength(11)]],
      state: [null, Validators.required],
      city: [null, [Validators.required, Validators.minLength(11)]],
      reference: [null]
    });
  }

  addNewCustomer() {
    this.http.post('https://httpbin.org/post',
      JSON.stringify(this.newCustomerForm.value))
      .map(res => res)
      .subscribe(res => {
        console.log(res);
        alert('Cliente cadastrado com sucesso!');
        this.formReset();
      },
      (error: any) => alert('Error, please try again.'));
  }

  searchZipCode(zipCode) {
    zipCode = zipCode.replace(/\D/g, '');

    if (zipCode !== '') {
      const zipCodeValidate = /^[0-9]{8}$/;

      if (zipCodeValidate.test(zipCode)) {
        this.http.get(`//viacep.com.br/ws/${zipCode}/json`)
          .map(res => res.json())
          .subscribe(
            res => {
              if (!(res.erro)) {
                this.populateAddress(res);
                this.newCustomerForm.controls['zipCode'].setErrors(null);
              } else {
                this.newCustomerForm.controls['zipCode'].setErrors({'incorrect': true});
              }
            },
            error => {
              console.log(`Error: ${error}`);
            }
          );
      }
    }
  }

  populateAddress(res) {
    this.newCustomerForm.patchValue({
      street: res.logradouro,
      neighborhood: res.bairro,
      state: res.uf,
      city: res.localidade
    });
  }

  checkError(field) {
    return {
      'has-danger': this.touchedVerify(field)
    };
  }

  touchedVerify(field) {
    return !this.newCustomerForm.get(field).valid && this.newCustomerForm.get(field).touched;
  }

  formReset() {
    this.newCustomerForm.reset();
  }
}
