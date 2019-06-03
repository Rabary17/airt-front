import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { AddClientComponent } from '../list-client/add-client/add-client.component';
import { ImportClientComponent } from '../list-client/import-client/import-client.component';
import { ListClientComponent } from '../list-client/list-client.component';

import { ReactiveFormsModule  } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgxSmartModalModule.forRoot()
  ],
  declarations: [AddClientComponent, ImportClientComponent, ListClientComponent]
})

export class ClientModule { }
