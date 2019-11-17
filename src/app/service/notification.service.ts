import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class NotificationService {
  private $$notifications = new Subject();
  public $notifications = this.$$notifications.asObservable();

  public publishNotification(notification) {
    this.$$notifications.next(notification);
  }
}
