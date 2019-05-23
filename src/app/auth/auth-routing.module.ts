import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { NoAuthGuard } from './no-auth-guard.service';
import { ResetComponent } from './reset/reset.component';
import { ResetFormComponent } from './reset/reset-form.component';
import { ManagerGuard } from '../core/services/manager-guard.service';

const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'register',
    component: AuthComponent,
    canActivate: [ManagerGuard]
  },
  {
    path: 'reset',
    component: ResetComponent
  },
  {
    path: 'reset/:token',
    component: ResetFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
