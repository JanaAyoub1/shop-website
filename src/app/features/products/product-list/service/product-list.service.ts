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

  // Get all products with sorting using API parameters
  getAllProducts(
    sortOrder: string = 'desc' // Default to descending order
  ): Observable<IProduct[]> {
    // Create HttpParams object for sorting
    let params = new HttpParams().set('sort', sortOrder);

    // Make HTTP GET request to fetch products with sorting
    return this.http.get<IProduct[]>(`${this.apiUrl}products`, { params });
  }
}
