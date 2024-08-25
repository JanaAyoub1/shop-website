import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.dev';
import { IProduct } from '../model/product-category.model';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs'; 


@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService {
  private apiUrl = environment.fakeStoreAPI;

  constructor(private http: HttpClient) {}

  // Get all categories
  // getCategories(): Observable<string[]> {
  //   return this.http.get<string[]>(`${this.apiUrl}products/categories`);
  // }

  // product-category.service.ts
  getAllCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}products/categories`).pipe(
      catchError((error) => {
        console.error('Failed to load categories', error);
        return of([]); // Return an empty array or handle the error appropriately
      })
    );
  }

  // Get products by category
  getProductsByCategory(category: string): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(
      `${this.apiUrl}products/category/${category}`
    );
  }
}
