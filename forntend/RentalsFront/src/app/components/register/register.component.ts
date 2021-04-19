import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/models/User-Models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Parser } from 'src/app/Utils/Parser';
import { charCountValidator } from 'src/app/validators/charCountValidator';
import { dateValidator } from 'src/app/validators/dateValidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  newUser: IUser = {
    id: null,
    fName: null,
    lName: null,
    role: null,
    birthDate: null,
    userName: null,
    password: null,
    imageId: null
  };

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService:AuthenticationService) { }

  // TODO: add appropriate validators : string only, numbers only
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      id: [this.newUser.id, [Validators.required, charCountValidator(9)]],
      fName: [this.newUser.fName, [Validators.required]],
      lName: [this.newUser.lName, Validators.required],
      birthDate: [this.newUser.birthDate, [Validators.required, dateValidator()]],
      userName: [this.newUser.userName, Validators.required],
      password: [this.newUser.password, Validators.required],
      imageId: [this.newUser.imageId],
      role: [this.newUser.role]
      // TODO: add user image field
    });
  }

  register() {
    this.newUser = this.registerForm.value;
    this.newUser.imageId = null;
    this.newUser.role = 'User';
    
    this.authenticationService.register(this.newUser);
  }

}

