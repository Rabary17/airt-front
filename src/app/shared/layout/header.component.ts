import { Component, OnInit } from '@angular/core';

import { User, UserService } from '../../core';
import { NotificationService } from '../../core';
import { WebsocketService } from '../../core';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';
import { Notification } from '../../core/models/notification.model'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs';
@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService,
    private websocketService: WebsocketService
  ) { }

  currentUser: User;
  private on: boolean = false;
  private socket = io.connect('http://localhost:3000');
  private nbrNotif: number = 0;
  private allNotif = [];
  private show: boolean = false;

  ngOnInit() {
    this.listen().subscribe(res => {
      this.allNotif.push(res)
      console.log('notificationnnnnnnnnn', res)
      this.nbrNotif = this.allNotif.length;
    })
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    );
  }

  showNotif() {
    this.show = true;
  }

  listen(): Rx.Subject<MessageEvent> {

    const notif = new Observable(res => {
        this.socket.on('message', (data) => {
          res.next(data);
        });
    });

    const observer = {
        next: (data: Object) => {
            this.socket.emit('message', data);
        },
    };

    return Rx.Subject.create(observer, notif);
  }

  logout() {
    this.userService.purgeAuth();
    this.notificationService.sendMsg({
      tag: 'userDisconnected',
      username: this.currentUser.username
    });
    this.router.navigateByUrl('/login');
  }
}
