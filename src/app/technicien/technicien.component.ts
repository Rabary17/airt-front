import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TechnicienService } from '../core/services/technicien.service';
import { ProfilesService } from '../core/services/profiles.service';
import { UserService } from '../core/services/user.service';
import { TicketsService } from '../core/services/tickets.service';
import { ArticleListConfig } from '../core';
import { Ticket } from '../core/models/ticket.model';
@Component({
  selector: 'app-admin',
  templateUrl: './technicien.component.html',
  styleUrls: ['./technicien.component.css']
})
export class TechnicienComponent implements OnInit {

  constructor(
    private router: Router,
    private _technicienService : TechnicienService ,
    private _profileService: ProfilesService,
    private _UserService: UserService,
    private _ticketService: TicketsService
  ) { }

  allTicket: Array<any>;
  openTicket: Array<any>;
  inprogressTicket: Array<any>;
  pendingTicket: Array<any>;
  closeTicket: Array<any>;
  currentUser;
  filtre: String = 'All';

  ngOnInit() {
    let user = this._UserService.getCurrentUser().username;
    this._profileService.get(user).subscribe(data => {
      return this.currentUser = data;
    })
    this._ticketService.getAll().subscribe( data => {
      this.allTicket = data.filter(x => 
        x.technician.username === user
      ); 
      Object.assign(this.allTicket, {length: this.allTicket.length});
      this.openTicket = data.filter(x => 
        x.technician.username === user && x.status === 'Open'
      ); 
      Object.assign(this.openTicket, {length: this.openTicket.length});
      this.inprogressTicket = data.filter(x => 
        x.technician.username === user && x.status === 'In progress'
      ); 
      this.pendingTicket = data.filter(x => 
        x.technician.username === user && x.status === 'Pending'
      );
      Object.assign(this.pendingTicket, {length: this.pendingTicket.length});
      this.closeTicket = data.filter(x => 
        x.technician.username === user && x.status === 'Close'
      );
      Object.assign(this.closeTicket, {length: this.closeTicket.length});
    })
  }

  filter(type: String) {
    this.filtre = type;
  }

}
