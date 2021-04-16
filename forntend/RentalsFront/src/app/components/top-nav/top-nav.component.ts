import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RouterOutletParams } from 'src/app/Utils/RouterOutletParams';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {
  userRole: string; 

  routerOutlerParamsArr: RouterOutletParams[];

  constructor(private authService:AuthenticationService) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(
      userRes => {
        if (userRes) {
          this.configureRoleNavigation(userRes.role);
        }
      }
    )
  }

  private configureRoleNavigation(userRole: string) {
    this.routerOutlerParamsArr = [];
    switch (userRole) {
      case 'User':
        this.routerOutlerParamsArr.push(new RouterOutletParams('rentHistory', 'Rent History'));
        break;
      case 'Employee':
        this.routerOutlerParamsArr.push(new RouterOutletParams('returnCars', 'Return Cars'));
        break;
      case 'Manager':
        this.routerOutlerParamsArr.push(new RouterOutletParams('allRents', 'View All Rent History'));
        this.routerOutlerParamsArr.push(new RouterOutletParams('manageCars', 'Manage Cars'));
        this.routerOutlerParamsArr.push(new RouterOutletParams('manageUsers', 'Manage Users'));
        break;
    }
    
  }

}
