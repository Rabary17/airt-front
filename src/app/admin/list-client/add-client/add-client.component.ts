import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../core/models/user.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ArticleListConfig, ClientService } from '../../../core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { UserService, FileService } from '../../../core/services';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})

export class AddClientComponent implements OnInit {
  config: ArticleListConfig;
  tickets: [];
  addClientForm: FormGroup;
  private fileName;
  private file;

  constructor(
    private clientService: ClientService,
    private modalService: NgxSmartModalService,
    private fb: FormBuilder,
    private userService: UserService,
    private fileService: FileService
  ) {
            // use FormBuilder to create a form group
            this.addClientForm = this.fb.group({
              'email': ['', Validators.required],
              'name': '',
              'image': '',
            });
  }

  ngOnInit() {

  }

  submitForm(){
    this.addClientForm.value.file = `${environment.api_url}`+ '/public/uploads/' + this.fileName;
    this.clientService.addNewClient(this.addClientForm.value).subscribe(res => {
      this.fileService.upload(this.fileName, this.file);
      this.modalService.close('addClientModal');
      this.modalService.resetModalData('addClientModal');
      this.clientService.clientListChanged.next(res);

    })
  }

  public onFileChange(event) {
    const reader = new FileReader();
 
    if (event.target.files && event.target.files.length) {
      this.fileName = event.target.files[0].name;
      const [file] = event.target.files;
      reader.readAsDataURL(file);
     
      reader.onload = () => {
        this.file = reader.result
      };
      
    }
  }
}
