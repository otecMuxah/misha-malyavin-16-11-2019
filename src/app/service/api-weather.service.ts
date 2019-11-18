import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {NotificationService} from './notification.service';

const searchURL = 'https://dataservice.accuweather.com/locations/v1/cities/autocomplete';
const geoSearchURL = 'https://dataservice.accuweather.com/locations/v1/cities/geoposition/search';
const oneDayForecastURL = 'https://dataservice.accuweather.com/forecasts/v1/daily/1day';
const fiveDayForecastURL = 'https://dataservice.accuweather.com/forecasts/v1/daily/5day';
// const APIkey = 'ao8McnoX2b6WX3qpFBvH7TDAYZtf153h';
const APIkey = 'FScXOJwiXYTFgZWTdIX8Ij0Xe4SGhAzU';

@Injectable({providedIn: 'root'})
export class WeatherService {
  public currentCity: City;
  public currentCelsius: boolean;

  constructor(
    private _http: HttpClient,
    public _notificationService: NotificationService
  ) {}

  public getCitiesList(quote): Observable<City[]> {
    const params = new HttpParams().set('apikey', APIkey).set('q', quote).set('metric', 'true');
    return this._http.get<City[]>(searchURL, {params}).pipe(
      catchError( err => {
        this._notificationService.publishNotification(err);
        return this._handleError(err);
      })
    );
  }

  public getCityByGeo(lat, long): Observable<City> {
    const params = new HttpParams().set('apikey', APIkey).set('q', `${lat},${long}`);
    return this._http.get<City>(geoSearchURL, {params}).pipe(
      catchError( err => {
        this._notificationService.publishNotification(err);
        return this._handleError(err);
      })
    );
  }

  public getForecast(city: City, celsius: boolean): Observable<DailyForecast[]> {
    this.currentCity = city;
    this.currentCelsius = celsius;
    const params = new HttpParams().set('apikey', APIkey).set('metric', celsius + '');
    return this._http.get<ForecastSearchResult>(`${fiveDayForecastURL}/${city.Key}`, {params}).pipe(
      map((el: ForecastSearchResult) => {
        return el.DailyForecasts;
      }),
      catchError( err => {
        this._notificationService.publishNotification(err);
        return this._handleError(err);
      })
    );
  }

  private _handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}



export interface City {
  LocalizedName: string;
  Key: string;
}

export interface ForecastSearchResult {
  DailyForecasts: DailyForecast[];
  Headline: {};
}

export interface DailyForecast {
  Date: string;
  Temperature: {
    Minimum: {
      Value: number,
      Unit: string
    },
    Maximum: {
      Value: number,
      Unit: string
    }
  };
  Day: {
    Icon: number,
    IconPhrase: string,
    HasPrecipitation: boolean
  };
  Night: {
    Icon: number,
    IconPhrase: string,
    HasPrecipitation: boolean
  };
}
