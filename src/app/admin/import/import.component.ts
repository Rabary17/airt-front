import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.model';
import { FormBuilder, FormGroup, FormControl, Validators  } from '@angular/forms';
import { ImportService } from '../../core/services/import.service'
import { FileService } from '../../core/services/file.service'

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {

  importForm: FormGroup;
  isSubmitting = false;
  private fileName;
  private base64file;
  file;

  constructor(
    private fb: FormBuilder,
    private importService: ImportService,
    private fileService: FileService
  ) {
    this.importForm = this.fb.group({
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
        console.log(reader.result)
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
    console.log('this.importForm.value', this.importForm.value);
    // this.fileService.upload(this.fileName, this.base64file)
    this.importService.importCsvFile(body).subscribe(res => {
      console.log(res)
    })
  }
}
