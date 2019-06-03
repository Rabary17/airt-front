import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services';
import { User } from '../../../core/models/user.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  authType: String = '';
  title: String = '';
  isSubmitting = false;
  addUserForm: FormGroup;
  currentUser: User;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private modalService: NgxSmartModalService
  ) {
        // use FormBuilder to create a form group
        this.addUserForm = this.fb.group({
          'username': ['', Validators.required],
          'email': ['', Validators.required],
          'password': '',
          'role': '',
        });
   }

  ngOnInit() {
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    );
  }

  submitForm(){
    this.userService
    .addTech(this.authType, this.addUserForm.value)
    .subscribe(
      data => {
        this.modalService.getModal('addUserModal').close();
        this.router.navigateByUrl('')
      },
      err => {
        this.isSubmitting = false;
      }
    );
  }

}
