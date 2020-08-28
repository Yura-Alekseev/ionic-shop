import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {ProductItem} from "../shared/interfaces";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<ProductItem[]> {
    return this.http.get(`${environment.fbDbUrl}/products.json`)
        .pipe(
            map((response: {[key: string]: any}) => {
              return Object.keys(response)
                  .map(key => ({
                    ...response[key]
                  }));
            })
        );
  }

  getItemById(id: string): Observable<ProductItem> {
      return this.http.get(`${environment.fbDbUrl}/products/${id}.json`)
          .pipe(
              map((item: ProductItem) => {
              return {
                  ...item,
                  id: item.id
              };
          }))
  }
}
