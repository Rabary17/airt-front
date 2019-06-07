import { Component, OnInit, Output, Input } from '@angular/core';
import { UserService } from '../../../core/services';
import { User } from '../../../core/models/user.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-remove-user',
  templateUrl: './remove-user.component.html',
  styleUrls: ['./remove-user.component.css']
})
export class RemoveUserComponent implements OnInit {

  @Input() user;
  authType: String = '';
  title: String = '';
  isSubmitting = false;
  editUserForm: FormGroup;
  currentUser: User;

  constructor(
    private userService: UserService,
    private router: Router,
    private modalService: NgxSmartModalService
  ) {
   }

  ngOnInit() {
  }

  remove(user){
    console.log(user)
    this.userService.deleteUser(user.id).subscribe(res => {
      this.modalService.getModal('removeUserModal').close();
    })
  }

}
