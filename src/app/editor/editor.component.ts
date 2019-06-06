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
  keywordTech = 'username';
  currentUser;
  currentClient;



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
        this.currentClient = data.article.client;
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
    this.clientService.addNewClient(this.clientForm.value).subscribe((res) => {
      this.clients.unshift(res);
      this.formAddClient = false;
      this.clientForm.reset('');
    })
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
    // post the changes
    this.articlesService.save(this.article).subscribe(
      (article) => {
        console.log('this.currentClient', this.articleForm.controls['client'].value)
      this.notificationService.sendMsg({
        tag: 'Ticket',
        message:{ author: article.author,
                  reference: article.slug,
                  client: this.articleForm.controls['client'].value,
                  titre: article.title,
                  status: article.status,
                  modifiedBy: this.currentUser,
                  date: new Date(),
                  type: 'Ticket'
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
