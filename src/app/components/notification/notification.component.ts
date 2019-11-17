import {Component, OnInit} from '@angular/core';
import {NotificationService} from '../../service/notification.service';
import {map, tap} from 'rxjs/operators';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  public messages: string[] = [];
  public hideMessage: boolean;

  constructor(
    private _notificationService: NotificationService
  ) { }

  ngOnInit() {
    this._notificationService.$notifications.pipe(
      map((error: Error) => error.message),
      tap(() => {
        this.hideMessage = false;
        setTimeout(() => {
          this.messages = [];
        }, 15000);
      })
    ).subscribe(data => {
      this.messages.push(data);
    });
  }

}

export interface Error {
  message: string;
}
