import { Component, OnInit } from '@angular/core';
import { FileService } from '../core/services/file.service';
import { Observable } from 'rxjs';

@Component({
 selector: 'app-filelist',
 templateUrl: './file-list.component.html',
 styleUrls: ['./file-list.component.css']
})
export class FileListComponent {

 public fileList$: Observable<string[]> = this.fileService.list();

 constructor(private fileService: FileService) { }

 public download(fileName: string):  void {
   this.fileService.download(fileName);
 }

 public remove(fileName: string):  void {
   this.fileService.remove(fileName);
 }
 
}