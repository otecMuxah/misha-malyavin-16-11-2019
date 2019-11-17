import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

const searchURL = 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete';
const geoSearchURL = 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search';
const oneDayForecastURL = 'http://dataservice.accuweather.com/forecasts/v1/daily/1day';
const fiveDayForecastURL = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day';
const APIkey = 'FScXOJwiXYTFgZWTdIX8Ij0Xe4SGhAzU';

const MOCK = [
  {
    Version: 1,
    Key: '308406',
    Type: 'City',
    Rank: 20,
    LocalizedName: 'Khartoum',
    Country: {
      ID: 'SD',
      LocalizedName: 'Sudan'
    },
    AdministrativeArea: {
      ID: 'KH',
      LocalizedName: 'Khartoum'
    }
  },
  {
    Version: 1,
    Key: '29075',
    Type: 'City',
    Rank: 21,
    LocalizedName: 'Khulna',
    Country: {
      ID: 'BD',
      LocalizedName: 'Bangladesh'
    },
    AdministrativeArea: {
      ID: 'D',
      LocalizedName: 'Khulna'
    }
  },
  {
    Version: 1,
    Key: '323903',
    Type: 'City',
    Rank: 21,
    LocalizedName: 'Kharkiv',
    Country: {
      ID: 'UA',
      LocalizedName: 'Ukraine'
    },
    AdministrativeArea: {
      ID: '63',
      LocalizedName: 'Kharkiv'
    }
  },
  {
    Version: 1,
    Key: '210291',
    Type: 'City',
    Rank: 31,
    LocalizedName: 'Khorramabad',
    Country: {
      ID: 'IR',
      LocalizedName: 'Iran'
    },
    AdministrativeArea: {
      ID: '20',
      LocalizedName: 'Lorestan'
    }
  },
  {
    Version: 1,
    Key: '293149',
    Type: 'City',
    Rank: 31,
    LocalizedName: 'Khabarovsk',
    Country: {
      ID: 'RU',
      LocalizedName: 'Russia'
    },
    AdministrativeArea: {
      ID: 'KHA',
      LocalizedName: 'Khabarovsk'
    }
  },
  {
    Version: 1,
    Key: '324056',
    Type: 'City',
    Rank: 31,
    LocalizedName: 'Kherson',
    Country: {
      ID: 'UA',
      LocalizedName: 'Ukraine'
    },
    AdministrativeArea: {
      ID: '65',
      LocalizedName: 'Kherson'
    }
  },
  {
    Version: 1,
    Key: '324159',
    Type: 'City',
    Rank: 31,
    LocalizedName: 'Khmelnytskyi',
    Country: {
      ID: 'UA',
      LocalizedName: 'Ukraine'
    },
    AdministrativeArea: {
      ID: '68',
      LocalizedName: 'Khmel\'nyts\'kyy'
    }
  },
  {
    Version: 1,
    Key: '296652',
    Type: 'City',
    Rank: 35,
    LocalizedName: 'Khamis Mushait',
    Country: {
      ID: 'SA',
      LocalizedName: 'Saudi Arabia'
    },
    AdministrativeArea: {
      ID: '14',
      LocalizedName: '\'Asīr'
    }
  },
  {
    Version: 1,
    Key: '319899',
    Type: 'City',
    Rank: 35,
    LocalizedName: 'Khlong Luang',
    Country: {
      ID: 'TH',
      LocalizedName: 'Thailand'
    },
    AdministrativeArea: {
      ID: '13',
      LocalizedName: 'Pathum Thani'
    }
  },
  {
    Version: 1,
    Key: '1147085',
    Type: 'City',
    Rank: 35,
    LocalizedName: 'Khayelitsha',
    Country: {
      ID: 'ZA',
      LocalizedName: 'South Africa'
    },
    AdministrativeArea: {
      ID: 'WC',
      LocalizedName: 'Western Cape'
    }
  }
];

