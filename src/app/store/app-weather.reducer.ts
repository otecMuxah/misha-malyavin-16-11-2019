import {Action, createReducer, on} from '@ngrx/store';
import * as FavoritesActions from './app-weather.actions';
import FavoritesState, {initializeState} from './app-weather.state';

export const intialState = initializeState();

const reducer = createReducer(
  intialState,
  on(FavoritesActions.updateFavorites, (state, { payload }) => {
    return { ...state, favoriteCities: payload };
  })
);

export function favoritesReducer(state: FavoritesState | undefined, action: Action) {
  return reducer(state, action);
}
