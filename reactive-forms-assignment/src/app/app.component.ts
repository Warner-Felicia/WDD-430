import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { CustomValidators } from './custom-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'reactive-forms-assignment';
  projectSubmissionForm: FormGroup;
  statusList = ['Stable', 'Critical', 'Finished'];
  forbiddenProjectNames = ['Test', 'test'];

  ngOnInit() {
    this.projectSubmissionForm = new FormGroup({
      'projectName': new FormControl(null, [Validators.required, CustomValidators.forbiddenProject], CustomValidators.asyncForbiddenProjectAsync),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'status': new FormControl('Stable')
    });
  }

  onSubmit() {
    console.log(this.projectSubmissionForm.value);
  }

}
