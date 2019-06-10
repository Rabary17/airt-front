import { Component, OnInit, Input } from '@angular/core';
import { TicketsService } from '../../core/services/tickets.service';
import { Ticket } from '../../core/models/ticket.model';
import { ArticleListConfig } from '../../core';
import { NgxSmartModalService } from 'ngx-smart-modal';

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
    this.ticketService.ticketListChanged.subscribe(res => {
      this.ticketService.getAll().subscribe(res => this.tickets = res);
    })
  }

  edit(ticket) {
    console.log(ticket.slug)
    this.ticketService.getTicket(ticket.slug).subscribe(res => {
      this.modalService.setModalData(res, 'editTicketModal');
    })
  }

  archive(ticket){
    console.log(ticket.slug)
    this.ticketService.getTicket(ticket.slug).subscribe(res => {
      this.modalService.setModalData(res, 'archiveTicketModal');
    })
  }

  removeEditData(){
    this.modalService.resetModalData('editTicketModal');
  }

  removeArchiveData(){
    this.modalService.resetModalData('archiveTicketModal');
  }
}
