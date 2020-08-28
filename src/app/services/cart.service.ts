import { Injectable } from '@angular/core';
import {ProductItem} from "../shared/interfaces";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: ProductItem[] = [];

  constructor() {
    if (!JSON.parse(localStorage.getItem('cart'))) {
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
    }
  }

  addToCart(item: ProductItem) {
    if (this.getCartItemById(item.id) === undefined) {
      this.cartItems.push(item);
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
    } else {
      localStorage.setItem('cart', null);
      this.cartItems =  this.filterCartItemById(item.id);
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
      this.getCartItemById(item.id);
    }
  }

  getCartItemById(id: string){
    if (this.getAllCartItems() !== null) {
      this.cartItems = this.getAllCartItems();
      return this.cartItems.find( i => i.id === id);
    }
  }

  filterCartItemById(id: string) {
    return this.cartItems.filter( i => i.id !== id);
  }

  getAllCartItems() {
    return JSON.parse(localStorage.getItem('cart'));
  }

  removeCartItemById(id: string) {
    this.cartItems = this.getAllCartItems();
    this.cartItems = this.cartItems.filter( i => i.id !== id);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    return  this.cartItems;
  }

  clearCart() {
    this.cartItems = [];
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }
}
