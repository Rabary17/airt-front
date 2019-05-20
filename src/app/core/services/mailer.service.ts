import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Profile } from '../models';
import { map } from 'rxjs/operators';
import { Mail } from '../../core/models/mail.model'

@Injectable()
export class MailerService {
  constructor (
    private apiService: ApiService
  ) {}

  send(mail: Mail) {
    return this.apiService
    .post(
      '/client/sendMail',
      { body: mail }
    ).pipe(map(data => data.response));
  }

}
