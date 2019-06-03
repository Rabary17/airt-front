import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,  BehaviorSubject ,  ReplaySubject } from 'rxjs';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../models';
import { map ,  distinctUntilChanged } from 'rxjs/operators';


@Injectable()
export class ImportService {

constructor (
  private apiService: ApiService,
  private http: HttpClient,
  private jwtService: JwtService
) {}

importUserCsvFile (file) {
  return this.apiService.post('/import', {body: file})
    .pipe(map(
      data => {
        return data;
      }
    ));
  }

importClientCsvFile (file) {
return this.apiService.post('/import/client', {body: file})
  .pipe(map(
    data => {
      return data;
    }
  ));
}

importTicketCsvFile (file) {
  return this.apiService.post('/import/ticket', {body: file})
    .pipe(map(
      data => {
        return data;
      }
    ));
  }

exportToCsvFile () {
    return this.apiService.get('/client')
    .pipe(map(
    data => {
      return data;
    }
  ));
}

}
