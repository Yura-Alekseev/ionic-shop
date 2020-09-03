import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from "../../../services/products.service";
import {ProductItem} from "../../../shared/interfaces";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {NavController, ViewWillEnter, ViewWillLeave} from "@ionic/angular";
import {switchMap} from "rxjs/operators";
import {Subscription} from "rxjs";
import {FavoriteService} from "../../../services/favorite.service";
import {CartService} from "../../../services/cart.service";
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.page.html',
  styleUrls: ['./product-item.page.scss'],
})
export class ProductItemPage implements OnInit, ViewWillLeave, ViewWillEnter {
  productItem: ProductItem;
  prSubs: Subscription;
  isFetching = false;
  inFavorite = false;
  inCart = false;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private navCtrl: NavController,
      private productsService: ProductsService,
      private favoriteService: FavoriteService,
      private cartService: CartService,
      private authService: AuthService
  ) { }

  ngOnInit() {
    this.isFetching = true;
    this.route.params.pipe(
        switchMap((params: Params) => {
          return this.productsService.getItemById(params['id'])
        })
    ).subscribe((item: ProductItem) => {
      this.productItem = item;
      this.inFavorite = this.favoriteService.getFavoriteById(item.id) !== undefined;
      this.inCart = this.cartService.getCartItemById(this.productItem.id) !== undefined;
      this.isFetching = false;
    });
  }

  ionViewWillEnter() {
    this.isFetching = true;
    this.route.params.pipe(
        switchMap((params: Params) => {
          return this.productsService.getItemById(params['id'])
        })
    ).subscribe((item: ProductItem) => {
      this.productItem = item;
      this.inFavorite = this.favoriteService.getFavoriteById(this.productItem.id) !== undefined;
      this.inCart = this.cartService.getCartItemById(this.productItem.id) !== undefined;
      this.isFetching = false;
    });
  }

  ionViewWillLeave() {
    if (this.prSubs) {
      this.prSubs.unsubscribe();
    }
  }

  addToFavorite() {
    if (this.authService.isAuthenticated()) {
      this.favoriteService.addToFavorite(this.productItem);
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  isFavorite() {
    this.inFavorite = this.favoriteService.getFavoriteById(this.productItem.id) !== undefined;
  }

  addToCart() {
    if (this.authService.isAuthenticated()) {
      this.cartService.addToCart(this.productItem);
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  isInCart() {
    this.inCart = this.cartService.getCartItemById(this.productItem.id) !== undefined;
  }
}
