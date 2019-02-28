import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ListUserComponent } from './list-user/list-user.component';
import { ListClientComponent } from './list-client/list-client.component';
import { ListTicketComponent } from './list-ticket/list-ticket.component';

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
          path: 'ticket',
          component: ListClientComponent,
          resolve: {}
        },
        {
          path: 'client',
          component: ListTicketComponent,
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
