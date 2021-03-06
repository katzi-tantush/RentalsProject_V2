import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/models/User-Models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit {
  users$: Observable<IUser>;
  userFormVisible: boolean = false;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.users$ = this.userService.getUsersObs();
  }

  showUserForm() {
    this.userFormVisible = !this.userFormVisible;
  }

  deleteUser(user: IUser) {
    this.userService.deleteUser(user);
  }
}
