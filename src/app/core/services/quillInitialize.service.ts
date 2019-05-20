import { Injectable } from '@angular/core';
import Quill from 'quill';
import QuillAutoLink from '../quill/quill-autolink';




@Injectable()
export class QuillInitializeService {

  constructor() { 
    var Link = Quill.import('formats/link');
    Link.sanitize = (url) => {
      if(url.indexOf("http") <= -1){
        url = "https://" + url;
      }
      return url;
    }
    Quill.register('modules/autoLink', QuillAutoLink);
  }

}