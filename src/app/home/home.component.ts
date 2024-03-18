import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  form: FormGroup;
  isLoading: boolean = false;

  constructor(private _snackBar: MatSnackBar, private http: HttpClient, private _formBuilder: FormBuilder) {
    this.form = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }
  submitForm(event: Event) {
    event.preventDefault();
    console.log({
      name: this.form.value.name,
      email: this.form.value.email,
      message: this.form.value.message
    })
    if (this.form.valid) {
      this.isLoading = true;
      this.http.post('http://localhost:3000/msg/post', {
        name: this.form.value.name,
        email: this.form.value.email,
        message: this.form.value.message
      }).subscribe({
        next: (response: any) => {
          this.isLoading = false;
          this._snackBar.open('Message published!', 'Close');
        },
        error: (error: any) => {
          console.log(error);
          this.isLoading = false;
          this._snackBar.open('ERROR: Please try again later', 'Close');
        }
      });
    } else {
      this._snackBar.open('Please check your post', 'Close');
    }
  }
  getErrorMessage(field: string) {
    if (this.form.get(field)?.errors?.['required']) {
      return 'You must enter your ' + field;
    }

    if (this.form.get(field)?.errors?.['minlength']) {
      return 'Your ' + field + ' is too short!';
    }

    if (this.form.get(field)?.errors?.['maxlength']) {
      return 'Please shorten your ' + field;
    }

    if (this.form.get(field)?.errors?.['email']) {
      return 'Not a valid email';
    }

    return '';
  }
}
