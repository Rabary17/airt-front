import { Component, Input } from '@angular/core';

import { Ticket } from '../../core';

@Component({
  selector: 'app-article-preview',
  styleUrls: ['article-preview.component.css'],
  templateUrl: './article-preview.component.html'
})
export class ArticlePreviewComponent {
  @Input() article: Ticket;

  onToggleFavorite(favorited: boolean) {
    this.article['favorited'] = favorited;

    if (favorited) {
      this.article['favoritesCount']++;
    } else {
      this.article['favoritesCount']--;
    }
  }
}
