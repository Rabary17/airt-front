import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services';
import { User } from '../../core/models/user.model';
import { NgxSmartModalService } from 'ngx-smart-modal';
@Component({
  selector: 'app-list-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  Users: Array<User>;

  constructor(
    private userService: UserService,
    private modalService: NgxSmartModalService
  ) { }

  ngOnInit() {
    this.userService.getAllUser().subscribe(res => this.Users = res.user);
  }

}
