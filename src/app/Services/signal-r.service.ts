import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as signalR from '@microsoft/signalr';
@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;

  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5001/realtimehub', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      }) // SignalR hub URL
      .build();
  }

  startConnection(): Observable<void> {
    return new Observable<void>((observer) => {
      this.hubConnection
        .start()
        .then(() => {
          console.log('Connection established with SignalR hub');
          observer.next();
          observer.complete();
        })
        .catch((error) => {
          console.error('Error connecting to SignalR hub:', error);
          observer.error(error);
        });
    });
  }

  closeConnection(): Observable<void> {
    return new Observable<void>((observer) => {
      this.hubConnection
        .stop()
        .then(() => {
          console.log('Connection closed with SignalR hub');
          observer.next();
          observer.complete();
        })
        .catch((error) => {
          console.error('Error closing connection to SignalR hub:', error);
          observer.error(error);
        });
    });
  }
  

  receiveMessage(): Observable<any> {
    return new Observable<string>((observer) => {
      this.hubConnection.on('NotifyPriceUpdated', (message) => {
        observer.next(message);
      });
    });
  }
}
