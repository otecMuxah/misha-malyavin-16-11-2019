import {Injectable} from '@angular/core';
import {City} from './api-weather.service';
import {Store} from '@ngrx/store';
import * as FavoritesActions from '../store/app-weather.actions';
import FavoritesState from '../store/app-weather.state';
import {BehaviorSubject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class FavoritesService {
  public favoritesList: City[] = [];

  constructor(
    private store: Store<FavoritesState>
  ) {}

  public isFavorite(city: City): boolean {
    return !!this.favoritesList.filter(el => el.Key === city.Key).length;
  }

  public processFavorite(city: City): void {
    const isPresent = !!this.favoritesList.filter(el => el.Key === city.Key).length;
    if (isPresent) {
      const idx = this.favoritesList.indexOf(city);
      this.favoritesList.splice(idx, 1);
    } else {
      this.favoritesList.push(city);
    }
    this.store.dispatch(FavoritesActions.updateFavorites({payload: this.favoritesList}));
  }
}
