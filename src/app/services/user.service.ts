import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  constructor() { }
 
  private userTeamsTreeSubject = new BehaviorSubject<any[]>([]);
  userTeamsTree$ = this.userTeamsTreeSubject.asObservable();

  private channelNames = new BehaviorSubject<any>(1);
  channelNames$ = this.channelNames.asObservable();

  setUserTeamsTree(data: any[]): void {
    this.userTeamsTreeSubject.next(data);
  }

  setChannelNames(data: any): void {
    this.channelNames.next(data);
  }
 


}

 
 
 

 