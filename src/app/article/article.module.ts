import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ArticleComponent } from './article.component';
import { ArticleCommentComponent } from './article-comment.component';
import { ArticleResolver } from './article-resolver.service';
import { MarkdownPipe } from './markdown.pipe';
import { SharedModule } from '../shared';
import { ArticleRoutingModule } from './article-routing.module';
import { FileuploadComponent } from '../fileupload/fileupload.component';
import { FileListComponent } from '../fileupload/file-list.component';
import { HttpClientModule} from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  imports: [
    SharedModule,
    ArticleRoutingModule,
    AngularEditorModule,
    HttpClientModule
  ],
  declarations: [
    ArticleComponent,
    ArticleCommentComponent,
    FileuploadComponent,
    FileListComponent,
    MarkdownPipe
  ],

  providers: [
    ArticleResolver
  ]
})
export class ArticleModule {}
