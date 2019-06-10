import { Component, OnInit, Output, Input } from '@angular/core';
import { UserService } from '../../../core/services';
import { User } from '../../../core/models/user.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ObserveOnOperator } from 'rxjs/internal/operators/observeOn';
import { ClientService } from '../../../core'

@Component({
  selector: 'app-remove-client',
  templateUrl: './remove-client.component.html',
  styleUrls: ['./remove-client.component.css']
})
export class RemoveClientComponent implements OnInit {

  @Input() client;
  @Output() userRemoved;
  authType: String = '';
  title: String = '';
  isSubmitting = false;
  editUserForm: FormGroup;
  currentUser: User;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private modalService: NgxSmartModalService
  ) {
   }

  ngOnInit() {
  }

  remove(client){
    this.clientService.deleteClient(client.id).subscribe(res => {
      this.clientService.clientListChanged.next(res);
      this.modalService.getModal('removeClientModal').close();
    })
  }

}
