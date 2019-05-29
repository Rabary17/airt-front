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
  errors = '';
  msg = '';
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
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    );
  }

  submitForm() {
    this.errors = '';
    this.msg = '';
    this.isSubmitting = true;
    this.userService.checkUser(this.resetForm.value).subscribe((res) => {
      if(res.errors) {
        this.errors = res.errors,
        this.isSubmitting = false
      } else if(res.msg) {
        this.msg = res.msg;
        this.isSubmitting = false
      }
    })
  }
}
