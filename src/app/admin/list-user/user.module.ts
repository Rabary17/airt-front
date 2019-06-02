import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared';
import { UserRoutingModule } from '../list-user/user-routing.module'
import { AddUserComponent } from '../list-user/crud/add-user.component'
import { ListUserComponent } from './list/list-user.component'
import { UserMenuComponent } from '../list-user/user-menu/user-menu.component'
import { UserComponent } from '../list-user/user.component'

import { ReactiveFormsModule  } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UserRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddUserComponent, ListUserComponent, UserMenuComponent, UserComponent]
})

export class UserModule { }
