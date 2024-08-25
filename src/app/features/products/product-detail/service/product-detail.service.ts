import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.dev';
import { IProduct } from '../model/product-detail.model';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailService {
  private apiUrl = environment.fakeStoreAPI;

  constructor(private http: HttpClient) {}

  // Method to get a single product by ID
  getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.apiUrl}products/${id}`);
  }

  // Method to get products by category
  getProductsByCategory(category: string): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(
      `${this.apiUrl}products/category/${category}`
    );
  }
}
