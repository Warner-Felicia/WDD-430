import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'td-forms-assignment';
  @ViewChild('signupForm') signupForm: NgForm;
  submitted = false;
  user = {
    email: '',
    subscription: '',
    password: ''
  }
  subscriptions = ['Basic', 'Advanced', 'Pro'];
  defaultSelection = "Advanced";

  onSubmit() {
    console.log(this.signupForm.value);
    this.submitted = true;
    this.user.email = this.signupForm.value.email;
    this.user.subscription = this.signupForm.value.subscription;
    this.user.password = this.signupForm.value.password;

  }
}


