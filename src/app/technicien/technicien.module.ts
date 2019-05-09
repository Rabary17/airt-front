import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechnicienComponent } from './technicien.component';
import { Routes, RouterModule } from '@angular/router';
import { TechnicienMenuComponent } from './technicien-menu/technicien-menu.component';
import { SharedModule } from '../shared';
import { TechnicienRoutingModule } from './technicien-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TechnicienRoutingModule
  ],
  declarations: [TechnicienComponent, TechnicienMenuComponent]
})
export class TechnicienModule { }
