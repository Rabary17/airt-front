import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,  BehaviorSubject ,  ReplaySubject } from 'rxjs';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User, Client } from '../models';
import { map ,  distinctUntilChanged } from 'rxjs/operators';


@Injectable()
export class ClientService {

  public clientListChanged = new BehaviorSubject<Client>({} as Client);

constructor (
  private apiService: ApiService,
  private http: HttpClient,
  private jwtService: JwtService,
) {}

addNewClient (client) {
return this.apiService.post('/client/add', client)
  .pipe(map(
    data => {
      return data;
    }
  ));
}

getClient (id) {
  return this.apiService.get('/client/' + id)
    .pipe(map(
      data => {
        return data;
      }
    ));
  }

  updateClient (id, body) {
    return this.apiService.put('/client/' + id, body)
      .pipe(map(
        data => {
          return data;
        }
      ));
    }

deleteClient (id) {
  return this.apiService.delete('/client/' + id)
    .pipe(map(
      data => {
        return data;
      }
    ));
  }

getAllClient () {
    return this.apiService.get('/client')
    .pipe(map(
    data => {
      return data;
    }
  ));
}

}
