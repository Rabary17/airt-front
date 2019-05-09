import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AdminComponent } from '../app/admin/admin.component';
import { NoAuthGuard } from './auth/no-auth-guard.service';
import { AdminGuard } from './core/services/admin-guard.service';
import { ManagerGuard } from './core/services/manager-guard.service';
import { NocGuard } from './core/services/noc-guard.service';
const routes: Routes = [
  {
    path: 'settings',
    loadChildren: './settings/settings.module#SettingsModule'
  },
  {
    path: 'profile',
    loadChildren: './profile/profile.module#ProfileModule'
  },
  {
    path: 'editor',
    loadChildren: './editor/editor.module#EditorModule',
    canActivate: [NocGuard],
  },
  {
    path: 'ticket',
    loadChildren: './article/article.module#ArticleModule',
    
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    canActivate: [ManagerGuard],
  },
  {
    path: 'technicien',
    loadChildren: './technicien/technicien.module#TechnicienModule',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preload all modules; optionally we could
    // implement a custom preloading strategy for just some
    // of the modules (PRs welcome 😉)
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
