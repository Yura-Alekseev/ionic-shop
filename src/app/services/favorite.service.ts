import { Injectable } from '@angular/core';
import {ProductItem} from "../shared/interfaces";

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  favoriteItems: ProductItem[] = [];

  constructor() {
    if (!JSON.parse(localStorage.getItem('favorites'))) {
      localStorage.setItem('favorites', JSON.stringify(this.favoriteItems));
    }
  }

  addToFavorite(item: ProductItem) {
    if (this.getFavoriteById(item.id) === undefined) {
      this.favoriteItems.push(item);
      localStorage.setItem('favorites', JSON.stringify(this.favoriteItems));
    } else {
      localStorage.setItem('favorites', null);
      this.favoriteItems =  this.removeFavoriteById(item.id);
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

  removeFavoriteById(id: string) {
    return this.favoriteItems.filter( i => i.id !== id);
  }

  getAllFavorites() {
    return JSON.parse(localStorage.getItem('favorites'));
  }
}
