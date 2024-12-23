import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LiveService {
  private hubConnection: HubConnection;
  private timeEntryDataSubject: Subject<any> = new Subject<any>();

  constructor() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('')
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR connected'))
      .catch(err => console.error('Error while starting connection: ' + err));

    this.hubConnection.on('ReceiveTimeEntryData', (data) => {
      this.timeEntryDataSubject.next(data);
    });
  }

  getTimeEntryData(): Observable<any> {
    return this.timeEntryDataSubject.asObservable();
  }
}
