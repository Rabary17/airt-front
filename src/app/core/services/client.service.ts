import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,  BehaviorSubject ,  ReplaySubject } from 'rxjs';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../models';
import { map ,  distinctUntilChanged } from 'rxjs/operators';


@Injectable()
export class ClientService {

constructor (
  private apiService: ApiService,
  private http: HttpClient,
  private jwtService: JwtService
) {}

getAllClient () {
    return this.apiService.get('/client')
    .pipe(map(
    data => {
      return data;
    }
  ));
}
}
