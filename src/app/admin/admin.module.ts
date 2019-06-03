import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
// import { ListUserComponent } from './list-user/list-user.component';
import { Routes, RouterModule } from '@angular/router';
import { ListClientComponent } from './list-client/list-client.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { SharedModule } from '../shared';
import { AdminRoutingModule } from './admin-routing.module';
import { ImportComponent } from './import/import.component';
import { ReactiveFormsModule  } from '@angular/forms';
import { TicketModule } from '../admin/list-ticket/ticket.module'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    TicketModule,
  ],
  declarations: [AdminComponent, ListClientComponent, AdminMenuComponent, ImportComponent]
})
export class AdminModule { }
