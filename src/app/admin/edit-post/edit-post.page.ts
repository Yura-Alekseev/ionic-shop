import { Component, OnInit } from '@angular/core';
import {ProductItem} from "../../shared/interfaces";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {NavController, ViewWillEnter, ViewWillLeave} from "@ionic/angular";
import {ProductsService} from "../../services/products.service";
import {AdminService} from "../../services/admin.service";
import {switchMap} from "rxjs/operators";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.page.html',
  styleUrls: ['./edit-post.page.scss'],
})
export class EditPostPage implements OnInit, ViewWillEnter, ViewWillLeave {
  productItem: ProductItem;
  prSubs: Subscription;
  isFetching = false;
  form: FormGroup;
  submitted = false;
  errorMessage: string;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private navCtrl: NavController,
      private productsService: ProductsService,
      private adminService: AdminService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params.loginAgain) {
        this.errorMessage = 'Please sign in';
      }
    });

    this.form = new FormGroup({
      img: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      color: new FormControl('', [Validators.required]),
      memory: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      id: new FormControl('', [Validators.required]),
    });

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

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const post: ProductItem = {
      img: this.form.value.img,
      price: this.form.value.price,
      title: this.form.value.title,
      description: this.form.value.description,
      color: this.form.value.color,
      memory: this.form.value.memory,
      id: this.form.value.id,
    };

    this.adminService.createPost(post);
    this.submitted = false;
    this.form.reset();
    this.router.navigateByUrl('/admin-page/' + this.productItem.id);
  }
}
