import { Component } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sub-nav-bar',
  templateUrl: './sub-nav-bar.component.html',
  styleUrls: ['./sub-nav-bar.component.css']
})
export class SubNavBarComponent {

  channels : any;

  constructor(
    private dashboardService: DashboardService,
    private sharedService: SharedService,
    private userService: UserService,
  ) { }
  
  isSubMenuOpen1 = false;
  isSubMenuOpen2 = false;
  isSubMenuOpen3 = false;
  isSubMenuOpen4 = false;

  subMenuStates: { [key: string]: boolean } = {}; // Store the open/close state for each submenu

  toggleSubMenu(channelId: any) {
    this.subMenuStates[channelId] = !this.subMenuStates[channelId];
  }

  selectChannel(channelId: any) {
    this.userService.setChannelNames(channelId);
  }



  async getChannels() {
    try {
      this.channels = await this.dashboardService.getChannels().toPromise();
      console.log("🚀 ~ file: sub-nav-bar.component.ts:57 ~ SubNavBarComponent ~ getChannels ~ this.channels:", this.channels)


    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }

  ngOnInit(){
    this.getChannels()
    this.userService.channelNames$.subscribe((userTeamsTree) => {
    console.log("🚀 ~ file: sub-nav-bar.component.ts:54 ~ SubNavBarComponent ~ this.userService.channelNames$.subscribe ~ userTeamsTree:", userTeamsTree)
    });
  }
  

}
