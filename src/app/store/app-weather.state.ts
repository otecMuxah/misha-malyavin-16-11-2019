import {City} from '../service/api-weather.service';

export default class FavoritesState {
  favoriteCities: City[];
}

export const initializeState = () => {
  return {favoriteCities: [] as City[]};
};


