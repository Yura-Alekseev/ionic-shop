import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductItem, User} from "../shared/interfaces";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import * as firebase from "firebase";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  database = firebase.database();

  constructor(private http: HttpClient) { }

  deletePost(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.firebase.databaseURL}/products/${id}.json`);
  }

  createPost(post: ProductItem){
    firebase.database().ref('products/' + post.id).set({
      img: post.img,
      title: post.title,
      description: post.description,
      memory: post.memory,
      color: post.color,
      price: post.price,
      id: post.id
    });
  }
}
