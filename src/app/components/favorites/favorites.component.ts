import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import FavoritesState, {WeatherAppDetails} from '../../store/app-weather.state';
import {City} from '../../service/api-weather.service';
import {Unsubscribe} from '../../shared/unsubscribe';
import {takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent extends Unsubscribe implements OnInit {
  favoritesList: City[] = [] as City[];
  constructor(
    private store: Store<FavoritesState>,
    private _router: Router
  ) {
    super();
  }

  public ngOnInit(): void {
    this.store.pipe(
      takeUntil(this.$destroySubj),
      select('weatherApp')
    ).subscribe((data: WeatherAppDetails)  => {
      this.favoritesList = data.favoriteCities;
    });
  }

  public navigateTo(city: City): void {
    this._router.navigate(['/weather', {city: JSON.stringify(city)}]);
  }
}
