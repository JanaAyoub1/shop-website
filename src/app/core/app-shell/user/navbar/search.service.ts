// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class SearchService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.dev';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private apiUrl = environment.fakeStoreAPI;

  constructor(private http: HttpClient) {}

  search(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?query=${query}`);
  }
}
