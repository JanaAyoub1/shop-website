// // // // // import { Component } from '@angular/core';

// // // // // @Component({
// // // // //   selector: 'app-navbar',
// // // // //   templateUrl: './navbar.component.html',
// // // // //   styleUrl: './navbar.component.scss'
// // // // // })
// // // // // export class NavbarComponent {

// // // // // }

// // // // import { Component, OnInit } from '@angular/core';
// // // // import { FormControl } from '@angular/forms';
// // // // import { Observable, of } from 'rxjs';
// // // // import {
// // // //   debounceTime,
// // // //   distinctUntilChanged,
// // // //   switchMap,
// // // //   catchError,
// // // // } from 'rxjs/operators';
// // // // import { AuthService } from '../../../auth-guard/auth.service';
// // // // import { SearchService } from './search.service';
// // // // import { Router } from '@angular/router';

// // // // @Component({
// // // //   selector: 'app-navbar',
// // // //   templateUrl: './navbar.component.html',
// // // //   styleUrls: ['./navbar.component.scss'],
// // // // })
// // // // export class NavbarComponent implements OnInit {
// // // //   searchControl = new FormControl();
// // // //   searchResults: any[] = []; // Adjust type as needed
// // // //   dropdownVisible = false;
// // // //   isLoggedIn = false;
// // // //   user: any;

// // // //   constructor(
// // // //     private authService: AuthService,
// // // //     private searchService: SearchService,
// // // //     private router: Router
// // // //   ) {}

// // // //   ngOnInit() {
// // // //     // Handle authentication status
// // // //     this.isLoggedIn = this.authService.isLoggedIn();
// // // //     if (this.isLoggedIn) {
// // // //       this.user = this.authService.decodeToken();
// // // //     }

// // // //     // Handle search input
// // // //     this.searchControl.valueChanges
// // // //       .pipe(
// // // //         debounceTime(300), // Wait for 300ms pause in events
// // // //         distinctUntilChanged(), // Only emit when the current value is different from the last
// // // //         switchMap((query) => this.search(query)), // Switch to a new observable each time the query changes
// // // //         catchError(() => of([])) // Return an empty array on error
// // // //       )
// // // //       .subscribe((results) => {
// // // //         this.searchResults = results;
// // // //       });
// // // //   }

// // // //   private search(query: string): Observable<any[]> {
// // // //     if (!query.trim()) {
// // // //       return of([]); // Return an empty array if query is empty
// // // //     }
// // // //     return this.searchService.search(query); // Call the service to perform the search
// // // //   }

// // // //   toggleDropdown() {
// // // //     this.dropdownVisible = !this.dropdownVisible;
// // // //   }

// // // //   logout() {
// // // //     this.authService.logout();
// // // //     this.isLoggedIn = false;
// // // //     this.user = null;
// // // //     this.router.navigate(['/login']);
// // // //   }
// // // // }

// // // import { Component, OnInit } from '@angular/core';
// // // import { FormControl } from '@angular/forms';
// // // import { Observable, of } from 'rxjs';
// // // import {
// // //   debounceTime,
// // //   distinctUntilChanged,
// // //   switchMap,
// // //   catchError,
// // // } from 'rxjs/operators';
// // // import { AuthService } from '../../../auth-guard/auth.service';
// // // import { SearchService } from './search.service';
// // // import { Router } from '@angular/router';

// // // @Component({
// // //   selector: 'app-navbar',
// // //   templateUrl: './navbar.component.html',
// // //   styleUrls: ['./navbar.component.scss'],
// // // })
// // // export class NavbarComponent implements OnInit {
// // //   searchControl = new FormControl();
// // //   searchResults: any[] = [];
// // //   dropdownVisible = false;
// // //   isLoggedIn = false;
// // //   user: any;

// // //   constructor(
// // //     private authService: AuthService,
// // //     private searchService: SearchService,
// // //     private router: Router
// // //   ) {}

// // //   ngOnInit() {
// // //     // Subscribe to authentication status changes
// // //     this.authService.authStatus$.subscribe((status: boolean) => {
// // //       this.isLoggedIn = status;
// // //       if (this.isLoggedIn) {
// // //         this.user = this.authService.decodeToken(); // Update user data if logged in
// // //       } else {
// // //         this.user = null; // Clear user data if logged out
// // //       }
// // //     });

// // //     // Handle search input
// // //     this.searchControl.valueChanges
// // //       .pipe(
// // //         debounceTime(300),
// // //         distinctUntilChanged(),
// // //         switchMap((query) => this.search(query)),
// // //         catchError(() => of([]))
// // //       )
// // //       .subscribe((results) => {
// // //         this.searchResults = results;
// // //       });
// // //   }

