import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { AddClientComponent } from '../list-client/add-client/add-client.component';
import { ImportClientComponent } from '../list-client/import-client/import-client.component';
import { ListClientComponent } from '../list-client/list-client.component';
import { EditClientComponent } from '../list-client/edit-client/edit-client.component';
import { ReactiveFormsModule  } from '@angular/forms';
import { RemoveClientComponent } from '../list-client/remove-client/remove-client.component'


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgxSmartModalModule.forRoot()
  ],
  declarations: [AddClientComponent, ImportClientComponent, ListClientComponent, EditClientComponent, RemoveClientComponent]
})

export class ClientModule { }
