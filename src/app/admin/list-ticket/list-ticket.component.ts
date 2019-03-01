import { Component, OnInit, Input } from '@angular/core';
import { TicketsService } from '../../core/services/tickets.service';
import { Ticket } from '../../core/models/ticket.model';
import { ArticleListConfig } from '../../core';
@Component({
  selector: 'app-list-ticket',
  templateUrl: './list-ticket.component.html',
  styleUrls: ['./list-ticket.component.css']
})

export class ListTicketComponent implements OnInit {
  config: ArticleListConfig;
  tickets: [];
  constructor(
    private ticketService: TicketsService,
  ) {
    this.config = {
      type: '',
      filters: {
        tag: '',
        author: '',
        favorited: '',
        limit: 10,
        offset: 10
      },
  };
}

ngOnInit() {
  const array = [];
  this.ticketService.getAll().subscribe(res => this.tickets = res);
}

}
