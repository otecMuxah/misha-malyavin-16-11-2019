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
  title = 'weather-app';

  constructor(
    private router: Router
  ) {
    super();
    router.events.subscribe((event: any) => {
      console.log(event);
      if (event && event instanceof NavigationEnd) {
        this.activeNavURL = event.url;
      }
    });
  }

  activeNavURL: any;
}
