import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { NoAuthGuard } from './no-auth-guard.service';
import { SharedModule } from '../shared';
import { AuthRoutingModule } from './auth-routing.module';
import { ResetComponent } from './reset/reset.component';
import { ResetFormComponent } from './reset/reset-form.component'

@NgModule({
  imports: [
    SharedModule,
    AuthRoutingModule
  ],
  declarations: [
    AuthComponent,
    ResetComponent,
    ResetFormComponent
  ],
  providers: [
    NoAuthGuard,
  ]
})
export class AuthModule {}
