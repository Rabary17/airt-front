import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { Response } from 'selenium-webdriver/http';


@Injectable()
export class NotificationService {

  messages: Subject<any>;

  // Our constructor calls our wsService connect method
  constructor(private wsService: WebsocketService) {
    this.messages = <Subject<any>>wsService
      .connect()
      .map((response: any): any => {
        console.log('response', response)
        return response;
      });
   }

  // Our simplified interface for sending
  // messages back to our socket.io server
  sendMsg(msg) {
    this.messages.next(msg);
    console.log('chat service message : ' + JSON.stringify(msg));
  }
}
