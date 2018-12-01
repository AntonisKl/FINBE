/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ClientInfoService } from './ClientInfo.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-clientinfo',
  templateUrl: './ClientInfo.component.html',
  styleUrls: ['./ClientInfo.component.css'],
  providers: [ClientInfoService]
})
export class ClientInfoComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  clientId = new FormControl('', Validators.required);
  name = new FormControl('', Validators.required);
  surname = new FormControl('', Validators.required);
  idNumber = new FormControl('', Validators.required);
  placeofBirth = new FormControl('', Validators.required);
  placeofResidence = new FormControl('', Validators.required);
  profession = new FormControl('', Validators.required);
  telNumber = new FormControl('', Validators.required);
  income = new FormControl('', Validators.required);
  banks = new FormControl('', Validators.required);

  constructor(public serviceClientInfo: ClientInfoService, fb: FormBuilder) {
    this.myForm = fb.group({
      clientId: this.clientId,
      name: this.name,
      surname: this.surname,
      idNumber: this.idNumber,
      placeofBirth: this.placeofBirth,
      placeofResidence: this.placeofResidence,
      profession: this.profession,
      telNumber: this.telNumber,
      income: this.income,
      banks: this.banks
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceClientInfo.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.example.mynetwork.ClientInfo',
      'clientId': this.clientId.value,
      'name': this.name.value,
      'surname': this.surname.value,
      'idNumber': this.idNumber.value,
      'placeofBirth': this.placeofBirth.value,
      'placeofResidence': this.placeofResidence.value,
      'profession': this.profession.value,
      'telNumber': this.telNumber.value,
      'income': this.income.value,
      'banks': this.banks.value
    };

    this.myForm.setValue({
      'clientId': null,
      'name': null,
      'surname': null,
      'idNumber': null,
      'placeofBirth': null,
      'placeofResidence': null,
      'profession': null,
      'telNumber': null,
      'income': null,
      'banks': null
    });

    return this.serviceClientInfo.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'clientId': null,
        'name': null,
        'surname': null,
        'idNumber': null,
        'placeofBirth': null,
        'placeofResidence': null,
        'profession': null,
        'telNumber': null,
        'income': null,
        'banks': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.example.mynetwork.ClientInfo',
      'name': this.name.value,
      'surname': this.surname.value,
      'idNumber': this.idNumber.value,
      'placeofBirth': this.placeofBirth.value,
      'placeofResidence': this.placeofResidence.value,
      'profession': this.profession.value,
      'telNumber': this.telNumber.value,
      'income': this.income.value,
      'banks': this.banks.value
    };

    return this.serviceClientInfo.updateAsset(form.get('clientId').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceClientInfo.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceClientInfo.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'clientId': null,
        'name': null,
        'surname': null,
        'idNumber': null,
        'placeofBirth': null,
        'placeofResidence': null,
        'profession': null,
        'telNumber': null,
        'income': null,
        'banks': null
      };

      if (result.clientId) {
        formObject.clientId = result.clientId;
      } else {
        formObject.clientId = null;
      }

      if (result.name) {
        formObject.name = result.name;
      } else {
        formObject.name = null;
      }

      if (result.surname) {
        formObject.surname = result.surname;
      } else {
        formObject.surname = null;
      }

      if (result.idNumber) {
        formObject.idNumber = result.idNumber;
      } else {
        formObject.idNumber = null;
      }

      if (result.placeofBirth) {
        formObject.placeofBirth = result.placeofBirth;
      } else {
        formObject.placeofBirth = null;
      }

      if (result.placeofResidence) {
        formObject.placeofResidence = result.placeofResidence;
      } else {
        formObject.placeofResidence = null;
      }

      if (result.profession) {
        formObject.profession = result.profession;
      } else {
        formObject.profession = null;
      }

      if (result.telNumber) {
        formObject.telNumber = result.telNumber;
      } else {
        formObject.telNumber = null;
      }

      if (result.income) {
        formObject.income = result.income;
      } else {
        formObject.income = null;
      }

      if (result.banks) {
        formObject.banks = result.banks;
      } else {
        formObject.banks = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'clientId': null,
      'name': null,
      'surname': null,
      'idNumber': null,
      'placeofBirth': null,
      'placeofResidence': null,
      'profession': null,
      'telNumber': null,
      'income': null,
      'banks': null
      });
  }

}
