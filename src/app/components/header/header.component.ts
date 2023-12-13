import { Component } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    private dashboardService: DashboardService,
    private sharedService: SharedService,
    private userService: UserService,
  ) { }

  dropdownOpen: boolean = false;
  users: any;
  userSelected: any;
  username: any;
  userData: any;



  openDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  async selectUser(id: any) {
    this.dashboardService.getUserByID(id).subscribe((res) => {
      this.userService.setUserTeamsTree(res);

    });

    this.userService.userTeamsTree$.subscribe((userValue) => {
      this.userData = userValue;
    });
    this.dropdownOpen = !this.dropdownOpen;
  }

  ngOnInit() {
    this.getUsers();
    this.username = localStorage.getItem('username')
  }

  async getUsers() {
    try {
      this.users = await this.dashboardService.getUsers().toPromise();

    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }

}
