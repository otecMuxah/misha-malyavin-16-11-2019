import {createAction, props} from '@ngrx/store';
import {City} from '../service/api-weather.service';

export const updateFavorites = createAction('[Weather Component] AddFavorite', props<{ payload: City[] }>());
