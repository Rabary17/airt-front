import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TechnicienService } from '../core/services/technicien.service';
import { UserService } from '../core/services/user.service';
import { TicketsService } from '../core/services/tickets.service';
@Component({
  selector: 'app-admin',
  templateUrl: './technicien.component.html',
  styleUrls: ['./technicien.component.css']
})
export class TechnicienComponent implements OnInit {

  constructor(
    private router: Router,
    private _technicienService : TechnicienService ,
    private _userService: UserService,
    private _ticketService: TicketsService
  ) { }

  allTicket: Array<any>;
  currentUser;

  ngOnInit() {
    let user = this._userService.getCurrentUser().username
    return this._ticketService.getAll().subscribe( data => {
      this.allTicket = data.filter(x => 
        x.technician.username === user
      ); 
      console.log(this.allTicket);
      
    })
  }

}
