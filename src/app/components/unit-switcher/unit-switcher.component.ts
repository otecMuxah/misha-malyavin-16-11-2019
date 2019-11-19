import { Component, OnInit } from '@angular/core';
import * as FavoritesActions from '../../store/app-weather.actions';
import {Store} from '@ngrx/store';
import FavoritesState from '../../store/app-weather.state';

@Component({
  selector: 'app-unit-switcher',
  templateUrl: './unit-switcher.component.html',
  styleUrls: ['./unit-switcher.component.scss']
})
export class UnitSwitcherComponent {
  private celsius = true;
  constructor(
    private _store: Store<FavoritesState>
  ) { }

  changeUnits() {
    this.celsius = !this.celsius;
    this._store.dispatch(FavoritesActions.setCelsiusUnits({payload: this.celsius}));
  }
}
