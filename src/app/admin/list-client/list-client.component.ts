import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../core/services/client.service';
@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit {
clients: [];
  constructor(
    private clientService: ClientService
  ) { }

  ngOnInit() {
    this.clientService.getAllClient().subscribe(res => this.clients = res.clients);
  }

}
