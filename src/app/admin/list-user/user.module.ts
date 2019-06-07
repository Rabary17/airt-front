import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared';
import { UserRoutingModule } from '../list-user/user-routing.module'
import { AddUserComponent } from './add-user/add-user.component'
import { ListUserComponent } from './list/list-user.component'
import { UserMenuComponent } from '../list-user/user-menu/user-menu.component'
import { UserComponent } from '../list-user/user.component'
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { ImportUserComponent } from '../list-user/import-user/import-user.component';
import { EditUserComponent } from '../list-user/edit-user/edit-user.component';
import { RemoveUserComponent } from '../list-user/remove-user/remove-user.component'


import { ReactiveFormsModule  } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UserRoutingModule,
    ReactiveFormsModule,
        NgxSmartModalModule.forRoot()
  ],
  declarations: [AddUserComponent, ListUserComponent, UserMenuComponent, UserComponent, ImportUserComponent, EditUserComponent, RemoveUserComponent]
})

export class UserModule { }
