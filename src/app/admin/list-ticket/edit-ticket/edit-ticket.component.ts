import { Component, OnInit, Input } from '@angular/core';
import { User, Client } from '../../../core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ArticleListConfig, ClientService } from '../../../core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { UserService, FileService, TicketsService } from '../../../core/services';
import { environment } from '../../../../environments/environment';
import { Role } from '../../../core'

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.css']
})

export class EditTicketComponent implements OnInit {
  @Input() ticket;
  config: ArticleListConfig;
  tickets: [];
  editTicketForm: FormGroup;
  private fileName;
  private file;
  keyword = 'name';
  keywordTech = 'username';
  tagField = new FormControl();
  errors: Object = {};
  isSubmitting = false;
  users: Array<any>;
  clients: Array<any>;
  currentUser;

  constructor(
    private clientService: ClientService,
    private modalService: NgxSmartModalService,
    private fb: FormBuilder,
    private userService: UserService,
    private fileService: FileService,
    private ticketService: TicketsService
  ) {
            // use FormBuilder to create a form group
            this.editTicketForm = this.fb.group({
                slug: '',
                title: '',  
                status: '',
                source: '',
                cause: '',
                body: ['', [Validators.required, Validators.minLength(6)]],
                technician: '',
                client: '',
                modifiedBy: ''
              });
            //   this.ticket.tagList = Array<any> ()
  }

  ngOnInit() {
    this.userService.getAllUser().subscribe((res) => {
        let listTech = [];
        let prom = res.user.filter((tech) => {
          return tech.role === Role.Tech;
        });
        Promise.all(prom).then((res) =>{
          listTech.push(res);
          console.log('liste technicien',res)
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

    this.editTicketForm.patchValue(this.ticket);

    this.editTicketForm.controls['client'].patchValue(this.ticket.client.name);
    this.editTicketForm.controls['technician'].patchValue(this.ticket.technician.username);
  }

  submitForm(){
    // this.editTicketForm.controls['client'].patchValue(this.ticket.client);
    // this.editTicketForm.controls['technician'].patchValue(this.ticket.technician);
          // update the model
    this.updateTicket(this.editTicketForm.value);
      console.log('befooooooore', this.ticket)
    this.ticketService.save(this.ticket).subscribe(res => {
        this.ticketService.ticketListChanged.next(res);
        this.modalService.close('editTicketModal');
    })
  }

  public onFileChange(event) {
    const reader = new FileReader();
 
    if (event.target.files && event.target.files.length) {
        console.log(event.target.files[0].name)
      this.fileName = event.target.files[0].name;
      const [file] = event.target.files;
      reader.readAsDataURL(file);
     
      reader.onload = () => {
        this.file = reader.result
      };
    }
  }

  
  addTag() {
    // retrieve tag control
    const tag = this.tagField.value;
    console.log('this.tagField.value', this.tagField.value)
    console.log('this.article.tagList', this.ticket)
    // only add tag if it does not exist yet
    if (this.ticket.tagList.indexOf(tag) < 0) {
      this.ticket.tagList.push(tag);
    }
    // clear the input
    this.tagField.reset('');
  }

  removeTag(tagName: string) {
    this.ticket.tagList = this.ticket.tagList.filter(tag => tag !== tagName);
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

  updateTicket(values: Object) {
    Object.assign(this.ticket, values);
  }

}
