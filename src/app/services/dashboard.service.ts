import { Injectable } from '@angular/core';
import { TeamsMessage } from '../models/dashboard';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Replies } from '../models/replies';
import { Users } from '../models/Users';
import { MessageDetails } from '../models/MessageDetails';
import { ReplyDetails } from '../models/ReplyDetails';
import { Channels } from '../models/channel';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private url = "Message"
  private sendMessage = "message"
  constructor(private http: HttpClient) { }

  public getMessages(): Observable<TeamsMessage[]> {
    return this.http.get<TeamsMessage[]>(`${environment.apiURL}/${this.url}`);
  }
  public getMessageDetails(id: any): Observable<MessageDetails[]> {
    return this.http.get<MessageDetails[]>(`${environment.apiURL}/${this.url}/getMessageDetails?id=${id}`);
  }

  public getMessageByID(id: any): Observable<TeamsMessage[]> {
    return this.http.get<TeamsMessage[]>(`${environment.apiURL}/${this.url}/${id}`);
  }


  public postMessages(message: TeamsMessage): Observable<TeamsMessage[]> {
    return this.http.post<TeamsMessage[]>(`${environment.apiURL}/${this.sendMessage}/create`, message);

  }

  public postReplies(message: Replies): Observable<Replies[]> {
    return this.http.post<Replies[]>(`${environment.apiURL}/${this.sendMessage}/createReply`, message);

  }

  public updateMesages(message: TeamsMessage): Observable<TeamsMessage[]> {
    console.log("🚀 ~ file: dashboard.service.ts:44 ~ DashboardService ~ updateMesages ~ message:", message)
    console.log("🚀 ~ file: dashboard.service.ts:44 ~ DashboardService ~ updateMesages ~ messagssssssssssssssssssssssssssssssdbcgckwhgchwghkgcqeje:", message.Id)
    return this.http.put<TeamsMessage[]>(`${environment.apiURL}/${this.sendMessage}/update/${message.Id}`, message);

  }

  public getReplies(id: any): Observable<Replies[]> {
    return this.http.get<Replies[]>(`${environment.apiURL}/${this.url}/getreplies?id=${id}`);
  }

  public getReplyDetails(id: any): Observable<ReplyDetails[]> {
    return this.http.get<ReplyDetails[]>(`${environment.apiURL}/${this.url}/getReplyDetails?id=${id}`);
  }

  public getReplyID(id: any): Observable<Replies[]> {
    return this.http.get<Replies[]>(`${environment.apiURL}/${this.url}/${id}`);
  }

  public updateReplies(message: Replies): Observable<Replies[]> {
    return this.http.put<Replies[]>(`${environment.apiURL}/${this.sendMessage}/updateReplies/${message.id}`, message);

  }

  public getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(`${environment.apiURL}/${this.url}/getUsers`);
  }

  public getUserByID(id: any): Observable<Users[]> {
    return this.http.get<Users[]>(`${environment.apiURL}/${this.url}/User/${id}`);
  }
  public getChannels(): Observable<Channels[]> {
    return this.http.get<Channels[]>(`${environment.apiURL}/${this.url}/getChannels`);
  }

  public getMessageByChannel(id: any): Observable<MessageDetails[]> {
    return this.http.get<MessageDetails[]>(`${environment.apiURL}/${this.url}/getMessageDetails?id=${id}`);
  }

}
