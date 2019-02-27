import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { User, Article, ArticlesService } from '../core';
import { UserService } from '../core/services/user.service';
import { ClientService } from '../core/services/client.service';
@Component({
  selector: 'app-editor-page',
  templateUrl: './editor.component.html'
})
export class EditorComponent implements OnInit {
  article: Article = {} as Article;
  articleForm: FormGroup;
  tagField = new FormControl();
  errors: Object = {};
  isSubmitting = false;
  users: Array<any>;
  clients: Array<any>;

  constructor(
    private articlesService: ArticlesService,
    private clientService: ClientService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    // use the FormBuilder to create a form group
    this.articleForm = this.fb.group({
      title: '',
      description: '',
      body: '',
      technician: '',
      client: ''
    });

    // Initialized tagList as empty array
    this.article.tagList = [];

    // Optional: subscribe to value changes on the form
    // this.articleForm.valueChanges.subscribe(value => this.updateArticle(value));
  }

  ngOnInit() {
    // If there's an article prefetched, load it
    this.route.data.subscribe((data: { article: Article }) => {
      if (data.article) {
        this.article = data.article;
        this.articleForm.patchValue(data.article);
      }
    });
    this.userService.getAllUser().subscribe(res => this.users = res.user);
    // console.log('*********************************');
    this.clientService.getAllClient().subscribe(res => this.clients = res.clients);
  }

  autoCompleteClient() {
    const regex = new RegExp(this.articleForm.value.client, 'i');
    if (this.articleForm.value.client.length > 3) {
      console.log(this.articleForm.value.client);
        this.clients = this.clients.filter( res => {
          return res['name'].match(regex);
          }
        );
    } else if (this.articleForm.value.client.length < 4) {
        this.clientService.getAllClient().subscribe(res => this.clients = res.clients);
    }
  }
  setClientValue(client) {
    // this.articleForm.value.client.setValue(client._id);
    this.articleForm.patchValue({
      client: client.name
    });
    console.log(client._id);
  }
  autoCompleteTechnician() {
    const regex = new RegExp(this.articleForm.value.technician, 'i');
    if (this.articleForm.value.technician.length > 3) {
      console.log(this.articleForm.value.technician);
        this.users = this.users.filter( res => {
          return res['username'].match(regex);
          }
        );
    } else if (this.articleForm.value.technician.length < 4) {
        this.userService.getAllUser().subscribe(res => this.users = res.user);
    }
  }
  setTechValue(tech) {
    // this.articleForm.value.technician.setValue(tech.id);
    this.articleForm.patchValue({
      technician: tech.id
    });
    console.log(tech.id);
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

    // update the model
    this.updateArticle(this.articleForm.value);

    // post the changes
    this.articlesService.save(this.article).subscribe(
      article => this.router.navigateByUrl('/ticket/' + article.slug),
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }

  updateArticle(values: Object) {
    Object.assign(this.article, values);
  }
}
