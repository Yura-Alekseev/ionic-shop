import { Component, OnInit } from '@angular/core';
import {ProductItem} from "../../shared/interfaces";
import {FavoriteService} from "../../services/favorite.service";
import {ViewWillEnter} from "@ionic/angular";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit, ViewWillEnter {
  cartList: ProductItem[];
  isFetching = false;
  cartSum = 0;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.isFetching = true;
    this.cartList = this.cartService.getAllCartItems();
    this.isFetching = false;
  }

  ionViewWillEnter() {
    this.isFetching = true;
    this.cartList = this.cartService.getAllCartItems();
    this.getCartTotal();
    this.isFetching = false;
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartSum = 0;
    this.cartList = this.cartService.getAllCartItems();
  }

  removeItem(id: string) {
    this.cartList = this.cartService.removeCartItemById(id);
    this.getCartTotal();
  }

  getCartTotal() {
    this.cartSum = 0;
    if (this.cartList !== []) {
      this.cartList.forEach(item => {
        this.cartSum += item.price;
      })
    }
  }
}
