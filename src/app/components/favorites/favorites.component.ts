import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import FavoritesState from '../../store/app-weather.state';
import {City} from '../../service/api-weather.service';
import {Unsubscribe} from '../../shared/unsubscribe';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent extends Unsubscribe implements OnInit {
  favoritesList: City[] = [] as City[];
  constructor(
    private store: Store<FavoritesState>
  ) {
    super();
  }

  ngOnInit(): void {
    this.store.pipe(
      takeUntil(this.$destroySubj),
      select('favoriteCities')
    ).subscribe((data: any)  => { // #FIXME remove any
      this.favoritesList = data.favoriteCities;
    });
  }
}
