import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherPageComponent } from './components/weather-page/weather-page.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { HttpClientModule } from '@angular/common/http';
import { CityComponent } from './components/city/city.component';
import { ForecastComponent } from './components/forecast/forecast.component';
import {favoritesReducer} from './store/app-weather.reducer';
import { StoreModule } from '@ngrx/store';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatListModule, MatSlideToggleModule
} from '@angular/material';
import { NotificationComponent } from './components/notification/notification.component';
import { UnitSwitcherComponent } from './components/unit-switcher/unit-switcher.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherPageComponent,
    FavoritesComponent,
    CityComponent,
    ForecastComponent,
    NotificationComponent,
    UnitSwitcherComponent
  ],
  imports: [
    StoreModule.forRoot({weatherApp: favoritesReducer}),
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatButtonToggleModule,
    MatInputModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
