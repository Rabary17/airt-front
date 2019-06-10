import { Component, OnInit, Input } from '@angular/core';
import { User, Client } from '../../../core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ArticleListConfig, ClientService } from '../../../core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { UserService, FileService, TicketsService } from '../../../core/services';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-archive-ticket',
  templateUrl: './archive-ticket.component.html',
  styleUrls: ['./archive-ticket.component.css']
})

export class ArchiveTicketComponent implements OnInit {
  @Input() ticket;
  config: ArticleListConfig;
  tickets: [];
  editClientForm: FormGroup;
  private fileName;
  private file;

  constructor(
    private clientService: ClientService,
    private modalService: NgxSmartModalService,
    private fb: FormBuilder,
    private userService: UserService,
    private fileService: FileService,
    private ticketService: TicketsService
  ) {

  }

  ngOnInit() {

  }

  archiveTicket(slug){
    console.log(slug)
    this.ticketService.archiveTicket(slug).subscribe(res => {
        console.log('resultat archivage', res)
        this.ticketService.ticketListChanged.next(res);
        this.modalService.close('archiveTicketModal')
    })
  }

}
