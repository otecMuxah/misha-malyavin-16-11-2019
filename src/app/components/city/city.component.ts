import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {City, WeatherService} from '../../service/api-weather.service';
import {FavoritesService} from '../../service/favorites.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {
  @Input()
  public city: City;

  @Output()
  public setForecast = new EventEmitter<City>();

  public cityName: string;

  constructor(
    public weatherService: WeatherService,
    public favoritesService: FavoritesService
  ) { }

  ngOnInit() {
  }

  getForecast(city: City) {
    this.setForecast.emit(city);
  }

  processFavorite(city: City) {
    this.favoritesService.processFavorite(city);
  }
}
