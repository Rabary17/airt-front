import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { UserService } from './user.service';
import { take } from 'rxjs/operators';
import {  Role } from '../../core/models/role.model'

@Injectable()
export class NocGuard implements CanActivate {
    isNoc = false;
  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {

    this.userService.currentUser.subscribe((userData) => {
        if (userData.role === Role.Noc ) {
          console.log('userData.role', userData.role);
          console.log('Role.Noc', Role.Noc);
            return this.isNoc = true;
        }
    });
    return of(this.isNoc);

  }
}
