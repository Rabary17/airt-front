import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { Routes, RouterModule } from '@angular/router';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { SharedModule } from '../shared';
import { AdminRoutingModule } from './admin-routing.module';
import { ConfigurationComponent } from './configuration/configuration.component';
import { ReactiveFormsModule  } from '@angular/forms';
import { TicketModule } from '../admin/list-ticket/ticket.module';
import { ClientModule } from '../admin/list-client/client.module';
import { ArchiveComponent } from '../admin/archive/archive.component';
import { UnarchiveComponent } from '../admin/archive/unarchive.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    TicketModule,
    ClientModule,
    NgxSmartModalModule.forRoot()
  ],
  declarations: [AdminComponent, AdminMenuComponent, ConfigurationComponent, ArchiveComponent, UnarchiveComponent]
})
export class AdminModule { }
