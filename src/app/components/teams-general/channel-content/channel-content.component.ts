import { Component } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import * as moment from 'moment';
import { SharedService } from 'src/app/services/shared.service';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-channel-content',
  templateUrl: './channel-content.component.html',
  styleUrls: ['./channel-content.component.css']
})
export class ChannelContentComponent {
  editInput: boolean = false;
  passedID: any;
  editID: any;
  editReplyID: any;
  user: any;
  userData: any;
  channelSelect: any;

  private userTeamsTreeSubscription: Subscription;
  private channelSet: Subscription;
  private lastUserTeamsTree: any[] = [];
  private lastchannelName: any;

  constructor(
    private dashboardService: DashboardService,
    private sharedService: SharedService,
    private userService: UserService,
  ) {
    this.userTeamsTreeSubscription = this.userService.userTeamsTree$.subscribe((userTeamsTree) => {
      if (!_.isEqual(userTeamsTree, this.lastUserTeamsTree)) {
        this.lastUserTeamsTree = userTeamsTree;
        this.refreshComponent();
      }


    });
    this.channelSet = this.userService.channelNames$.subscribe((channelSelected) => {
      console.log("Channel selected:", channelSelected);
      this.channelSelect = channelSelected;
      this.getMessages(this.channelSelect); // Refresh messages when the channel changes
    });
  }
  messages: any = [];
  message: any;
  editmessage: any;

  private refreshComponent() {
    // Implement your logic to refresh the component
    this.user = localStorage.getItem("userID");


    this.userService.userTeamsTree$.subscribe((userValue) => {
      const userId: any = userValue;
      this.user = userId.id;

    });
  }



  openReply(id: any) {
    this.passedID = id;
  }
  openEdit(id: any) {
    this.editID = id;
    this.editInput = true;
    this.getMessageByID(id);
  }
  openEditReply(id: any) {
    this.editReplyID = id;
    this.getReplyID(id);
  }

  closeEdit() {
    this.editReplyID = null;
    this.editID = null;
  }


  postReplies(message: any) {
    var messageID = message.id.toString();
    var reply = (<HTMLInputElement>document.getElementById("message")).value;
    var date = moment().format();
    var sender = this.user
    var formData = {
      MessageBody: reply,
      Date: date,
      Channel:this.channelSelect,
      LinkedMessage: messageID,
      Sender: sender,
      isDeleted: false
    }
    var replyData = {
      Id:message.id,
      Title : message.title,
      MessageBody: message.messageBody,
      Date: message.Date,
      Channel:this.channelSelect,
      LinkedMessage: true,
      Sender: message.sender,
      isDeleted: message.isDeleted,
    }
    this.dashboardService.postReplies(formData)
      .subscribe(response => {
        this.dashboardService.updateMesages(replyData)
          .subscribe(response => {
            this.getMessages(this.channelSelect);
          }, error => {
            console.error('Error sending data', error);
          });
        this.getMessages(this.channelSelect);
      }, error => {
        console.error('Error sending data', error);
      });
  }

  postMessages(formData: any) {
    this.dashboardService.postMessages(formData)
      .subscribe(response => {
        this.getMessages(this.channelSelect);
      }, error => {
        console.error('Error sending data', error);
      });
  }

  deleteReply(message: any) {
    if (message.title) {

      var formData = {
        id: message.id,
        Title: message.title,
        MessageBody: message.messageBody,
        Date: message.date,
        Sender: message.sender,
        LinkedMessages: message.linkedMessage,
        isDeleted: true

      }
      this.dashboardService.updateMesages(formData)
        .subscribe(response => {
          this.getMessages(this.channelSelect);
        }, error => {
          console.error('Error sending data', error);
        });
    } else {
      var formDatas = {
        id: message.id,
        MessageBody: message.messageBody,
        Date: message.date,
        Sender: message.sender,
        LinkedMessage: message.linkedMessage,
        isDeleted: true
      }
      this.dashboardService.updateReplies(formDatas)
        .subscribe(response => {
          this.getMessages(this.channelSelect);
        }, error => {
          console.error('Error sending data', error);
        });
    }
  }
  async getMessages(channelID: any) {
    try {
      this.messages = await this.dashboardService.getMessageDetails(channelID).toPromise();

      for (var message of this.messages) {
        console.log("🚀 ~ file: channel-content.component.ts:  162 ~ ChannelContentComponent ~ getMessages ~ MESSAEGGGGGGGGGGGG:", message)
        if (message.linkedMessage) {
          console.log("🚀 ~ file: channel-content.component.ts:164 ~ ChannelContentComponent ~ getMessages ~ BOOOOOOOOOOOOOOOOO.linkedMessage:", message.linkedMessage)
          const data = await this.dashboardService.getReplyDetails(message.id).toPromise();
          message.replies = data;
        }
      }

    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }


  async getMessageByID(id: any) {
    try {
      this.message = await this.dashboardService.getMessageByID(id).toPromise();
      return
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }
  async getReplyID(id: any) {
    try {
      this.message = await this.dashboardService.getReplyID(id).toPromise();
      return
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }


  convertDateField(date: any) {
    return moment(date).format('DD/MM/YYYY HH:mm A ');
  }



  ngOnInit() {
    // this.userService.channelName$
    // console.log("🚀 ~ file: channel-content.component.ts:190 ~ ChannelContentComponent ~ ngOnInit ~ this.userService.userTeamsTree$:", this.userService.channelName$)
    this.user = localStorage.getItem("userID")
    console.log("🚀 ~ file: channel-content.component.ts:203 ~BLEHHHHHHHHHHHHHHHHHHHHHH.channelSelect:", this.channelSelect)
    this.getMessages(this.channelSelect);

  }


  ngOnDestroy() {
    this.userTeamsTreeSubscription.unsubscribe();
    this.channelSet.unsubscribe();
    // Unsubscribe to avoid memory leaks
    // this.localStorageChangeSubscription.unsubscribe();
  }


}
