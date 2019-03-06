import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ClientService } from '../../core/services/client.service';
@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit {
clients: Array<any>;

  constructor(
    private clientService: ClientService
  ) { }

  ngOnInit() {
    this.clientService.getAllClient().subscribe(res => {
      // console.log(res.clients);
      const Cli = [];
      res.clients.map( cl => {
        const TicketsTermine = [];
        const TicketsEncours = [];
        if (cl.Tickets.length > 0) {
        cl.Tickets.map( ti => {
          if (ti.status === 'Terminé') {
            TicketsTermine.push(ti);
            // console.log('Terminé =>', ti);
          } else if (ti.status === 'En cours' || ti.status === 'Non commencée') {
            TicketsEncours.push(ti);
            // console.log('Pas Terminé =>', ti);
          }
        });
      } else {
        cl.TicTer = 0;
        cl.TicEnc = 0;
      }
      cl.TicTer = TicketsTermine.length;
      cl.TicEnc = TicketsEncours.length;
      Cli.push(cl);
        // console.log(cl.Tickets);
      });
      this.clients = Cli;
      console.log('this.clients => ', this.clients);
      // this.clients = res.clients;

    });
    // this.clientService.getAllClient().subscribe(res => console.log(res.clients));
  }

}
