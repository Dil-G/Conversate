export class TeamsMessage {
    Id?:number;
    Title = "";
    Channel ?: number;
    MessageBody = "";
    Date =  "";
    Sender = "";
    LinkedMessages?:boolean
    isDeleted ?: boolean
}