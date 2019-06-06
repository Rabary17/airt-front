import { Component, OnInit, Output, Input } from '@angular/core';
import { UserService } from '../../../core/services';
import { User } from '../../../core/models/user.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  @Input() user;
  @Output() userUpdated;
  authType: String = '';
  title: String = '';
  isSubmitting = false;
  editUserForm: FormGroup;
  currentUser: User;
  UserToUpdate: object = {
    'id': '',
    'username': '',
    'email': '',
    'password': '',
    'role': '',
  }

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private modalService: NgxSmartModalService
  ) {
        // use FormBuilder to create a form group
        this.editUserForm = this.fb.group({
          'id': ['', Validators.required],
          'username': ['', Validators.required],
          'email': ['', Validators.required],
          'password': ['', Validators.required],
          'role': ['', Validators.required],
        });
   }

  ngOnInit() {
    this.editUserForm.patchValue(this.user.user);
    this.editUserForm.controls['id'].setValue(this.user.user.id);
    console.log('this.user.user.id', this.user.id)
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    );
  }

  submitForm(){
      this.updateUser(this.editUserForm.value);
      console.log(this.UserToUpdate)
      this.userService.updateOneUser(this.UserToUpdate).subscribe(res => {
          this.userUpdated = res;
      })
  }

  updateUser(values: Object) {
    Object.assign(this.UserToUpdate, values);
  }

}
