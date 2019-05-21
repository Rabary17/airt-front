import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';;
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FormBuilder, Validators } from '@angular/forms';
import { QuillInitializeService } from '../core/services/quillInitialize.service';
import { MailerService } from '../core/services/mailer.service';
import { Mail } from '../core/models/mail.model';
import 'quill-mention';
import 'quill-emoji';

import {
  Ticket,
  TicketsService,
  Comment,
  CommentsService,
  User,
  UserService,
  FileService
} from '../core';
import { asTextData } from '@angular/core/src/view';


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
    private fb: FormBuilder,
    private quillInitializeService: QuillInitializeService,
    private mailerService: MailerService
  ) { }

  
  private fileList: Array<string> = [];
  // private fileList: string[] = new Array<string>();
  private fileList$: Subject<string[]> = new Subject<string[]>();
  
  article: Ticket;
  currentUser: User;
  avatar: String;
  canModify: boolean;
  comments: Array<Comment> = [];
  commentControl = new FormControl(0, Validators.min(20));
  commentFormErrors = {};
  isSubmitting = false;
  isDeleting = false;
  imageContainer = [];
  email: Mail;
  private fileName;
  

    
  public formGroup = this.fb.group({
    file: [null, Validators.required],
  });

  htmlText ="<p>Testing</p>"
  hasFocus = false;

  atValues = [
    { id: 1, value: 'Fredrik Sundqvist', link: 'https://google.com' },
    { id: 2, value: 'Patrik Sjölin' }
  ];
  hashValues = [
    { id: 3, value: 'Fredrik Sundqvist 2' },
    { id: 4, value: 'Patrik Sjölin 2' }
  ]

  
  
  quillConfig={
    toolbar: {
      container: [
        ['bold', 'italic', 'underline'],        // toggled buttons
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        // [{ 'direction': 'rtl' }],                         // text direction

       // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        // [{ 'font': [] }],
        // [{ 'align': [] }],

        // ['clean'],                                         // remove formatting button

        ['link'],

      ],
      handlers: {'emoji': function() {}}
    },
    autoLink: true,

    mention: {
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ["@", "#"],
      source: (searchTerm, renderList, mentionChar) => {
        let values;

        if (mentionChar === "@") {
          values = this.atValues;
        } else {
          values = this.hashValues;
        }
        
        if (searchTerm.length === 0) {
          renderList(values, searchTerm);
        } else {
          const matches = [];
          for (var i = 0; i < values.length; i++)
            if (~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())) matches.push(values[i]);
          renderList(matches, searchTerm);
        }
      },
    },
    "emoji-toolbar": true,
    "emoji-textarea": true,
    "emoji-shortname": true,
    keyboard: {
      bindings: {
        // shiftEnter: {
        //   key: 13,
        //   shiftKey: true,
        //   handler: (range, context) => {
        //     // Handle shift+enter
        //     console.log("shift+enter")
        //   }
        // },
        enter:{
          key:13,
          handler: (range, context)=>{
            console.log("enter");
            return true;
          }
        }
      }
    }
  }

  ngOnInit() {
    // Retreive the prefetched article
    this.route.data.subscribe(
      (data: { article: Ticket }) => {
        this.article = data.article;
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
      .subscribe((comments) => {
        const promises = comments.map((com) => {
          const profile = com.file.map((file) => {
            return 'http://localhost:3000/api/public/uploads/' + file;
          });
          
          Promise.all(profile).then((res) =>
          {
            com.file = res;
            this.comments.push(com);
          }
          )
        })
        })
      };

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
    });
    const commentBody = this.commentControl.value;
    this.commentsService
      .add(this.article.slug, commentBody, this.fileList)
      .subscribe(
        comment => {
          let com = comment.file.map((res) => {
            return 'http://localhost:3000/api/public/uploads/' + res;
          })
          Promise.all(com).then((file) => {
            comment.file = file;
            this.comments.unshift(comment);
            let mail = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
                          <html lang="en">
                            <head>
                              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                              <meta name="viewport" content="width=device-width, initial-scale=1">
                              <meta http-equiv="X-UA-Compatible" content="IE=edge">
                              <title>AfroEgypt</title>  
                            </head>
                            <body style="margin:0; padding:0;">
                              <center>
                                <table width="50%" border="0" cellpadding="0" cellspacing="0" bgcolor="#F2F2F2">
                                    <th height="50px" bgcolor="#0c8b42" style="font-size:20px;color: #fbbb0d">
                                    AFROEGYPT
                                        <td align="center" valign="top">
                                          
                                        </td>
                                    </th>
                                    <tr style="padding: 20px 0;">
                                        <td align="center" valign="top">
                                        <h2>Cher client,</h2>
                                        <p>Ce mail est envoyé pour vous tenir au courant de l'avancement<br>des travaux que vous nous avez confié.</p>

                                        <p>Vous pouvez suivre le lien ci-dessous pour voir son avancement</p>
                                        <br>
                                        <a href="#" style="font-size:15px;color:#0c8b42;background-color: #ffffff; text-decoration:underline;padding:10px;" target="_blank">Ticket N° Ref-5879865</a>
                                        <br>
                                        <p style="padding-top: 10px;font-size: 8px;">Ce lien sera expiré dans 30mn.</p>
                                        <p>Nous vous remerçions pour votre confiance.</p>
                                        </td>
                                    </tr>
                                </table>
                                <table border="0" cellpadding="0" cellspacing="0" width="50%" id="emailFooter" bgcolor="#eee" style="padding: 10px 0;">
                                  <tr>
                                      <td style="font-size:8px; margin-top:5px;" align="center" valign="center" cellpadding="0" class="footerContent" style="padding-bottom:15px;">
                                          &copy; 8 Abubakr St, fayrouz District
                                          <br />
                                          Behind Mall of Arabia 6 th octobar , GizaEGYPT
                                      </td>
                                  </tr>
                                  <tr>
                                      <td align="center" valign="top">
                                          <table border="0" cellpadding="5" cellspacing="0" id="utilityLink">
                                              <tr>
                                                  <td valign="top" class="utilityLinkContent">
                                                      <a href="..." target="_blank"  style="font-size:8px;">Unsubscribe</a>
                                                  </td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                              </table>
                              </center>
                            </body>
                          </html>`
            this.email = {
              'contactEmail' : 'rabary@passion4humanity.com',
              'contactMessage' : mail,
              'refTicket' : this.article.slug,
              'contactName': 'Technician'
            };
            this.mailerService.send(this.email).subscribe((res) => {
              console.log('EMAIL ENVOYE', res);
            })
          }).then((comm) => {
            
          })
          
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

  
  test=(event)=>{
    console.log(event.keyCode);
  }

  onSelectionChanged = (event) =>{
    if(event.oldRange == null){
      this.onFocus();
    }
    if(event.range == null){
      this.onBlur();
    }
  }

  onContentChanged = (event) =>{
    //console.log(event.html);
  }

  onFocus = () =>{
    console.log("On Focus");
  }
  onBlur = () =>{
    console.log("Blurred");
  }
  

}
