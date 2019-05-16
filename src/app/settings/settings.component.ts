import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User, UserService } from '../core';
import { FileuploadComponent } from '../fileupload/fileupload.component';
import { FileListComponent } from '../fileupload/file-list.component';
import { FileService } from '../core/services/file.service';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-settings-page',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {

  
  public formGroup = this.fb.group({
    file: [null, Validators.required],
  });
 
  user: User = {} as User;
  settingsForm: FormGroup;
  errors: Object = {};
  isSubmitting = false;
  private fileNamePdp: string;
  private fileContentPdp: string;
  private fileNameCover: string;
  private fileContentCover: string; 

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private fileService: FileService
  ) {
    // create form group using the form builder
    this.settingsForm = this.fb.group({
      image: '',
      cover: '',
      username: '',
      bio: '',
      email: '',
      password: ''
    });
    // Optional: subscribe to changes on the form
    // this.settingsForm.valueChanges.subscribe(values => this.updateUser(values));
  }

  ngOnInit() {
    // Make a fresh copy of the current user's object to place in editable form fields
    Object.assign(this.user, this.userService.getCurrentUser());
    // Fill the form
    this.settingsForm.patchValue(this.user);
  }

  logout() {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }

  submitForm() {
    this.isSubmitting = true;
    // update the model
    this.settingsForm.value.image = `${environment.api_url}`+ '/public/uploads/' + this.fileNamePdp;
    this.settingsForm.value.cover = `${environment.api_url}`+ '/public/uploads/' + this.fileNameCover;
    // check file
    this.updateUser(this.settingsForm.value);
    // console.log("this.settingsForm.value.image", this.settingsForm.value);
    this.fileService.upload(this.fileNamePdp, this.fileContentPdp);
    this.fileService.upload(this.fileNameCover, this.fileContentCover);

    this.userService
    .update(this.user) 
    .subscribe(
      updatedUser => this.router.navigateByUrl('/profile/' + updatedUser.username),
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }

  onFileChange1(event) {
    const reader = new FileReader();
 
    if (event.target.files && event.target.files.length) {
      this.fileNamePdp = event.target.files[0].name;
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      
     
      reader.onload = () => {
        this.formGroup.patchValue({
          file: reader.result
        });
        this.fileContentPdp = reader.result as string;
      };
      
    }
  }

  getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.formGroup.patchValue({
        file: reader.result
      });
      return reader.result;
    };
  }
  onFileChange2(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      this.fileNameCover = event.target.files[0].name;
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.formGroup.patchValue({
          file: reader.result
        });
        this.fileContentCover = reader.result as string;
      };
      
    }
  }
  updateUser(values: Object) {
    Object.assign(this.user, values);
  }

}
