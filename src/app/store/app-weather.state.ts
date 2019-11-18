import {City} from '../service/api-weather.service';

export default class FavoritesState {
  weatherApp: WeatherAppDetails;
}

export interface WeatherAppDetails {
  favoriteCities: City[];
  celsiusUnits: boolean;
}
export const initializeState = () => {
  return {
    favoriteCities: [] as City[],
    celsiusUnits: true
  };
};


