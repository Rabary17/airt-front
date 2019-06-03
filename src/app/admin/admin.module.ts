import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { Routes, RouterModule } from '@angular/router';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { SharedModule } from '../shared';
import { AdminRoutingModule } from './admin-routing.module';
import { ImportComponent } from './import/import.component';
import { ReactiveFormsModule  } from '@angular/forms';
import { TicketModule } from '../admin/list-ticket/ticket.module';
import { ClientModule } from '../admin/list-client/client.module'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    TicketModule,
    ClientModule
  ],
  declarations: [AdminComponent, AdminMenuComponent, ImportComponent]
})
export class AdminModule { }
