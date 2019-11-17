import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeatherPageComponent } from './components/weather-page/weather-page.component';
import { FavoritesComponent } from './components/favorites/favorites.component';


const routes: Routes = [
  { path: '**', redirectTo: 'weather', pathMatch: 'full'},
  { path: 'weather', component: WeatherPageComponent},
  { path: 'favorites', component: FavoritesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