// // //   private search(query: string): Observable<any[]> {
// // //     if (!query.trim()) {
// // //       return of([]);
// // //     }
// // //     return this.searchService.search(query);
// // //   }

// // //   toggleDropdown() {
// // //     this.dropdownVisible = !this.dropdownVisible;
// // //   }

// // //   logout() {
// // //     this.authService.logout();
// // //     this.isLoggedIn = false;
// // //     this.user = null;
// // //     this.router.navigate(['/login']);
// // //   }
// // // }

// // import { Component, OnInit } from '@angular/core';
// // import { FormControl } from '@angular/forms';
// // import { Observable, of } from 'rxjs';
// // import {
// //   debounceTime,
// //   distinctUntilChanged,
// //   switchMap,
// //   catchError,
// // } from 'rxjs/operators';
// // import { AuthService } from '../../../auth-guard/auth.service';
// // import { SearchService } from './search.service';
// // import { Router } from '@angular/router';
// // import { CategoriesService } from '../../../../features/categories/service/categories.service';

// // @Component({
// //   selector: 'app-navbar',
// //   templateUrl: './navbar.component.html',
// //   styleUrls: ['./navbar.component.scss'],
// // })
// // export class NavbarComponent implements OnInit {
// //   searchControl = new FormControl();
// //   searchResults: any[] = [];
// //   dropdownVisible = false;
// //   isLoggedIn = false;
// //   user: any;

// //   constructor(
// //     private authService: AuthService,
// //     private searchService: SearchService,
// //     private categoriesService: CategoriesService,
// //     private router: Router
// //   ) {}

// //   ngOnInit() {
// //     // Subscribe to authentication status and user info
// //     this.authService.authStatus$.subscribe((status) => {
// //       this.isLoggedIn = status;
// //       if (this.isLoggedIn) {
// //         this.authService.userInfo$.subscribe((user) => {
// //           this.user = user;
// //         });
// //       } else {
// //         this.user = null;
// //       }
// //     });

// //     // Fetch categories
// //     this.categoriesService.getCategories().subscribe({
// //       next: (categories) => {
// //         this.categories = categories;
// //       },
// //       error: (err) => {
// //         console.error('Failed to load categories', err);
// //       },
// //     });

// //     // Handle search input
// //     this.searchControl.valueChanges
// //       .pipe(
// //         debounceTime(300),
// //         distinctUntilChanged(),
// //         switchMap((query) => this.search(query)),
// //         catchError(() => of([]))
// //       )
// //       .subscribe((results) => {
// //         this.searchResults = results;
// //       });
// //   }

// //   private search(query: string): Observable<any[]> {
// //     if (!query.trim()) {
// //       return of([]);
// //     }
// //     return this.searchService.search(query);
// //   }

// //   toggleDropdown() {
// //     this.dropdownVisible = !this.dropdownVisible;
// //   }

// //   logout() {
// //     this.authService.logout();
// //     this.router.navigate(['/login']);
// //   }
// // }

// import { Component, OnInit } from '@angular/core';
// import { FormControl } from '@angular/forms';
// import { Observable, of } from 'rxjs';
// import {
//   debounceTime,
//   distinctUntilChanged,
//   switchMap,
//   catchError,
// } from 'rxjs/operators';
// import { AuthService } from '../../../auth-guard/auth.service';
// import { SearchService } from './search.service';
// import { Router } from '@angular/router';
// import { CategoriesService } from '../../../../features/categories/service/categories.service';

// @Component({
//   selector: 'app-navbar',
//   templateUrl: './navbar.component.html',
//   styleUrls: ['./navbar.component.scss'],
// })
// export class NavbarComponent implements OnInit {
//   searchControl = new FormControl();
//   searchResults: any[] = [];
//   dropdownVisible = false;
//   categoriesDropdownVisible = false; // Track visibility of categories dropdown
//   isLoggedIn = false;
//   user: any;
//   categories: string[] = []; // Categories array

//   constructor(
//     private authService: AuthService,
//     private searchService: SearchService,
//     private categoriesService: CategoriesService,
//     private router: Router
//   ) {}

//   ngOnInit() {
//     // Subscribe to authentication status and user info
//     this.authService.authStatus$.subscribe((status) => {
//       this.isLoggedIn = status;
//       if (this.isLoggedIn) {
//         this.authService.userInfo$.subscribe((user) => {
//           this.user = user;
//         });
//       } else {
//         this.user = null;
//       }
//     });

