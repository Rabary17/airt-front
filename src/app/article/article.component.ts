import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';

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

  article: Ticket;
  currentUser: User;
  avatar: String;
  canModify: boolean;
  comments: Comment[];
  commentControl = new FormControl();
  commentFormErrors = {};
  isSubmitting = false;
  isDeleting = false;
  file: Array<any> ;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '5rem',
    minHeight: '5rem',
    placeholder: 'Ecrivez votre commentaire',
    translate: 'no',
    uploadUrl: 'v1/images', // if needed
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

  constructor(
    private route: ActivatedRoute,
    private articlesService: TicketsService,
    private commentsService: CommentsService,
    private router: Router,
    private userService: UserService,
    private fileService: FileService
  ) { }

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

  addComment() {
    this.isSubmitting = true;
    this.commentFormErrors = {};
    this.fileService.list().subscribe(res => 
      {
        this.file = res;
      }
    );

    const commentBody = this.commentControl.value;
    this.commentsService
      .add(this.article.slug, commentBody)
      .subscribe(
        comment => {
          this.comments.unshift(comment);
          this.commentControl.reset('');
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
