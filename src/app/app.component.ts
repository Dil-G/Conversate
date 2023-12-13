import { Component } from '@angular/core';
import { TeamsMessage } from './models/dashboard';
import { DashboardService } from './services/dashboard.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'conversate-app';
  messages : TeamsMessage [] = [];

  constructor(private teamMessageService : DashboardService,
    private userService: UserService,){}

  ngOnInit() : void{
    this.teamMessageService.getMessages().subscribe((result : TeamsMessage[])=> (this.messages = result));


      this.userService.setChannelNames(1);

  }



}
