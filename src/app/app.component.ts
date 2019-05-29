import { Component, OnInit, HostListener, Inject } from '@angular/core';

import { UserService } from './core';
import { JwtService } from './core/services/jwt.service';
import { Router, ActivatedRoute } from '@angular/router';
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
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: any
  ) {}

  public isScrolled: boolean;
  @HostListener('window:scroll', [])
  onWindowScroll() {
      const number = this.document.body.scrollTop;
      if (number > 150) {
          this.isScrolled = true;
      } else if (this.isScrolled && number < 10) {
          this.isScrolled = false;
      }
  }

  ngOnInit() {
    this.userService.populate();
    this.route.data.subscribe((url) => {
      if (url.path === 'reset') {
        return this.router.navigateByUrl('/reset');
      } else {
                  if (this.jwtService.getToken()) {
                  } else 
                    { 
                    this.router.navigateByUrl('/login');
                  }
      }
    });
    

  }
}
