import { Component, OnInit, ElementRef, HostListener, Output, EventEmitter, Input  } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap ,  tap } from 'rxjs/operators';

import { User, Ticket, TicketsService, Role } from '../core';
import { UserService } from '../core/services/user.service';
import { ClientService } from '../core/services/client.service';
import { NotificationService } from '../core/services/notification.service'
import { Profile } from '../core/models/profile.model'

@Component({
  selector: 'app-editor-page',
  templateUrl: './editor.component.html',
  styleUrls: ['editor.component.css'],
})
export class EditorComponent implements OnInit {
  article: Ticket = {} as Ticket;
  articleForm: FormGroup;
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
  keywordTech = 'username'
  currentUser;



  @HostListener('document: click', ['$event'])
  public clickout(event) {
    const clickedInside = this.eRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.showUsers = false;
      this.showClients = false;
    } else if (clickedInside) {
      this.showUsers = false;
      this.showClients = false;
    }
  }

  public selectSource : Array<any>;

  constructor(
    private articlesService: TicketsService,
    private clientService: ClientService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private eRef: ElementRef,
    private fb: FormBuilder,

    private notificationService : NotificationService
  ) {
    // use the FormBuilder to create a form group
    this.articleForm = this.fb.group({
      title: '',  
      status: '',
      source: '',
      cause: '',
      body: ['', [Validators.required, Validators.minLength(6)]],
      technician: '',
      client: '',
      modifiedBy: ''
    });
    this.clientForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],  
      email: ['', [Validators.required, Validators.email]],
    });


    // Initialized tagList as empty array
    this.article.tagList = [];

    // Optional: subscribe to value changes on the form
     // this.articleForm.valueChanges.subscribe(value => this.updateArticle(value));
  }

  ngOnInit() {
    // If there's an article prefetched, load it
    this.route.data.subscribe((data: { article: Ticket }) => {
      if (data.article) {
        this.article = data.article;
        this.articleForm.patchValue(data.article);
        this.articleForm.controls['client'].setValue(data.article.client.name);
        this.articleForm.controls['technician'].setValue(data.article.technician.username);
      }
    });
    this.userService.getAllUser().subscribe((res) => {
      let listTech = [];
      let prom = res.user.filter((tech) => {
        return tech.role === Role.Tech;
      });
      Promise.all(prom).then((res) =>{
        console.log(res);
        listTech.push(res);
        this.users = res;
      })
    });

    this.userService.currentUser.subscribe(res=>{
      this.currentUser = res;
    });
    // console.log('*********************************');
    this.clientService.getAllClient().subscribe((res) => {
      this.clients = res.clients,
      console.log(this.clients);
    });

  }

  showAddClient () {
    this.formAddClient = true;
  }
  cancelClient () {
    this.formAddClient = false;
    this.clientForm.reset('');
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

  addClient() {
    console.log(this.clientForm.value);
    this.clientService.addNewClient(this.clientForm.value).subscribe((res) => {
      this.clients.unshift(res);
      this.formAddClient = false;
      this.clientForm.reset('');
    })
  }
  autoCompleteClient() {
    const regex = new RegExp(this.articleForm.value.client, 'i');
    if (this.articleForm.value.client.length > 1) {
        this.clients = this.clients.filter( res => {
          this.showClients = true;
            return res['name'].match(regex);
          }
        );
    } else if (this.articleForm.value.client.length < 1) {
      this.showClients = false;
        this.clientService.getAllClient().subscribe((res) =>  {
          this.clients = res.clients;
        });
    }
  }

  setClientValue(client) {
    this.showClients = false;
    this.articleForm.patchValue({
      client: client.name
    });
    console.log(client._id);
  }
  autoCompleteTechnician() {
    const regex = new RegExp(this.articleForm.value.technician, 'i');
    if (this.articleForm.value.technician.length > 1) {
      console.log(this.articleForm.value.technician);
        this.users = this.users.filter( res => {
          this.showUsers = true;
          return res['username'].match(regex);
          }
        );
    } else if (this.articleForm.value.technician.length < 1) {
        this.showUsers = false;
        this.userService.getAllUser().subscribe(res => this.users = res.user);
    }
  }

  setTechValue(tech) {
    this.showUsers = false;
    this.articleForm.patchValue({
      technician: tech.username
    });
    console.log(tech.username);
  }

  addTag() {
    // retrieve tag control
    const tag = this.tagField.value;
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

  
  submitForm() {
    this.isSubmitting = true;
    // setting modifiedBy by last user who modified
    this.articleForm.controls['modifiedBy'].setValue(this.currentUser.username);
    // update the model
    this.updateArticle(this.articleForm.value);
    console.log('client', this.articleForm.value);
    console.log(this.article);
    // post the changes
    this.articlesService.save(this.article).subscribe(
      (article) => {
      this.notificationService.sendMsg({
        tag: 'Ticket',
        message:{ author: article.author,
                  reference: article.slug,
                  titre: article.title,
                  status: article.status,
                  modifiedBy: this.currentUser,
                  date: new Date()
                }
      }),
      this.router.navigateByUrl('/ticket/' + article.slug),
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }}
    );
  }

  updateArticle(values: Object) {
    Object.assign(this.article, values);
  }
}
