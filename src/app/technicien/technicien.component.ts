import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TechnicienService } from '../core/services/technicien.service';
import { ProfilesService } from '../core/services/profiles.service';
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
    private _profileService: ProfilesService,
    private _UserService: UserService,
    private _ticketService: TicketsService
  ) { }

  allTicket: Array<any>;
  currentUser;

  ngOnInit() {
    let user = this._UserService.getCurrentUser().username;
    this._profileService.get(user).subscribe(data => {
      return this.currentUser = data;
    })
    this._ticketService.getAll().subscribe( data => {
      return this.allTicket = data.filter(x => 
        x.technician.username === user
      ); 
      console.log(this.allTicket);
      
    })
  }

}
