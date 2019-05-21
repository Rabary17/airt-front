import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Errors, UserService, User } from '../../core'

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  resetForm: FormGroup;
  currentUser: User;
  errors: Errors = {errors: {}};
  isSubmitting = false;

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) { 
    this.resetForm = this.fb.group({
      'email': ['', Validators.email],
    });
  }

  ngOnInit() {

  }

  submitForm() {
    this.isSubmitting = true;
    console.log(this.resetForm.value);
    this.userService.checkUser(this.resetForm.value).subscribe(res => {
      this.isSubmitting = false,
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    })
    
  }
}
