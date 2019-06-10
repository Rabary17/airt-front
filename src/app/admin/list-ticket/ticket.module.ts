import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { AddTicketComponent } from '../list-ticket/add-ticket/add-ticket.component';
import { ImportTicketComponent } from '../list-ticket/import-ticket/import-ticket.component';
import { ListTicketComponent } from '../list-ticket/list-ticket.component';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { EditTicketComponent } from '../list-ticket/edit-ticket/edit-ticket.component'

import { ReactiveFormsModule  } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgSelectModule,
    AutocompleteLibModule,
    NgxSmartModalModule.forRoot()
  ],
  declarations: [AddTicketComponent, ImportTicketComponent, ListTicketComponent, EditTicketComponent]
})

export class TicketModule { }
