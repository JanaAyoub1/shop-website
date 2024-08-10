// import { Injectable } from '@angular/core';
// import {
//   HttpEvent,
//   HttpInterceptor,
//   HttpHandler,
//   HttpRequest,
//   HttpResponse,
// } from '@angular/common/http';
// import { Observable, tap } from 'rxjs';

// //for error handling shi header ma header
// @Injectable()
// export class LoggingInterceptor implements HttpInterceptor {
//   constructor() {}

//   intercept(
//     request: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     console.log('Outgoing HTTP request', request);
//     return next.handle(request).pipe(
//       tap((event: HttpEvent<any>) => {
//         console.log('Incoming HTTP response', event);
//       })
//     );
//   }
// }

import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    // 1. Retrieve JWT string from local storage
    const authToken = localStorage.getItem('authToken');

    // 2. If the JWT is not present, the request goes through the server unmodified
    if (!authToken) {
      return next.handle(req);
    }

    // 3. If the JWT is present, the HTTP headers are cloned, and an extra Authorization header is appended
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`),
    });

    // 4. Pass the modified request to the next interceptor or the HTTP client
    return next.handle(authReq);
  }
}

//interceptor error
//interecetor shi tene
//wen 3m 3yetla
