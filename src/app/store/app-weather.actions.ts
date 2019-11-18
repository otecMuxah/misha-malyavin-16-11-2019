import {createAction, props} from '@ngrx/store';
import {City} from '../service/api-weather.service';

export const updateFavorites = createAction('[Weather Component] AddFavorite', props<{ payload: City[] }>());
export const setCelsiusUnits = createAction('[Weather Component] setCelsiusUnits', props<{ payload: boolean }>());
