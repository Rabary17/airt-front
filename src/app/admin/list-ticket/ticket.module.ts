import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { AddTicketComponent } from '../list-ticket/add-ticket/add-ticket.component';
import { ImportTicketComponent } from '../list-ticket/import-ticket/import-ticket.component';
import { ListTicketComponent } from '../list-ticket/list-ticket.component';

import { ReactiveFormsModule  } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgxSmartModalModule.forRoot()
  ],
  declarations: [AddTicketComponent, ImportTicketComponent, ListTicketComponent]
})

export class TicketModule { }
