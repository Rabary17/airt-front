import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AddUserComponent } from '../list-user/crud/add-user.component';
import { UserComponent } from '../list-user/user.component'
import { ListUserComponent } from '../list-user/list/list-user.component'

const userRoutes: Routes = [
    {
      path: '',
      component: UserComponent,
      children: [
        {
            path: 'all',
            component: ListUserComponent
          },
        {
          path: 'add',
          component: AddUserComponent
        }
      ]
    }
  ];

  @NgModule({
    imports: [
      RouterModule.forChild(userRoutes)
    ],
    exports: [
      RouterModule,
    ]
  })
  export class UserRoutingModule {}
  export const UserComponents = [
    ListUserComponent
];
