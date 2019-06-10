import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';
import { FormBuilder, FormGroup, FormControl, Validators  } from '@angular/forms';
import { ImportService } from '../../../core/services/import.service';
import { FileService } from '../../../core/services/file.service';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-import-user',
  templateUrl: './import-user.component.html',
  styleUrls: ['./import-user.component.css']
})
export class ImportUserComponent implements OnInit {

  importUserForm: FormGroup;
  isSubmitting = false;
  private fileName;
  private base64file;
  file;

  constructor(
    private fb: FormBuilder,
    private importService: ImportService,
    private fileService: FileService,
    private modalService: NgxSmartModalService,
    private userService: UserService
  ) {
    this.importUserForm = this.fb.group({
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
    this.importService.importUserCsvFile(body).subscribe(res => {
      this.modalService.close('importUserModal');
      this.userService.userListChanged.next(res)
    })
  }
}
