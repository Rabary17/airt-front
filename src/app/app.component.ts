import { Component, OnInit, HostListener, Inject } from '@angular/core';

import { UserService } from './core';
import { JwtService } from './core/services/jwt.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})


export class AppComponent implements OnInit {
  constructor (
    private userService: UserService,
    private jwtService: JwtService,
    private router: Router,
    @Inject(DOCUMENT) private document: any
  ) {}

  public isScrolled: boolean;
  @HostListener('window:scroll', [])
  onWindowScroll() {
      const number = this.document.body.scrollTop;
      if (number > 150) {
          this.isScrolled = true;
          console.log(number);
      } else if (this.isScrolled && number < 10) {
          this.isScrolled = false;
      }
  }

  ngOnInit() {
    this.userService.populate();
    if (this.jwtService.getToken()) {
      console.log('connécté');
    } else {
      this.router.navigateByUrl('/login');
    }
  }
}
