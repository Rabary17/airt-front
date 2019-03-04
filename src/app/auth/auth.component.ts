import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Errors, UserService, User } from '../core';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  authType: String = '';
  title: String = '';
  errors: Errors = {errors: {}};
  isSubmitting = false;
  authForm: FormGroup;
  currentUser: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
        console.log(this.currentUser);
      }
    );
    this.route.url.subscribe(data => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.authType = data[data.length - 1].path;
      // Set a title for the page accordingly
      this.title = (this.authType === 'login') ? 'Se connecter' : 'Ajouter un utilisateur';
      // add form control for username if this is the register page
      if (this.authType === 'register') {
        this.authForm.addControl('username', new FormControl());
        this.authForm.addControl('role', new FormControl());
        // if (this.currentUser.role === 'Manager') {
        //   this.authForm.removeControl('password');
        // }
      }
    });
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = {errors: {}};

    if (this.authType === 'login') {
      this.userService
      .attemptAuth(this.authType, this.authForm.value)
      .subscribe(
        data => this.router.navigateByUrl('/'),
        err => {
          this.errors = err;
          this.isSubmitting = false;
        }
      );
    } else if (this.authType === 'register') {
      if (this.currentUser.role === 'Manager') {
        this.authForm.patchValue({role: 'Tech'});
      }
      this.userService
      .addTech(this.authType, this.authForm.value)
      .subscribe(
        data => this.router.navigateByUrl('/'),
        err => {
          this.errors = err;
          this.isSubmitting = false;
        }
      );
    } else {
      console.log('erreur');
    }

  }
}
