import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { User, Ticket } from '../../core';
import { FormBuilder, FormGroup, FormControl, Validators  } from '@angular/forms';
import { ImportService } from '../../core/services/import.service';
import { TicketsService } from '../../core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-unarchive',
  templateUrl: './unarchive.component.html',
  styleUrls: ['./unarchive.component.css']
})
export class UnarchiveComponent implements OnInit {

@Input() ticket;
  constructor(
    private fb: FormBuilder,
    private importService: ImportService,
    private ticketService: TicketsService,
    private modalService: NgxSmartModalService,
  ) {

   }

  ngOnInit() {
      
  }

  unarchiveTicket(slug){
    this.ticketService.unarchiveTicket(slug).subscribe(res => {
        this.ticketService.ticketListChanged.next(res);
        this.modalService.close('unarchiveTicketModal')
    })
  }
}
