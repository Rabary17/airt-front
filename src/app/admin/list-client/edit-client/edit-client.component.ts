import { Component, OnInit, Input } from '@angular/core';
import { User, Client } from '../../../core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ArticleListConfig, ClientService } from '../../../core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { UserService, FileService } from '../../../core/services';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})

export class EditClientComponent implements OnInit {
  @Input() client;
  config: ArticleListConfig;
  tickets: [];
  editClientForm: FormGroup;
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
            this.editClientForm = this.fb.group({
              'email': ['', Validators.required],
              'name': ['', Validators.required],
              'image': '',
            });
  }

  ngOnInit() {
    this.editClientForm.patchValue(this.client.client);
    this.editClientForm.controls['image'].setValue('');
  }

  submitForm(){

        this.editClientForm.value.image = `${environment.api_url}`+ '/public/uploads/' + this.fileName;
        this.clientService.updateClient(this.client.client.id, this.editClientForm.value).subscribe(res => {
            if(typeof this.fileName !== 'undefined'){
                this.fileService.upload(this.fileName, this.file);
            }
            this.modalService.close('editClientModal');
            this.modalService.resetModalData('editClientModal');
            this.clientService.clientListChanged.next(res);
        })

  }

  public onFileChange(event) {
    const reader = new FileReader();
 
    if (event.target.files && event.target.files.length) {
        console.log(event.target.files[0].name)
      this.fileName = event.target.files[0].name;
      const [file] = event.target.files;
      reader.readAsDataURL(file);
     
      reader.onload = () => {
        this.file = reader.result
      };
    }
  }
}
