import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUserLoginData } from 'src/app/models/User-Models/userLoginData';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginData: IUserLoginData = { userName: null, password: null };

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService:AuthenticationService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: [this.loginData.userName, Validators.required],
      password: [this.loginData.password, Validators.required]
    })
  };

  login() {
    this.loginData = this.loginForm.value;
    this.authenticationService.login(this.loginData);
  }
}
