import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { User, Ticket } from '../../core';
import { FormBuilder, FormGroup, FormControl, Validators  } from '@angular/forms';
import { ImportService } from '../../core/services/import.service';
import { TicketsService } from '../../core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

tickets: [Ticket];

  constructor(
    private fb: FormBuilder,
    private importService: ImportService,
    private ticketService: TicketsService,
    private modalService: NgxSmartModalService,
  ) {

   }

  ngOnInit() {
      this.ticketService.getArchived().subscribe(res => {
          this.tickets = res
      })
      this.ticketService.ticketListChanged.subscribe(res => {
        this.ticketService.getArchived().subscribe(res => {
            this.tickets = res
        })
      })
  }

  unarchive(ticket){
    this.modalService.setModalData(ticket, 'unarchiveTicketModal');
  }

  removeUnarchiveData(){
    this.modalService.resetModalData('unarchiveTicketModal');
  }

  submitForm(){
  }
}
