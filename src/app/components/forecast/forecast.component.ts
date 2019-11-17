import {Component, Input, OnChanges} from '@angular/core';
import {City, DailyForecast, WeatherService} from '../../service/api-weather.service';
import {FavoritesService} from '../../service/favorites.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnChanges {
  @Input()
  public city: City;

  public forecast: DailyForecast[];

  constructor(
    public weatherService: WeatherService,
    public favoritesService: FavoritesService
  ) { }

  ngOnChanges() {
    this.weatherService.getForecast(this.city).subscribe(data => {
      this.forecast = data;
    });
  }

  public getIconUrl(id): string {
    if (+id < 10) {
      id = '0' + id;
    }
    return `https://developer.accuweather.com/sites/default/files/${id}-s.png`;
  }
}
