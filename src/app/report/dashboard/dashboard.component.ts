import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../core'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private ticketService: TicketsService
  ) { }

  ngOnInit() {
    var today = new Date();
    var todayMonth = today.getMonth()+ 1;
    let stringDate = today.getFullYear() + '/' + todayMonth + '/' + today.getDate();
    console.log(stringDate)
    this.ticketService.getDaily(stringDate).subscribe(res => {
      console.log(res)
    })
  }

}
