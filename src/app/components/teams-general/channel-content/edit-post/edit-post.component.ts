import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as moment from 'moment';
import { DashboardService } from 'src/app/services/dashboard.service';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent {
  displayEditBox: boolean = false;
  @Output() dataEvent = new EventEmitter<string>();
  @Output() postMessage = new EventEmitter<any>();
  @Output() closeEdit = new EventEmitter<any>();
  @Input() editInput: boolean | undefined;
  @Input() message: any;
  channel: any ;

  constructor(
    private dashboardService: DashboardService,
    private sharedService: SharedService,
    private userService: UserService,
  ) { }


  closeTextBox() {
    this.editInput = false;
    this.closeEdit.emit(this.editInput);

  }

  postData() {
    this.userService.channelNames$.subscribe((channelSelected) => {
      this.channel = channelSelected;
    });
    if (this.message.hasOwnProperty('title')) {
      var subject = (<HTMLInputElement>document.getElementById("subject")).value;
      var message = (<HTMLInputElement>document.getElementById("message")).value;
      var date = moment().format();
      var formData = {
        id: this.message.id,
        Title: subject,
        Channel:this.channel,
        MessageBody: message,
        Date: this.message.date,
        Sender: this.message.sender,
        LinkedMessages: this.message.linkedMessage,
        isDeleted:false

      }
      this.dashboardService.updateMesages(formData)
        .subscribe(response => {
          this.getMessages();
        }, error => {
          console.error('Error sending data', error);
        });
    }else{
      var message = (<HTMLInputElement>document.getElementById("message")).value;
      var date = moment().format();
      var formDatas = {
        id: this.message.id,
        MessageBody: message,
        Date: this.message.date,
        Sender: this.message.sender,
        LinkedMessage: this.message.linkedMessage,
        isDeleted:false

      }
      this.dashboardService.updateReplies(formDatas)
        .subscribe(response => {
          this.getMessages();
        }, error => {
          console.error('Error sending data', error);
        });
    }



    this.closeTextBox();
  }

  getMessages() {

    this.dataEvent.emit();
  }


}
