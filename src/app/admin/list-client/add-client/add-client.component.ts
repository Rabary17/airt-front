import { Component, OnInit, Input } from '@angular/core';
import { TicketsService } from '../../../core/services/tickets.service';
import { Ticket } from '../../../core/models/ticket.model';
import { ArticleListConfig } from '../../../core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})

export class AddClientComponent implements OnInit {
  config: ArticleListConfig;
  tickets: [];
  constructor(
    private ticketService: TicketsService,
    private modalService: NgxSmartModalService
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
  // this.ticketService.getAll().subscribe(res => this.tickets = res);
  this.ticketService.getAll().subscribe(res => this.tickets = res);
}

}