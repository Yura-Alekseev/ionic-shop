import {Component, OnChanges, OnInit} from '@angular/core';
import {NavController, ViewWillEnter, ViewWillLeave} from "@ionic/angular";
import {ProductItem} from "../../../shared/interfaces";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params} from "@angular/router";
import {ProductsService} from "../../../services/products.service";
import {FavoriteService} from "../../../services/favorite.service";
import {switchMap} from "rxjs/operators";
import {CartService} from "../../../services/cart.service";

@Component({
  selector: 'app-favorite-item',
  templateUrl: './favorite-item.page.html',
  styleUrls: ['./favorite-item.page.scss'],
})
export class FavoriteItemPage implements ViewWillEnter, ViewWillLeave {
  favoriteItem: ProductItem;
  prSubs: Subscription;
  isFetching = false;
  inFavorite = false;
  inCart = false;

  constructor(
      private route: ActivatedRoute,
      private navCtrl: NavController,
      private productsService: ProductsService,
      private favoriteService: FavoriteService,
      private cartService: CartService
  ) { }


  ionViewWillEnter() {
    this.isFetching = true;
    this.route.params.pipe(
        switchMap((params: Params) => {
          return this.productsService.getItemById(params['id'])
        })
    ).subscribe((item: ProductItem) => {
      this.favoriteItem = item;
      this.inFavorite = this.favoriteService.getFavoriteById(item.id) !== undefined;
      this.inCart = this.cartService.getCartItemById(this.favoriteItem.id) !== undefined;
      this.isFetching = false;
    });
  }

  ionViewWillLeave() {
    if (this.prSubs) {
      this.prSubs.unsubscribe();
    }
  }

  addToFavorite() {
    this.favoriteService.addToFavorite(this.favoriteItem);
  }

  isFavorite() {
    this.inFavorite = this.favoriteService.getFavoriteById(this.favoriteItem.id) !== undefined;
  }

  addToCart() {
    this.cartService.addToCart(this.favoriteItem);
  }

  isInCart() {
    this.inCart = this.cartService.getCartItemById(this.favoriteItem.id) !== undefined;
  }
}
