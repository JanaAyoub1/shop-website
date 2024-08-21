// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from '../../../../environments/environment.dev';

// @Injectable({
//   providedIn: 'root',
// })
// export class CategoriesService {
//   private apiUrl = environment.fakeStoreAPI;

//   constructor(private http: HttpClient) {}

//   // Method to fetch categories
//   getCategories(): Observable<string[]> {
//     return this.http.get<string[]>(
//       `${this.apiUrl}products/categories/${category}`
//     );
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.dev';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private apiUrl = environment.fakeStoreAPI;

  constructor(private http: HttpClient) {}

  // Fetch categories
  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}products/categories`);
  }

  // Fetch products by category
  getProductsByCategory(category: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}products/category/${category}`);
  }
}
