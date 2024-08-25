// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from '../../../../../environments/environment.dev';
// import { IProduct } from '../model/product-list.model';

// @Injectable({
//   providedIn: 'root',
// })
// export class ProductListService {
//   private apiUrl = environment.fakeStoreAPI;

//   constructor(private http: HttpClient) {}

//   // Get all products
//   getAllProducts(): Observable<IProduct[]> {
//     return this.http.get<IProduct[]>(`${this.apiUrl}products`);
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.dev';
import { IProduct } from '../model/product-list.model';

@Injectable({
  providedIn: 'root',
})
export class ProductListService {
  private apiUrl = environment.fakeStoreAPI;

  constructor(private http: HttpClient) {}

  // Get all products
  getAllProducts(
    sortOrder: string = 'desc',
    sortBy: string = 'price',
    filters?: any
  ): Observable<IProduct[]> {
    let params = new HttpParams().set('sort', sortOrder);

    // Sorting based on criteria like price or name
    if (sortBy) {
      params = params.set('sortBy', sortBy);
    }

    // Apply filtering based on available filters
    if (filters) {
      if (filters.category) {
        params = params.set('category', filters.category);
      }
      if (filters.priceRange) {
        params = params.set('priceRange', filters.priceRange);
      }
    }

    return this.http.get<IProduct[]>(`${this.apiUrl}products`, { params });
  }
}
