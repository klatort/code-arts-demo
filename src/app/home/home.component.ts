import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  form: FormGroup;

  constructor(private _snackBar: MatSnackBar, private _formBuilder: FormBuilder) { 
    this.form = this._formBuilder.group({
      name: '',
      email: '',
      message: ''
    });
  }
  submitForm(event: Event) {
    event.preventDefault();
    console.log(this.form);
    this._snackBar.open('Message published!', 'Close');
  }
}
