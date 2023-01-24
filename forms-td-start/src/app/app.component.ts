import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // Accesss to the form
  @ViewChild('f') signupForm: NgForm;
  defaultQuestion = "pet";
  answer:string = '';
  genders: string[] = ['Male','Female'];

  user: {
    username: '',
    email: '',
    gender: '',
    answer: '',
    secret: ''
  }
  
  submitted = false;

  suggestUserName() {
    const suggestedName = 'Superuser';

    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    });
  }

  // Access to the form
  onSubmit() {
    console.log(this.signupForm);
    this.submitted = true;
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.secret = this.signupForm.value.secret;
    this.user.answer = this.signupForm.value.answer;
    this.user.gender = this.signupForm.value.gender;

    this.signupForm.reset();
  }
}