//     // Fetch categories
//     this.categoriesService.getCategories().subscribe({
//       next: (categories) => {
//         this.categories = categories;
//       },
//       error: (err) => {
//         console.error('Failed to load categories', err);
//       },
//     });

//     // Handle search input
//     this.searchControl.valueChanges
//       .pipe(
//         debounceTime(300),
//         distinctUntilChanged(),
//         switchMap((query) => this.search(query)),
//         catchError(() => of([]))
//       )
//       .subscribe((results) => {
//         this.searchResults = results;
//       });
//   }

//   private search(query: string): Observable<any[]> {
//     if (!query.trim()) {
//       return of([]);
//     }
//     return this.searchService.search(query);
//   }

//   toggleDropdown() {
//     this.dropdownVisible = !this.dropdownVisible;
//   }

//   toggleCategoriesDropdown() {
//     this.categoriesDropdownVisible = !this.categoriesDropdownVisible;
//   }

//   logout() {
//     this.authService.logout();
//     this.router.navigate(['/login']);
//   }
// }

// import { Component, OnInit } from '@angular/core';
// import { FormControl } from '@angular/forms';
// import { Observable, of } from 'rxjs';
// import {
//   debounceTime,
//   distinctUntilChanged,
//   switchMap,
//   catchError,
// } from 'rxjs/operators';
// import { AuthService } from '../../../auth-guard/auth.service';
// import { SearchService } from './search.service';
// import { Router } from '@angular/router';
// import { CategoriesService } from '../../../../features/categories/service/categories.service';

// @Component({
//   selector: 'app-navbar',
//   templateUrl: './navbar.component.html',
//   styleUrls: ['./navbar.component.scss'],
// })
// export class NavbarComponent implements OnInit {
//   searchControl = new FormControl();
//   searchResults: any[] = [];
//   dropdownVisible = false;
//   categoriesDropdownVisible = false;
//   categories: string[] = [];
//   isLoggedIn = false;
//   user: any;

//   constructor(
//     private authService: AuthService,
//     private searchService: SearchService,
//     private categoriesService: CategoriesService,
//     private router: Router
//   ) {}

//   ngOnInit() {
//     // Subscribe to authentication status and user info
//     this.authService.authStatus$.subscribe((status) => {
//       this.isLoggedIn = status;
//       if (this.isLoggedIn) {
//         this.authService.userInfo$.subscribe((user) => {
//           this.user = user;
//         });
//       } else {
//         this.user = null;
//       }
//     });

//     // Fetch categories
//     this.categoriesService.getCategories().subscribe({
//       next: (categories) => {
//         this.categories = categories;
//       },
//       error: (err) => {
//         console.error('Failed to load categories', err);
//       },
//     });

//     // Handle search input
//     this.searchControl.valueChanges
//       .pipe(
//         debounceTime(300),
//         distinctUntilChanged(),
//         switchMap((query) => this.search(query)),
//         catchError(() => of([]))
//       )
//       .subscribe((results) => {
//         this.searchResults = results;
//       });
//   }

//   private search(query: string): Observable<any[]> {
//     if (!query.trim()) {
//       return of([]);
//     }
//     return this.searchService.search(query);
//   }

//   toggleDropdown() {
//     this.dropdownVisible = !this.dropdownVisible;
//   }

//   toggleCategoriesDropdown() {
//     this.categoriesDropdownVisible = !this.categoriesDropdownVisible;
//   }

//   onCategorySelect(category: string) {
//     this.router.navigate(['/category', category]);
//     this.categoriesDropdownVisible = false;
//   }

//   logout() {
//     this.authService.logout();
//     this.router.navigate(['/login']);
//   }
// }

// import { Component, OnInit } from '@angular/core';
// import { FormControl } from '@angular/forms';
// import { Observable, of } from 'rxjs';
// import {
//   debounceTime,
//   distinctUntilChanged,
//   switchMap,
//   catchError,
// } from 'rxjs/operators';
// import { AuthService } from '../../../auth-guard/auth.service';
// import { SearchService } from './search.service';
// import { Router } from '@angular/router';
// import { ProductCategoryService } from '../../../../features/products/product-category/service/product-category.service';

// @Component({
//   selector: 'app-navbar',
//   templateUrl: './navbar.component.html',
//   styleUrls: ['./navbar.component.scss'],
// })
// export class NavbarComponent implements OnInit {
//   searchControl = new FormControl();
//   searchResults: any[] = [];
//   dropdownVisible = false;
//   categoriesDropdownVisible = false;
//   isLoggedIn = false;
//   user: any;
//   categories: string[] = [];

