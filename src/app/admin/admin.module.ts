import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
// import { ListUserComponent } from './list-user/list-user.component';
import { Routes, RouterModule } from '@angular/router';
import { ListClientComponent } from './list-client/list-client.component';
import { ListTicketComponent } from './list-ticket/list-ticket.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { SharedModule } from '../shared';
import { AdminRoutingModule } from './admin-routing.module';
import { ImportComponent } from './import/import.component';
import { ReactiveFormsModule  } from '@angular/forms';
import { UserModule } from '../admin/list-user/user.module';
import { UserRoutingModule } from '../admin/list-user/user-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    UserModule,
    UserRoutingModule
  ],
  declarations: [AdminComponent, ListClientComponent, ListTicketComponent, AdminMenuComponent, ImportComponent]
})
export class AdminModule { }
