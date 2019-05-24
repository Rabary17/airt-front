import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';

import {
  ApiService,
  TicketsService,
  AuthGuard,
  CommentsService,
  JwtService,
  ProfilesService,
  TagsService,
  UserService,
  ClientService,
  AdminGuard,
  ManagerGuard,
  NocGuard,
  TechnicienService,
  WebsocketService,
  NotificationService
} from './services';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    ApiService,
    TicketsService,
    AuthGuard,
    CommentsService,
    JwtService,
    ProfilesService,
    TagsService,
    UserService,
    ClientService,
    AdminGuard,
    ManagerGuard,
    NocGuard,
    TechnicienService,
    WebsocketService,
    NotificationService
  ],
  declarations: []
})
export class CoreModule { }
