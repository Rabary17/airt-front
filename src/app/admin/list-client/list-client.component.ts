import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ClientService } from '../../core/services/client.service';
import { TicketsService } from '../../core';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit {
clients: Array<any>;
termine: number;
restant: number;
total: number;

  constructor(
    private clientService: ClientService,
    private ticketService: TicketsService,
  ) { }

  ngOnInit() {
    const TicketTermine = [];
    const TicketRestant = [];
    this.ticketService.getAll().subscribe(res => {
      res.map((ticket) => {
        if (ticket.status === 'Terminé') {
          TicketTermine.push(ticket);
        } else if (ticket.status === 'En cours' || ticket.status === 'Non commencée') {
          TicketRestant.push(ticket);
        }
      });
      this.termine = TicketTermine.length;
      this.restant = TicketRestant.length;
      this.total = res.length;
    });

    this.clientService.getAllClient().subscribe(res => {
      const Cli = [];
      res.clients.map( cl => {
        const TicketsTermine = [];
        const TicketsEncours = [];
        if (cl.Tickets.length > 0) {
        cl.Tickets.map( ti => {
          if (ti.status === 'Terminé') {
            TicketsTermine.push(ti);
          } else if (ti.status === 'En cours' || ti.status === 'Non commencée') {
            TicketsEncours.push(ti);
          }
        });
      } else {
        cl.TicTer = 0;
        cl.TicEnc = 0;
      }
      cl.TicTer = TicketsTermine.length;
      cl.TicEnc = TicketsEncours.length;
      Cli.push(cl);
      });
      this.clients = Cli;
      // this.clients = res.clients;

    });
    // this.clientService.getAllClient().subscribe(res => console.log(res.clients));
  }

}
