import {OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';

export abstract class Unsubscribe implements OnDestroy {
  protected $destroySubj = new Subject();
  public ngOnDestroy(): void {
    this.$destroySubj.next();
    this.$destroySubj.complete();
  }


}
