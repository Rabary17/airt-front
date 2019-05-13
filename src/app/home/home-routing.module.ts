import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { HomeAuthResolver } from './home-auth-resolver.service';
import { NoAuthGuard } from '../auth/no-auth-guard.service';
import { ManagerGuard } from '../core/services/manager-guard.service';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [ManagerGuard], 
    resolve: {
      isAuthenticated: HomeAuthResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
