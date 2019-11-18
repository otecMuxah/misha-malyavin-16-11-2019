import {Component} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Unsubscribe} from './shared/unsubscribe';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends Unsubscribe {
  public title = 'weather-app';
  public activeNavURL = '/weather';

  constructor(
    private _router: Router
  ) {
    super();
    _router.events.subscribe((event: any) => {
      if (event && event instanceof NavigationEnd && event.url !== '/') {
        this.activeNavURL = event.url;
        if (event.url.indexOf('/weather') !== -1) {
          this.activeNavURL = '/weather';
        }
      }
    });
  }
}
