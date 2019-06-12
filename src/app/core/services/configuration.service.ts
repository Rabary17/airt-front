import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Profile } from '../models';
import { Configuration } from '../models';
import { map } from 'rxjs/operators';

@Injectable()
export class ConfigurationService {
  constructor (
    private apiService: ApiService
  ) {}

  get(): Observable<Configuration> {
    return this.apiService.get('/configuration/')
      .pipe(map((data: {configuration: Configuration}) => data.configuration));
  }

  save(configuration: Configuration): Observable<Configuration> {
    return this.apiService.post('/configuration/add', {configuration});
  }

  update(configuration: Configuration): Observable<Configuration> {
    return this.apiService.put('/configuration/update');
  }

}
