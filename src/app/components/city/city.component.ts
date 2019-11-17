import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {City, WeatherService} from '../../service/api-weather.service';
import {FavoritesService} from '../../service/favorites.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent {
  @Input()
  public city: City;

  @Output()
  public setForecast = new EventEmitter<City>();

  constructor(
    public weatherService: WeatherService,
    public favoritesService: FavoritesService
  ) { }

  getForecast(city: City): void {
    this.setForecast.emit(city);
  }

  processFavorite(city: City): void {
    this.favoritesService.processFavorite(city);
  }
}
