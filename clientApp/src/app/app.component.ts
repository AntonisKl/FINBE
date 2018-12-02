import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  clientForm: FormGroup;

  // countries = ['USA', 'Germany', 'Italy', 'France'];

  // requestTypes = ['Claim', 'Feedback', 'Help Request'];

  constructor() {
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
        telephone: new FormControl()
      })
    });
  }

  ngOnInit() {}
}
