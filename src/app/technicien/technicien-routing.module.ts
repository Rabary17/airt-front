import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { TechnicienComponent } from './technicien.component';

const adminRoutes: Routes = [
    {
      path: '',
      component: TechnicienComponent,
      children: [
        // {
        //   path: 'user',
        //   component: ListUserComponent,
        //   resolve: {}
        // },
        // {
        //   path: 'client',
        //   component: ListClientComponent,
        //   resolve: {}
        // },
        // {
        //   path: 'ticket',
        //   component: ListTicketComponent,
        //   resolve: {}
        // }
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
  export class TechnicienRoutingModule {}
  export const AdminComponents = [
    TechnicienComponent
];
