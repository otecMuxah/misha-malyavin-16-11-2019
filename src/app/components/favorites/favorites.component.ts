import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import FavoritesState from '../../store/app-weather.state';
import {City} from '../../service/api-weather.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favoritesList: City[] = [] as City[];
  constructor(
    private store: Store<FavoritesState>
  ) { }

  ngOnInit() {
    this.store.pipe(
      select('favoriteCities')
    ).subscribe((data: any)  => { // #FIXME remove any
      this.favoritesList = data.favoriteCities;
    });
  }
}
