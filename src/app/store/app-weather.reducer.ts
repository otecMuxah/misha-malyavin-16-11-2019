import {Action, createReducer, on} from '@ngrx/store';
import * as FavoritesActions from './app-weather.actions';
import FavoritesState, {initializeState, WeatherAppDetails} from './app-weather.state';

export const intialState = initializeState();

const reducer = createReducer(
  intialState,
  on(FavoritesActions.updateFavorites, (state, { payload }) => {
    return { ...state, favoriteCities: payload };
  }),
  on(FavoritesActions.setCelsiusUnits, (state, { payload }) => {
    return { ...state, celsiusUnits: payload };
  })
);

export function favoritesReducer(state: WeatherAppDetails | undefined, action: Action) {
  return reducer(state, action);
}
