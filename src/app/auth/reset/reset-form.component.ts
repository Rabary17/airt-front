import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Errors, UserService, User } from '../../core'

@Component({
  selector: 'app-reset-form',
  templateUrl: './reset-form.component.html',
  styleUrls: ['./reset-form.component.css']
})
export class ResetFormComponent implements OnInit {

  resetPasswordForm: FormGroup;
  currentUser: User;
  errors = '';
  msg = ''
  isSubmitting = false;
  token: string;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { 
    this.resetPasswordForm = this.fb.group({
      'password': ['', Validators.required],
      'confirmation_password': '',
    }, {validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmation_password.value;

    return pass === confirmPass ? null : { notSame: true }     
    }

  ngOnInit() {
    this.userService.currentUser.subscribe(
        (userData) => {
          this.currentUser = userData;
        }
      );
    this.route.url.subscribe(data => {
        this.token = data[1].path;
    });
  }

  submitForm() {
    this.errors = '';
    this.msg = '';
    this.isSubmitting = true;
    let data = {
        'newpass' : this.resetPasswordForm.controls.password.value,
        'token': this.token
    }
    this.userService.postNewPassword(data).subscribe((res) => {
        if(res.errors) {
            this.errors = res.errors,
            this.isSubmitting = false
          } else if(res.msg) {
            console.log(res.msg)
            this.msg = res.msg;
            this.isSubmitting = false
          }
    })
       
  }
}
