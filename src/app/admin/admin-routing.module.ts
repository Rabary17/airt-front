import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ListUserComponent } from './list-user/list/list-user.component';
import { ListClientComponent } from './list-client/list-client.component';
import { ListTicketComponent } from './list-ticket/list-ticket.component';
import { ImportComponent } from './import/import.component';
import { AddUserComponent } from './list-user/add-user/add-user.component';
import { UserModule } from './list-user/user.module';
import { UserComponent } from './list-user/user.component'

const adminRoutes: Routes = [
    {
      path: '',
      component: AdminComponent,
      children: [
        {
          path: 'user',
          loadChildren: './list-user/user.module#UserModule'
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
