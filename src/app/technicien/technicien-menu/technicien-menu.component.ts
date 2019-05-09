import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { TicketsService } from '../../core/services/tickets.service';
import { ClientService } from '../../core/services/client.service';

@Component({
  selector: 'app-technicien-menu',
  templateUrl: './technicien-menu.component.html',
  styleUrls: ['./technicien-menu.component.css']
})
export class TechnicienMenuComponent implements OnInit {

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
