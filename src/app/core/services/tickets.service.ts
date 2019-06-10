import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable ,  BehaviorSubject ,  ReplaySubject } from 'rxjs';
import { ApiService } from './api.service';
import { Ticket, ArticleListConfig } from '../models';
import { map } from 'rxjs/operators';
import { Client } from '../../core'

@Injectable()
export class TicketsService {

  public ticketListChanged = new BehaviorSubject<Ticket>({} as Ticket);

  constructor (
    private apiService: ApiService
  ) {}

  query(config: ArticleListConfig): Observable<{articles: Ticket[], articlesCount: number}> {
    // Convert any filters over to Angular's URLSearchParams
    const params = {};

    Object.keys(config.filters)
    .forEach((key) => {
      params[key] = config.filters[key];
    });

    return this.apiService
    .get(
      '/tickets' + ((config.type === 'feed') ? '/feed' : ''),
      new HttpParams({ fromObject: params })
    );
  }

  get(slug): Observable<Ticket> {
    return this.apiService.get('/tickets/' + slug)
      .pipe(map(data => data.article));
  }
// return one ticket
  getTicket(id): Observable<Ticket> {
    return this.apiService.get('/tickets/' + id)
      .pipe(map(data => data.article));
  }

  getAll(): Observable<any> {
    return this.apiService.get('/tickets/all')
    .pipe(map(data => data.articles));
  }


  destroy(slug) {
    return this.apiService.delete('/tickets/' + slug);
  }

  save(article): Observable<Ticket> {
    // If we're updating an existing article
    if (article.slug) {
      return this.apiService.put('/tickets/' + article.slug, {article: article})
        .pipe(map(data => data.article));

    // Otherwise, create a new article
    } else {
      return this.apiService.post('/tickets/', {article: article})
        .pipe(map(data => data.article));
    }
  }

  favorite(slug): Observable<Ticket> {
    return this.apiService.post('/tickets/' + slug + '/favorite');
  }

  unfavorite(slug): Observable<Ticket> {
    return this.apiService.delete('/tickets/' + slug + '/favorite');
  }


}
