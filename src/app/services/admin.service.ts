import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductItem} from "../shared/interfaces";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import * as firebase from "firebase";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  database = firebase.database();

  constructor(private http: HttpClient) { }

  /*deletePost(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.firebase.databaseURL}/products/${id}.json`);
  }*/

  deletePost(id: string) {
    firebase.database().ref('products/' + id).remove();
  }

  updatePost(post: ProductItem){
    firebase.database().ref('products/' + post.id).update({
      img: post.img,
      title: post.title,
      description: post.description,
      memory: post.memory,
      color: post.color,
      price: post.price,
      id: post.id
    });
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
