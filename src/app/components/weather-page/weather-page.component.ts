import {AfterViewInit, Component, OnDestroy, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {debounceTime, map, takeUntil} from 'rxjs/operators';
import {Observable, of, Subscription} from 'rxjs';
import {City, DailyForecast, WeatherService} from '../../service/api-weather.service';
import {Unsubscribe} from '../../shared/unsubscribe';
import FavoritesState, {WeatherAppDetails} from '../../store/app-weather.state';
import {Store} from '@ngrx/store';
import {ActivatedRoute, Route} from '@angular/router';

@Component({
  selector: 'app-weather-page',
  templateUrl: './weather-page.component.html',
  styleUrls: ['./weather-page.component.scss']
})

export class WeatherPageComponent extends Unsubscribe implements AfterViewInit, OnDestroy  {

  @ViewChild('searchForm', {static: false}) public searchForm: NgForm;
  public $searchResults: Observable<City[]>;

  public temperatureUnitsCelsius = true;

  public currentCity: City;
  public currentCityGeolocated: City;

  constructor(
    public weatherService: WeatherService,
    private _store: Store<FavoritesState>,
    private _route: ActivatedRoute
  ) {
    super();

    this._store.select('weatherApp').pipe(
    ).subscribe((data: WeatherAppDetails): void => {
      if (!data) {
        return;
      }
      this.temperatureUnitsCelsius = data.celsiusUnits;
      this.getForecast(this.currentCity);
    });

    this._route.paramMap.pipe().subscribe((params) => {
      // @ts-ignore
      if (params.params && params.params.city) {
        // @ts-ignore
        const city = params.params.city;
        this.currentCity = JSON.parse(city);
      }
    });
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
      debounceTime(500),
      takeUntil(this.$destroySubj),
      map((cahnge: SearchInput) => {
        if (cahnge.searchInput) {
          this.$searchResults = this.weatherService.getCitiesList(cahnge.searchInput);
        }
      })
    ).subscribe();
  }

  public getForecast(city: City): void {
    if (!city) {
      return;
    }
    this.searchForm.form.reset();
    this.$searchResults = of([] as City[]);
    this.currentCity = city;
  }
}

interface SearchInput {
  searchInput: string;
}
