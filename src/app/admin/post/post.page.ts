import { Component, OnInit } from '@angular/core';
import {ProductItem} from "../../shared/interfaces";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {NavController, ViewWillEnter, ViewWillLeave} from "@ionic/angular";
import {ProductsService} from "../../services/products.service";
import {switchMap} from "rxjs/operators";
import {AdminService} from "../../services/admin.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit, ViewWillEnter, ViewWillLeave {
  productItem: ProductItem;
  prSubs: Subscription;
  isFetching = false;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private navCtrl: NavController,
      private productsService: ProductsService,
      private adminService: AdminService
  ) { }

  ngOnInit() {
    this.isFetching = true;
    this.route.params.pipe(
        switchMap((params: Params) => {
          return this.productsService.getItemById(params['id'])
        })
    ).subscribe((item: ProductItem) => {
      this.productItem = item;
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
      this.isFetching = false;
    });
  }

  ionViewWillLeave() {
    if (this.prSubs) {
      this.prSubs.unsubscribe();
    }
  }

  /*deletePost() {
    this.adminService.deletePost(this.productItem.id).subscribe(() => {
      this.router.navigateByUrl('/admin-page');
    });
  }*/

  deletePost() {
    this.adminService.deletePost(this.productItem.id);
    this.router.navigateByUrl('/admin-page');
  }
}
