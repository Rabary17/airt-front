import { Component, Input } from '@angular/core';

import { Ticket } from '../../core';

@Component({
  selector: 'app-article-meta',
  styleUrls: ['article-meta.component.css'],
  templateUrl: './article-meta.component.html'
})
export class ArticleMetaComponent {
  @Input() article: Ticket;
}
