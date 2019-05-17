import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FormBuilder, Validators } from '@angular/forms';

import {
  Ticket,
  TicketsService,
  Comment,
  CommentsService,
  User,
  UserService,
  FileService
} from '../core';


@Component({
  selector: 'app-article-page',
  styleUrls: ['article.component.css'],
  templateUrl: './article.component.html'
})
export class ArticleComponent implements OnInit {

 
  constructor(
    private route: ActivatedRoute,
    private articlesService: TicketsService,
    private commentsService: CommentsService,
    private router: Router,
    private userService: UserService,
    private fileService: FileService,
    private http: HttpClient,
    private fb: FormBuilder
  ) { }
  public formGroup = this.fb.group({
    file: [null, Validators.required]
  });
 
  private fileList: string[] = new Array<string>();
  private fileList$: Subject<string[]> = new Subject<string[]>();
  
  article: Ticket;
  currentUser: User;
  avatar: String;
  canModify: boolean;
  comments: Comment[];
  commentControl = new FormControl();
  commentFormErrors = {};
  isSubmitting = false;
  isDeleting = false;
  imageContainer = [];
  private fileName;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '5rem',
    minHeight: '5rem',
    placeholder: 'Ecrivez votre commentaire',
    translate: 'no',
    uploadUrl: 'http://localhost:3000/api/upload/files', // if needed
    customClasses: [ // optional
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };


  ngOnInit() {
    // Retreive the prefetched article
    this.route.data.subscribe(
      (data: { article: Ticket }) => {
        this.article = data.article;
        console.log(this.article);

        // Load the comments on this article
        this.populateComments();
      }
    );

    // Load the current user's data
    this.userService.currentUser.subscribe(
      (userData: User) => {
        this.currentUser = userData;
        this.avatar = this.currentUser.image ? this.currentUser.image : 'http://localhost/madadev/smiley-cyrus.jpg';

        this.canModify = (this.currentUser.username === this.article.author.username);
      }
    );
  }

  onToggleFavorite(favorited: boolean) {
    this.article.favorited = favorited;

    if (favorited) {
      this.article.favoritesCount++;
    } else {
      this.article.favoritesCount--;
    }
  }

  onToggleFollowing(following: boolean) {
    this.article.author.following = following;
  }

  deleteArticle() {
    this.isDeleting = true;

    this.articlesService.destroy(this.article.slug)
      .subscribe(
        success => {
          this.router.navigateByUrl('/');
        }
      );
  }

  populateComments() {
    this.commentsService.getAll(this.article.slug)
      .subscribe(comments => this.comments = comments);
  }
  onFileChange(event) {
    const reader = new FileReader();
    // this.imageContainer.push(event.target.file);
 
    if (event.target.files && event.target.files.length) {
      this.fileName = event.target.files[0].name;
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      // push le nom des fichiers dans un tableau
      this.fileList.push(this.fileName);
      // met à jour la liste des fichier dans le service 
      this.fileList$.next(this.fileList);
      reader.onload = () => {
        this.formGroup.patchValue({
          file: reader.result
        });
        // push le nom et la base64 du fichier dans le tableau
        this.imageContainer.push({'filename': event.target.files[0].name, 'filecontent': reader.result});
      };
      
    }
  }
  
  public remove(fileName: string):  void {
    // supprime la liste des fichiers dans tous les tables
    this.fileList.splice(this.fileList.findIndex(name => name === fileName), 1);
    this.imageContainer.splice(this.fileList.findIndex(name => name === fileName), 1);
    this.fileList$.next(this.fileList);
  }
  addComment() {
    this.isSubmitting = true;
    this.commentFormErrors = {};
    // create file on server
    this.imageContainer.forEach((file) => {
      this.fileService.upload(file.filename, file.filecontent);
    //   this.http.put(`${environment.api_url}` + '/upload/files', {name: file.filename, content: file.filecontent})
    //   .subscribe(res => {
    //     console.log(res);
    //   }, error => {
    //     console.log(error)
    // });
    });
    const commentBody = this.commentControl.value;
    this.commentsService
      .add(this.article.slug, commentBody, this.fileList)
      .subscribe(
        comment => {
          this.comments.unshift(comment);
          this.commentControl.reset('');
          this.formGroup.get('file').reset('');
          this.isSubmitting = false;
        },
        errors => {
          this.isSubmitting = false;
          this.commentFormErrors = errors;
        }
      );
  }
  onDeleteComment(comment) {
    this.commentsService.destroy(comment.id, this.article.slug)
      .subscribe(
        success => {
          this.comments = this.comments.filter((item) => item !== comment);
        }
      );
  }

}
