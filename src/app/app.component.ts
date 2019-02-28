import { Component, OnInit } from '@angular/core';

import { UserService } from './core';
import { JwtService } from './core/services/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor (
    private userService: UserService,
    private jwtService: JwtService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.populate();
    if (this.jwtService.getToken()) {
      console.log('connécté');
    } else {
      this.router.navigateByUrl('/login');
    }
  }
}
