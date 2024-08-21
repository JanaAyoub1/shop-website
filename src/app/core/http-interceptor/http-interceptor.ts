// // import { Injectable } from '@angular/core';
// // import {
// //   HttpEvent,
// //   HttpInterceptor,
// //   HttpHandler,
// //   HttpRequest,
// //   HttpResponse,
// // } from '@angular/common/http';
// // import { Observable, tap } from 'rxjs';

// // //for error handling shi header ma header
// // @Injectable()
// // export class LoggingInterceptor implements HttpInterceptor {
// //   constructor() {}

// //   intercept(
// //     request: HttpRequest<any>,
// //     next: HttpHandler
// //   ): Observable<HttpEvent<any>> {
// //     console.log('Outgoing HTTP request', request);
// //     return next.handle(request).pipe(
// //       tap((event: HttpEvent<any>) => {
// //         console.log('Incoming HTTP response', event);
// //       })
// //     );
// //   }
// // }

// import { Injectable } from '@angular/core';
// import {
//   HttpEvent,
//   HttpInterceptor,
//   HttpHandler,
//   HttpRequest,
// } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler,
//   ): Observable<HttpEvent<any>> {
//     // 1. Retrieve JWT string from local storage
//     const authToken = localStorage.getItem('authToken');

//     // 2. If the JWT is not present, the request goes through the server unmodified
//     if (!authToken) {
//       return next.handle(req);
//     }

//     // 3. If the JWT is present, the HTTP headers are cloned, and an extra Authorization header is appended
//     const authReq = req.clone({
//       headers: req.headers.set('Authorization', `Bearer ${authToken}`),
//     });

//     // 4. Pass the modified request to the next interceptor or the HTTP client
//     return next.handle(authReq);
//   }
// }

// //interceptor error
// //interecetor shi tene
// //wen 3m 3yetla

// import { Injectable } from '@angular/core';
// import {
//   HttpInterceptor,
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpErrorResponse,
// } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { Router } from '@angular/router';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   constructor(private router: Router) {}

//   intercept(
//     request: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     // Retrieve JWT from local storage
//     const token = localStorage.getItem('token');

//     // If the JWT is present, clone the request and add the Authorization header
//     if (token) {
//       request = request.clone({
//         setHeaders: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//     }

//     // Pass the request to the next handler
//     return next.handle(request).pipe(
//       catchError((error: HttpErrorResponse) => {
//         // Handle 401 Unauthorized errors
//         if (error.status === 401) {
//           // Token might be expired or invalid
//           // Optionally, you can clear the token and redirect to login
//           localStorage.removeItem('token');
//           this.router.navigate(['/login']);
//         }

//         // Handle other errors
//         return throwError(error);
//       })
//     );
//   }
// }


import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../auth-guard/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Retrieve the JWT from local storage
    const token = localStorage.getItem('authToken');

    // If the JWT is present, clone the request and add the Authorization header
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    // Pass the request to the next handler and handle potential errors
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle 401 Unauthorized errors
        if (error.status === 401) {
          // Token might be expired or invalid
          // Clear the token and redirect to login
          this.authService.logout(); // Clear token and navigate to login
        }

        // Handle 403 Forbidden errors (optional)
        if (error.status === 403) {
          // User is authenticated but does not have permission
          // Optionally, redirect to an unauthorized access page
          this.router.navigate(['/unauthorized']);
        }

        // Handle other errors
        return throwError(error);
      })
    );
  }
}
