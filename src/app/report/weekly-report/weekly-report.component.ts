import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../core'

@Component({
  selector: 'app-weekly-report',
  templateUrl: './weekly-report.component.html',
  styleUrls: ['./weekly-report.component.css']
})
export class WeeklyReportComponent implements OnInit {

  constructor(
    private ticketService : TicketsService
  ) { }

  ngOnInit() {

  }

}
