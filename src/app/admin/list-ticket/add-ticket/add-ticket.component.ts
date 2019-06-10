import { Component, OnInit } from '@angular/core';
import { UserService, ClientService, TicketsService } from '../../../core';
import { User } from '../../../core/models/user.model';
import { Ticket } from '../../../core/models/ticket.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Role } from '../../../core'

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.css']
})
export class AddTicketComponent implements OnInit {

  article: Ticket = {} as Ticket;
  addTicketForm: FormGroup;
  tagField = new FormControl();
  errors: Object = {};
  isSubmitting = false;
  users: Array<any>;
  clients: Array<any>;
  showUsers = false;
  showClients = false;
  show = false;
  clientForm: FormGroup;
  formAddClient:boolean =  false;
  keyword = 'name';
  keywordTech = 'username';
  currentUser;
  currentClient;
  
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private modalService: NgxSmartModalService,
    private clientService: ClientService,
    private ticketService: TicketsService
  ) {
        // use FormBuilder to create a form group
        this.addTicketForm = this.fb.group({
          title: '',  
          status: '',
          source: '',
          cause: '',
          body: ['', [Validators.required, Validators.minLength(6)]],
          technician: '',
          client: '',
          modifiedBy: ''
        });
        this.article.tagList = Array<any> ()
   }

  ngOnInit() {
    this.userService.getAllUser().subscribe((res) => {
      let listTech = [];
      let prom = res.user.filter((tech) => {
        return tech.role === Role.Tech;
      });
      Promise.all(prom).then((res) =>{
        listTech.push(res);
        this.users = res;
      })
    });

    this.userService.currentUser.subscribe(res=>{
      this.currentUser = res;
    });
    // console.log('*********************************');
    this.clientService.getAllClient().subscribe((res) => {
      this.clients = res.clients
    });
  }

  submitForm(){
    this.ticketService.save(this.addTicketForm.value).subscribe(res => {
      this.ticketService.ticketListChanged.next(res);
      this.modalService.close('addTicketModal');
    })
  }

  addTag() {
    // retrieve tag control
    const tag = this.tagField.value;
    console.log('this.tagField.value', this.tagField.value)
    console.log('this.article.tagList', this.article)
    // only add tag if it does not exist yet
    if (this.article.tagList.indexOf(tag) < 0) {
      this.article.tagList.push(tag);
    }
    // clear the input
    this.tagField.reset('');
  }

  removeTag(tagName: string) {
    this.article.tagList = this.article.tagList.filter(tag => tag !== tagName);
  }

  
  // newClient = ``
  selectEvent(item) {
    // do something with selected item
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e){
    // do something when input is focused
  }

}
