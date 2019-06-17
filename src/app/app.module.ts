import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { AdminModule } from './admin/admin.module';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { TechnicienModule } from './technicien/technicien.module';
import { UserModule } from './admin/list-user/user.module';
import { UserRoutingModule } from './admin/list-user/user-routing.module';
import { ReportModule } from './report/report.module';
import { ReportRoutingModule } from './report/report-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  FooterComponent,
  HeaderComponent,
  SharedModule
} from './shared';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';



@NgModule({
  declarations: [AppComponent, FooterComponent, HeaderComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    HomeModule,
    AuthModule,
    AppRoutingModule,
    AdminModule,
    AdminRoutingModule,
    UserModule,
    UserRoutingModule,
    ReportModule,
    ReportRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
