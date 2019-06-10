import { Component, OnInit, Input } from '@angular/core';
import { TicketsService } from '../../../core/services/tickets.service';
import { Ticket } from '../../../core/models/ticket.model';
import { FormBuilder, FormGroup, FormControl, Validators  } from '@angular/forms';
import { ArticleListConfig } from '../../../core';
import { ImportService } from '../../../core/services/import.service';
import { FileService } from '../../../core/services/file.service';
import { ClientService } from '../../../core'
import { NgxSmartModalService } from 'ngx-smart-modal';
@Component({
  selector: 'app-import-client',
  templateUrl: './import-client.component.html',
  styleUrls: ['./import-client.component.css']
})

export class ImportClientComponent implements OnInit {
  importClientForm: FormGroup;
  isSubmitting = false;
  private fileName;
  private base64file;
  file;
  constructor(
    private ticketService: TicketsService,
    private importService: ImportService,
    private fileService: FileService,
    private fb: FormBuilder,
    private modalService: NgxSmartModalService,
    private clientService: ClientService
  ) {
    this.importClientForm = this.fb.group({
      data: ['', [Validators.required, Validators.minLength(2)]],  
    });
}

ngOnInit() {

}
public onFileChange(event) {
  const reader = new FileReader();

  if (event.target.files && event.target.files.length) {
    this.fileName = event.target.files[0].name;
    const [file] = event.target.files;
    reader.readAsDataURL(file);

    reader.onload = () => {
      this.base64file = reader.result;
      // this.importForm.patchValue({
      //   data: reader.result
      // });
    };

  }
}

submitForm(){
  const base64data = this.base64file.replace(/^data:.*,/, '');
  const body = {
    file: base64data,
    filename: this.fileName
  }
  // this.fileService.upload(this.fileName, this.base64file)
  this.importService.importClientCsvFile(body).subscribe(res => {
    this.modalService.close('importClientModal');
    this.clientService.clientListChanged.next(res)
  })
}
}