//   constructor(
//     private authService: AuthService,
//     private searchService: SearchService,
//     private productCategoryService: ProductCategoryService,
//     private router: Router
//   ) {}

//   ngOnInit() {
//     // Subscribe to authentication status and user info
//     this.authService.authStatus$.subscribe((status) => {
//       this.isLoggedIn = status;
//       if (this.isLoggedIn) {
//         this.authService.userInfo$.subscribe((user) => {
//           this.user = user;
//         });
//       } else {
//         this.user = null;
//       }
//     });

//     // Fetch categories
//     this.productCategoryService.getAllCategories().subscribe({
//       next: (categories: string[]) => {
//         this.categories = categories;
//       },
//       error: (err) => {
//         console.error('Failed to load categories', err);
//       },
//     });

//     // Handle search input
//     this.searchControl.valueChanges
//       .pipe(
//         debounceTime(300),
//         distinctUntilChanged(),
//         switchMap((query) => this.search(query)),
//         catchError(() => of([]))
//       )
//       .subscribe((results) => {
//         this.searchResults = results;
//       });
//   }

//   private search(query: string): Observable<any[]> {
//     if (!query.trim()) {
//       return of([]);
//     }
//     return this.searchService.search(query);
//   }

//   toggleDropdown() {
//     this.dropdownVisible = !this.dropdownVisible;
//     // console.log('Dropdown visibility:', this.dropdownVisible);
//   }

//   toggleCategoriesDropdown() {
//     this.categoriesDropdownVisible = !this.categoriesDropdownVisible;
//   }

//   // onCategorySelect(category: string) {
//   //   // this.router.navigate(['/categories', category]);
//   //   this.router.navigate(['/products/category', category]);
//   //   this.categoriesDropdownVisible = false; // Hide the dropdown after selection
//   // }

//   onCategorySelect(category: string): void {
//     //this.router.navigate(['/categories', category.name]);
//     this.router.navigate(['/products/category', category]);
//     this.categoriesDropdownVisible = false; // Hide the dropdown after selection
//   }

//   logout() {
//     this.authService.logout();
//     this.router.navigate(['/login']);
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  catchError,
} from 'rxjs/operators';
import { AuthService } from '../../../auth-guard/auth.service';
import { SearchService } from './search.service';
import { Router } from '@angular/router';
import { ProductCategoryService } from '../../../../features/products/product-category/service/product-category.service';
// import { CartService } from '../../../../features/cart/service/cart.service'; // Import cart service

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  searchControl = new FormControl();
  searchResults: any[] = [];
  dropdownVisible = false;
  categoriesDropdownVisible = false;
  isLoggedIn = false;
  user: any;
  categories: string[] = [];
  cartItemsCount = 0; // Track the number of items in the cart

  constructor(
    private authService: AuthService,
    private searchService: SearchService,
    private productCategoryService: ProductCategoryService,
    // private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    // Subscribe to authentication status and user info
    this.authService.authStatus$.subscribe((status) => {
      this.isLoggedIn = status;
      if (this.isLoggedIn) {
        this.authService.userInfo$.subscribe((user) => {
          this.user = user;
        });
      } else {
        this.user = null;
      }
    });

    // Fetch categories
    this.productCategoryService.getAllCategories().subscribe({
      next: (categories: string[]) => {
        this.categories = categories;
      },
      error: (err) => {
        console.error('Failed to load categories', err);
      },
    });

    // Handle search input
    // this.searchControl.valueChanges
    //   .pipe(
    //     debounceTime(300),
    //     distinctUntilChanged(),
    //     switchMap((query) => this.search(query)),
    //     catchError(() => of([]))
    //   )
    //   .subscribe((results) => {
    //     this.searchResults = results;
    //   });

    // Fetch the cart items count
    // this.cartService.getCartItems().subscribe((items) => {
    //   this.cartItemsCount = items.length;
    // });
  }

  // private search(query: string): Observable<any[]> {
  //   if (!query.trim()) {
  //     return of([]);
  //   }
  //   return this.searchService.search(query);
  // }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  toggleCategoriesDropdown() {
    this.categoriesDropdownVisible = !this.categoriesDropdownVisible;
  }

  onCategorySelect(category: string): void {
    this.router.navigate(['/products/category', category]);
    this.categoriesDropdownVisible = false;
  }

  // logout() {
  //   this.authService.logout();
  //   this.router.navigate(['/login']);
  // }

  // Navigate to the cart page
  goToCart() {
    this.router.navigate(['/cart']);
  }

  // Navigate to the wishlist page
  goToWishlist() {
    this.router.navigate(['/wishlist']);
  }
}
