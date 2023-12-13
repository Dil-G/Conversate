import { Component, EventEmitter, Output } from '@angular/core';
import { DashboardService } from '../../../../services/dashboard.service';
import { lastValueFrom } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { TeamsMessage } from 'src/app/models/dashboard';
import * as moment from 'moment';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {

  @Output() teamsMessages = new EventEmitter<TeamsMessage[]>();
  @Output() dataEvent = new EventEmitter<string>();
  displayTextBox: boolean = false;
  messageSent?: DashboardService;
  messages: any = [];
  channel: any ;
  user: any ;
  @Output() postMessage = new EventEmitter<any>();


  constructor(
    private dashboardService: DashboardService,
    private sharedService: SharedService,
    private userService: UserService,
  ) { }

  openTextBox() {
    this.displayTextBox = true;
  }
  closeTextBox() {
    this.displayTextBox = false;
  }

  getMessages() {
    this.dataEvent.emit();
  }

  postData() {
    var subject = (<HTMLInputElement>document.getElementById("subject")).value;
    var message = (<HTMLInputElement>document.getElementById("message")).value;
    var date = moment().format();
    var formData = {
      Title: subject,
      Channel:this.channel,
      MessageBody: message,
      Date: date,
      Sender:this.user,
      isDeleted:false

    }
    this.displayTextBox = false;
    this.postMessage.emit(formData)
    this.displayTextBox = false;
  }

  ngOnInit() {
    this.userService.channelNames$.subscribe((channelSelected) => {
      this.channel = channelSelected;
    });
    
    this.userService.userTeamsTree$.subscribe((userValue) => {
      const userId: any = userValue;
      this.user = userId.id;

    });
    this.getMessages();
  }

}
