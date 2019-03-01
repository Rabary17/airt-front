import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.model';
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  Users: Array<User>;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getAllUser().subscribe(res => this.Users = res.user);
  }

}
