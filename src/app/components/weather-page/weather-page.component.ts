import {AfterViewInit, Component, OnDestroy, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {map, takeUntil} from 'rxjs/operators';
import {Observable, of, Subscription} from 'rxjs';
import {City, WeatherService} from '../../service/api-weather.service';
import {Unsubscribe} from '../../shared/unsubscribe';

@Component({
  selector: 'app-weather-page',
  templateUrl: './weather-page.component.html',
  styleUrls: ['./weather-page.component.scss']
})

export class WeatherPageComponent extends Unsubscribe implements AfterViewInit, OnDestroy  {

  @ViewChild('searchForm', {static: false}) public searchForm: NgForm;
  public $searchResults: Observable<City[]>;

  public $forecast: Observable<any>;

  private _subscription = new Subscription();

  public currentCity: City;
  public currentCityGeolocated: City;

  constructor(
    public weatherService: WeatherService,
  ) {
    super();
  }

  public ngAfterViewInit(): void {
    navigator.geolocation.getCurrentPosition((data) => {
      const latitude = data.coords.latitude;
      const longitude = data.coords.longitude;
      if (latitude && longitude) {
        this.weatherService.getCityByGeo(latitude, longitude).subscribe(geoData => {
          this.currentCityGeolocated = geoData;
        });
      }
    }, (err) => console.log(err));

    this.searchForm.form.valueChanges.pipe(
      takeUntil(this.$destroySubj),
      map((cahnge: SearchInput) => {
        if (cahnge.searchInput) {
          this.$searchResults = this.weatherService.getCitiesList(cahnge.searchInput);
        }
      })
    ).subscribe();
  }

  public getForecast(city: City): void {
    this.searchForm.form.reset();
    this.$searchResults = of([] as City[]);
    this.currentCity = city;
    this.$forecast = this.weatherService.getForecast(city);
  }
}

interface SearchInput {
  searchInput: string;
}
