import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { TicketsService } from '../../core/services/tickets.service';
import { ClientService } from '../../core/services/client.service';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {

  constructor(
    private userService: UserService,
    private clientService: ClientService,
    private ticketService: TicketsService,
  ) { }

  totalClient;
  totalUser;
  totalTicket;

  ngOnInit() {
    this.userService.getAllUser().subscribe( res => {
      this.totalUser = res.user.length;
    });
    this.clientService.getAllClient().subscribe( res => {
      this.totalClient = res.clients.length;
    });
    this.ticketService.getAll().subscribe(res => {
      this.totalTicket = res.length;
    });
  }

}
