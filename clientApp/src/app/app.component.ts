import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ClientInfo } from '../models/client.info';
import { HttpClient, HttpHeaderResponse, HttpHeaders, HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  clientForm: FormGroup;
  private clientInfo = new ClientInfo();
  private id = 3;


  // countries = ['USA', 'Germany', 'Italy', 'France'];

  // requestTypes = ['Claim', 'Feedback', 'Help Request'];

  constructor(private http: HttpClient) {
    this.clientForm = this.createFormGroup();
  }

  // Step 1
  createFormGroup() {
    return new FormGroup({
      clientInfo: new FormGroup({
        name: new FormControl(),
        surname: new FormControl(),
        placeOfBirth: new FormControl(),
        placeOfResidence: new FormControl(),
        telephone: new FormControl(),
        idNumber: new FormControl()
      })
    });
  }

  onSubmit() {
    console.log(this.clientInfo.name);
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/json');

    this.http.post('http://localhost:3000/api/ClientInfo', {
      
        
          "$class": "org.example.mynetwork.ClientInfo",
          "clientId": this.id,
          "name": this.clientInfo.name,
          "surname": this.clientInfo.surname,
          "idNumber": this.clientInfo.idNumber,
          "placeofBirth": this.clientInfo.placeOfBirth,
          "placeofResidence": this.clientInfo.placeOfResidence,
          "profession": "Βοηθός χειριστή αυτόματης τέντας",
          "telNumber": this.clientInfo.telephone,
          "income": 10000,
          "banks": [
            "org.example.mynetwork.Bank#1"
          ]
        
      
    }).subscribe(data => {
      this.id += 1;
      console.log(data);
    });
  }
}
