import { Component, OnInit } from '@angular/core';
import {ProductItem} from "../../shared/interfaces";
import {Subscription} from "rxjs";
import {ProductsService} from "../../services/products.service";
import {ViewWillEnter, ViewWillLeave} from "@ionic/angular";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.page.html',
  styleUrls: ['./admin-page.page.scss'],
})
export class AdminPagePage implements OnInit, ViewWillLeave, ViewWillEnter {
  productsList: ProductItem[];
  prSubs: Subscription;
  isFetching = false;
  searchStr = '';
  highPrice = true;

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.isFetching = true;
    this.prSubs = this.productsService.getAllProducts().subscribe((items) => {
      this.productsList = items;
      this.isFetching = false;
    });
  }

  ionViewWillEnter() {
    this.isFetching = true;
    this.prSubs = this.productsService.getAllProducts().subscribe((items) => {
      this.productsList = items;
      this.isFetching = false;
    });
  }

  ionViewWillLeave() {
    if (this.prSubs) {
      this.prSubs.unsubscribe();
    }
  }

  sortByPrice() {
    this.highPrice = !this.highPrice;
    if (this.highPrice === false) {
      this.productsList.sort((a, b) => {
        return (a.price - b.price);
      })
    } else {
      this.productsList.sort((a, b) => {
        return (b.price - a.price);
      })
    }
  }
}
