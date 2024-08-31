import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of, Subscription, BehaviorSubject } from 'rxjs';
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
import { CartService } from '../../../../features/cart/service/cart.service';
import { WishlistService } from '../../../../features/wishlist/service/wishlist.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  searchControl = new FormControl();
  searchResults: any[] = [];
  dropdownVisible = false;
  categoriesDropdownVisible = false;

  isLoggedIn$ = new BehaviorSubject<boolean>(false); // Observable for login status
  user$ = new BehaviorSubject<any>(null); // Observable for user information
  categories: string[] = [];
  cartItemsCount$ = new BehaviorSubject<number>(0); // Observable for cart items count
  wishlistItemsCount$ = new BehaviorSubject<number>(0); // Observable for wishlist items count

  private subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private searchService: SearchService,
    private productCategoryService: ProductCategoryService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private router: Router
  ) {}

  ngOnInit() {
    // Subscribe to authentication status and user info
    const authSubscription = this.authService.authStatus$.subscribe(
      (status) => {
        this.isLoggedIn$.next(status); // Update observable
        if (status) {
          // Subscribe to user info
          const userSubscription = this.authService.userInfo$.subscribe(
            (user) => {
              this.user$.next(user || null); // Update observable
            }
          );
          this.subscriptions.push(userSubscription);

          // Subscribe to cart and wishlist item counts
          const cartSubscription = this.cartService.cartItemCount$.subscribe(
            (count) => {
              this.cartItemsCount$.next(count); // Update observable
            }
          );
          const wishlistSubscription =
            this.wishlistService.wishlistItemCount$.subscribe((count) => {
              this.wishlistItemsCount$.next(count); // Update observable
            });

          this.subscriptions.push(cartSubscription, wishlistSubscription);
        } else {
          this.user$.next(null);
          this.cartItemsCount$.next(0); // Clear cart count when logged out
          this.wishlistItemsCount$.next(0); // Clear wishlist count when logged out
        }
      }
    );
    this.subscriptions.push(authSubscription);

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
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query) => this.search(query)),
        catchError(() => of([]))
      )
      .subscribe((results) => {
        this.searchResults = results;
      });
  }

  private search(query: string): Observable<any[]> {
    if (!query.trim()) {
      return of([]);
    }
    return this.searchService.search(query);
  }

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

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Navigate to the cart page
  goToCart() {
    this.router.navigate(['/cart']);
  }

  // Navigate to the wishlist page
  goToWishlist() {
    this.router.navigate(['/wishlist']);
  }

  ngOnDestroy() {
    // Unsubscribe from all subscriptions to prevent memory leaks
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
