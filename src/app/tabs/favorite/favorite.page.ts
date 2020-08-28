import { Component, OnInit } from '@angular/core';
import {ProductItem} from "../../shared/interfaces";
import {FavoriteService} from "../../services/favorite.service";
import {ViewWillEnter} from "@ionic/angular";

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit, ViewWillEnter {
  favoritesList: ProductItem[];
  isFetching = false;

  constructor(private favoriteService: FavoriteService) { }

  ngOnInit() {
    this.isFetching = true;
    this.favoritesList = this.favoriteService.getAllFavorites();
    this.isFetching = false;
  }

  ionViewWillEnter() {
    this.isFetching = true;
    this.favoritesList = this.favoriteService.getAllFavorites();
    console.log(this.favoritesList);
    this.isFetching = false;
  }

}