const MOCK_FORECAST = {
  Headline: {
    EffectiveDate: '2019-11-20T19:00:00+02:00',
    EffectiveEpochDate: 1574269200,
    Severity: 7,
    Text: 'Cold Wednesday night',
    Category: 'cold',
    EndDate: '2019-11-21T07:00:00+02:00',
    EndEpochDate: 1574312400,
    MobileLink: 'http://m.accuweather.com/en/ua/kharkiv/323903/extended-weather-forecast/323903?lang=en-us',
    Link: 'http://www.accuweather.com/en/ua/kharkiv/323903/daily-weather-forecast/323903?lang=en-us'
  },
  DailyForecasts: [
    {
      Date: '2019-11-16T07:00:00+02:00',
      EpochDate: 1573880400,
      Temperature: {
        Minimum: {
          Value: 32,
          Unit: 'F',
          UnitType: 18
        },
        Maximum: {
          Value: 44,
          Unit: 'F',
          UnitType: 18
        }
      },
      Day: {
        Icon: 2,
        IconPhrase: 'Mostly sunny',
        HasPrecipitation: false
      },
      Night: {
        Icon: 33,
        IconPhrase: 'Clear',
        HasPrecipitation: false
      },
      Sources: [
        'AccuWeather'
      ],
      MobileLink: 'http://m.accuweather.com/en/ua/kharkiv/323903/daily-weather-forecast/323903?day=1&lang=en-us',
      Link: 'http://www.accuweather.com/en/ua/kharkiv/323903/daily-weather-forecast/323903?day=1&lang=en-us'
    },
    {
      Date: '2019-11-17T07:00:00+02:00',
      EpochDate: 1573966800,
      Temperature: {
        Minimum: {
          Value: 31,
          Unit: 'F',
          UnitType: 18
        },
        Maximum: {
          Value: 44,
          Unit: 'F',
          UnitType: 18
        }
      },
      Day: {
        Icon: 3,
        IconPhrase: 'Partly sunny',
        HasPrecipitation: false
      },
      Night: {
        Icon: 33,
        IconPhrase: 'Clear',
        HasPrecipitation: false
      },
      Sources: [
        'AccuWeather'
      ],
      MobileLink: 'http://m.accuweather.com/en/ua/kharkiv/323903/daily-weather-forecast/323903?day=2&lang=en-us',
      Link: 'http://www.accuweather.com/en/ua/kharkiv/323903/daily-weather-forecast/323903?day=2&lang=en-us'
    },
    {
      Date: '2019-11-18T07:00:00+02:00',
      EpochDate: 1574053200,
      Temperature: {
        Minimum: {
          Value: 29,
          Unit: 'F',
          UnitType: 18
        },
        Maximum: {
          Value: 47,
          Unit: 'F',
          UnitType: 18
        }
      },
      Day: {
        Icon: 1,
        IconPhrase: 'Sunny',
        HasPrecipitation: false
      },
      Night: {
        Icon: 38,
        IconPhrase: 'Mostly cloudy',
        HasPrecipitation: false
      },
      Sources: [
        'AccuWeather'
      ],
      MobileLink: 'http://m.accuweather.com/en/ua/kharkiv/323903/daily-weather-forecast/323903?day=3&lang=en-us',
      Link: 'http://www.accuweather.com/en/ua/kharkiv/323903/daily-weather-forecast/323903?day=3&lang=en-us'
    },
    {
      Date: '2019-11-19T07:00:00+02:00',
      EpochDate: 1574139600,
      Temperature: {
        Minimum: {
          Value: 32,
          Unit: 'F',
          UnitType: 18
        },
        Maximum: {
          Value: 42,
          Unit: 'F',
          UnitType: 18
        }
      },
      Day: {
        Icon: 6,
        IconPhrase: 'Mostly cloudy',
        HasPrecipitation: false
      },
      Night: {
        Icon: 8,
        IconPhrase: 'Dreary',
        HasPrecipitation: false
      },
      Sources: [
        'AccuWeather'
      ],
      MobileLink: 'http://m.accuweather.com/en/ua/kharkiv/323903/daily-weather-forecast/323903?day=4&lang=en-us',
      Link: 'http://www.accuweather.com/en/ua/kharkiv/323903/daily-weather-forecast/323903?day=4&lang=en-us'
    },
    {
      Date: '2019-11-20T07:00:00+02:00',
      EpochDate: 1574226000,
      Temperature: {
        Minimum: {
          Value: 22,
          Unit: 'F',
          UnitType: 18
        },
        Maximum: {
          Value: 39,
          Unit: 'F',
          UnitType: 18
        }
      },
      Day: {
        Icon: 3,
        IconPhrase: 'Partly sunny',
        HasPrecipitation: false
      },
      Night: {
        Icon: 33,
        IconPhrase: 'Clear',
        HasPrecipitation: false
      },
      Sources: [
        'AccuWeather'
      ],
      MobileLink: 'http://m.accuweather.com/en/ua/kharkiv/323903/daily-weather-forecast/323903?day=5&lang=en-us',
      Link: 'http://www.accuweather.com/en/ua/kharkiv/323903/daily-weather-forecast/323903?day=5&lang=en-us'
    }
  ]
};

const MOCK_GEO = {
  Version: 1,
  Key: '323903',
  Type: 'City',
  Rank: 21,
  LocalizedName: 'Kharkiv',
  EnglishName: 'Kharkiv',
  PrimaryPostalCode: '',
  Region: {ID: 'EUR', LocalizedName: 'Europe', EnglishName: 'Europe'},
  Country: {ID: 'UA', LocalizedName: 'Ukraine', EnglishName: 'Ukraine'},
  AdministrativeArea: {
    ID: '63',
    LocalizedName: 'Kharkiv',
    EnglishName: 'Kharkiv',
    Level: 1,
    LocalizedType: 'Province',
    EnglishType: 'Province',
    CountryID: 'UA'
  },
  TimeZone: {
    Code: 'EET',
    Name: 'Europe/Kiev',
    GmtOffset: 2.0,
    IsDaylightSaving: false,
    NextOffsetChange: '2020-03-29T01:00:00Z'
  },
  GeoPosition: {
    Latitude: 49.99,
    Longitude: 36.23,
    Elevation: {Metric: {Value: 112.0, Unit: 'm', UnitType: 5}, Imperial: {Value: 367.0, Unit: 'ft', UnitType: 0}}
  },
  IsAlias: false,
  SupplementalAdminAreas: [],
  DataSets: []
};

@Injectable({providedIn: 'root'})
export class WeatherService {

  public $currentForecast: Observable<DailyForecast[]>;
  public currentCity: City;

  constructor(
    private _http: HttpClient
  ) {}

  public getCitiesList(quote): Observable<City[]> {
    const params = new HttpParams().set('apikey', APIkey).set('q', quote).set('metric', 'true');
    return this._http.get(searchURL, {params}).pipe(
      catchError(err => of(err))
    );
  }

  public getCityByGeo(lat, long) {
    const params = new HttpParams().set('apikey', APIkey).set('q', `${lat},${long}`);
    return this._http.get(geoSearchURL, {params}).pipe(
      catchError(err => of(err))
    );
  }

  public getForecast(city: City): Observable<DailyForecast[]> {
    this.currentCity = city;
    const params = new HttpParams().set('apikey', APIkey).set('metric', 'true');
    return this._http.get(`${fiveDayForecastURL}/${city.Key}`, {params}).pipe(
      catchError(err => of(err)),
      map(el => {
        return el.DailyForecasts;
      })
    );
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
