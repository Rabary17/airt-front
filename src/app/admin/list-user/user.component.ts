import { Component, OnInit, AfterViewInit, Output, Input} from '@angular/core';
import { UserService } from '../../core/services';
import { User } from '../../core/models/user.model';
import { NgxSmartModalService } from 'ngx-smart-modal';
import * as Rx from 'rxjs';
@Component({
  selector: 'app-list-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  Users: Array<User>;
  @Output() user: User;
  constructor(
    private userService: UserService,
    private modalService: NgxSmartModalService
  ) { }

  ngOnInit() {
    this.userService.getAllUser().subscribe(res => this.Users = res.user);
    console.log('this.userService.userListChanged' + this.userService.userListChanged.subscribe(res => console.log(JSON.stringify(res))));
    this.userService.userListChanged.subscribe(res => {
      return this.userService.getAllUser().subscribe(res => this.Users = res.user);
    })
  }

  edit(user) {
    this.userService.getUser(user.id).subscribe(res => {
      this.modalService.setModalData(res, 'editUserModal');
    })
  }

  delete(user){
    this.userService.getUser(user.id).subscribe(res => {
      this.modalService.setModalData(res, 'removeUserModal');
    })
  }

  removeEditData(){
    this.modalService.resetModalData('editUserModal');
  }
  
  removeDeleteData(){
    this.modalService.resetModalData('removeUserModal');
  }
}
