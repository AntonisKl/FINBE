import { Component } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  results = {};
  goodResponse = [];
  arrayOfClientKeys = [];

  constructor(private http: HttpClient) {

  }
  ngOnInit(): void {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/json');

    this.http.get('http://localhost:3000/api/queries/selectClientInfoByBank', {params:{'bankIdParam': 'resource:org.example.mynetwork.Bank#1'} }).subscribe(data => {
      console.log(data);
      this.results = data;
      this.arrayOfClientKeys = Object.keys(data)
    });
  }
}
