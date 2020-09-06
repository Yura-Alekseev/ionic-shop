import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NavController} from "@ionic/angular";
import {AuthService} from "../../auth/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ProductItem, User} from "../../shared/interfaces";
import {AdminService} from "../../services/admin.service";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
})
export class CreatePostPage implements OnInit {
  form: FormGroup;
  submitted = false;
  errorMessage: string;

  constructor(
      private navCtrl: NavController,
      private auth: AuthService,
      private router: Router,
      private route: ActivatedRoute,
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
    })
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
    this.form.reset();
    this.router.navigateByUrl('/admin-page');
  }

}
