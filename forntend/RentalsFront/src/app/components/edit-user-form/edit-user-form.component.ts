import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IUser } from 'src/app/models/User-Models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user-form',
  templateUrl: './edit-user-form.component.html',
  styleUrls: ['./edit-user-form.component.css']
})
export class EditUserFormComponent implements OnInit {
  @Input() user: IUser;
  roles: string[];
  userForm: FormGroup;

  constructor(
    private fromBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.roles = this.userService.userRoles;

    this.userForm = this.fromBuilder.group({
      fName: [this.user.fName],
      lName: [this.user.lName],
      userName: [this.user.userName],
      id: [this.user.id],
      birthDate: [formatDate(this.user.birthDate, 'yyyy-MM-dd', 'en')],
      role: [this.user.role],
      imageId: [this.user.imageId],
      password: [this.user.password]
    });
  }

  submitFrom() {
    let modifiedUser: IUser = this.userForm.value;
    modifiedUser.imageId = 0;
    this.userService.putUser(modifiedUser);
  }
}
