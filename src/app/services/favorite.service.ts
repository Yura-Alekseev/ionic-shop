import { Injectable } from '@angular/core';
import {ProductItem} from "../shared/interfaces";

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  favoriteItems: ProductItem[];

  constructor() {}

  addToFavorite(item: ProductItem) {
    if (this.getFavoriteById(item.id) === undefined) {
      this.favoriteItems.push(item);
      localStorage.setItem('favorites', JSON.stringify(this.favoriteItems));
    } else {
      localStorage.setItem('favorites', null);
      this.favoriteItems =  this.filterFavoriteById(item.id);
      localStorage.setItem('favorites', JSON.stringify(this.favoriteItems));
      this.getFavoriteById(item.id);
    }
  }

  getFavoriteById(id: string){
    if (this.getAllFavorites() !== null) {
      this.favoriteItems = this.getAllFavorites();
      return this.favoriteItems.find( i => i.id === id);
    }
  }

  filterFavoriteById(id: string) {
    return this.favoriteItems.filter( i => i.id !== id);
  }

  removeFavoriteItemById(id: string) {
    this.favoriteItems = this.getAllFavorites();
    this.favoriteItems = this.favoriteItems.filter( i => i.id !== id);
    localStorage.setItem('favorites', JSON.stringify(this.favoriteItems));
    return this.favoriteItems;
  }

  getAllFavorites() {
    if (JSON.parse(localStorage.getItem('favorites')) !== null) {
      return JSON.parse(localStorage.getItem('favorites'));
    } else {
      localStorage.setItem('favorites', JSON.stringify([]));
      return JSON.parse(localStorage.getItem('favorites'));
    }
  }
}
