import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.model';
import { FormBuilder, FormGroup, FormControl, Validators  } from '@angular/forms';
import { ImportService } from '../../core/services/import.service';
import { FileService } from '../../core/services/file.service';
import { environment } from '../../../environments/environment';
import { ConfigurationService } from '../../core'

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  configurationForm: FormGroup;
  isSubmitting = false;
  private fileName;
  private base64file;

  constructor(
    private fb: FormBuilder,
    private importService: ImportService,
    private fileService: FileService,
    private configurationService: ConfigurationService
  ) {
    this.configurationForm = this.fb.group({
      logo: '',
      email: '',
      couleur1: '',
      couleur2: '',
    });
   }

  ngOnInit() {
  }

  showCouleur(event){
    console.log(event.target.value)
  }
  public onFileChange(event) {
    const reader = new FileReader();
 
    if (event.target.files && event.target.files.length) {
      this.fileName = event.target.files[0].name;
      console.log( this.fileName)
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
    if(this.fileName){
      this.configurationForm.value.logo = `${environment.api_url}`+ '/public/uploads/' + this.fileName;
    }
    // this.fileService.upload(this.fileName, this.base64file)
    this.configurationService.save(this.configurationForm.value).subscribe(res => {
      this.configurationForm.reset('');
    })
  }
}
