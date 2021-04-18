import { Component, OnInit } from '@angular/core';
import { ILoggedInUser } from 'src/app/models/User-Models/ILoggefInUser';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-welcome-user',
  templateUrl: './welcome-user.component.html',
  styleUrls: ['./welcome-user.component.css']
})
export class WelcomeUserComponent implements OnInit {
  user: ILoggedInUser;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.authService.getLoggedInUserObs().subscribe(
      userRes => this.user = userRes
    );
  }
}
