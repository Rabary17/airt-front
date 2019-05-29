import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ListUserComponent } from './list-user/list-user.component';
import { ListClientComponent } from './list-client/list-client.component';
import { ListTicketComponent } from './list-ticket/list-ticket.component';
import { ImportComponent } from './import/import.component'

const adminRoutes: Routes = [
    {
      path: '',
      component: AdminComponent,
      children: [
        {
          path: 'user',
          component: ListUserComponent,
          resolve: {}
        },
        {
          path: 'client',
          component: ListClientComponent,
          resolve: {}
        },
        {
          path: 'ticket',
          component: ListTicketComponent,
          resolve: {}
        },
        {
          path: 'import',
          component: ImportComponent,
          resolve: {}
        }
      ]
    }
  ];

  @NgModule({
    imports: [
      RouterModule.forChild(adminRoutes)
    ],
    exports: [
      RouterModule,
    ]
  })
  export class AdminRoutingModule {}
  export const AdminComponents = [
    ListUserComponent,
    ListClientComponent,
    ListTicketComponent,
    AdminComponent
];
