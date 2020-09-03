import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {ProductItem} from "../../shared/interfaces";
import {Subscription} from "rxjs";
import {ViewWillLeave} from "@ionic/angular";

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit, ViewWillLeave {
  productsList: ProductItem[];
  prSubs: Subscription;
  isFetching = false;
  searchStr = '';

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
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
}
