import { Component, OnInit } from '@angular/core';
import { UserMenuComponent } from '../list-user/user-menu/user-menu.component'
import { User } from '../../core/models/user.model';
import { UserService } from '../../core/services';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  Users: Array<User>;

  constructor(
    private userService: UserService
  ) { 
        
   }

  ngOnInit() {
    this.userService.getAllUser().subscribe(res => this.Users = res.user);
  }

}
