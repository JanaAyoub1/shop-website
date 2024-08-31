import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../../core/auth-guard/auth.service';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private wishlistKeyBase = 'wishlist';
  private wishlistSubject = new BehaviorSubject<number>(0);
  wishlistItemCount$ = this.wishlistSubject.asObservable();
  private currentUserEmail: string | null = null;

  constructor(private authService: AuthService) {
    // Subscribe to authentication status and user info
    this.authService.authStatus$.subscribe((status) => {
      if (status) {
        this.authService.userInfo$.subscribe((user) => {
          this.currentUserEmail = user?.preferred_username; // Use preferred_username as the unique identifier
          this.updateWishlistCount(); // Update item count based on the logged-in user
        });
      } else {
        this.currentUserEmail = null;
        this.updateWishlistCount(); // Clear the count when not logged in
        this.clearWishlist();
      }
    });
  }

  private getWishlistKey(): string {
    return this.currentUserEmail
      ? `${this.wishlistKeyBase}${this.currentUserEmail}`
      : this.wishlistKeyBase;
  }

  // Get wishlist items from localStorage
  getWishlistItems(): any[] {
    const wishlist = localStorage.getItem(this.getWishlistKey());
    return wishlist ? JSON.parse(wishlist) : [];
  }

  // Add an item to the wishlist
  addToWishlist(item: any): void {
    if (!this.currentUserEmail) return; // No operation if no user is logged in

    const wishlist = this.getWishlistItems();
    if (!wishlist.find((existingItem) => existingItem.id === item.id)) {
      wishlist.push(item);
      localStorage.setItem(this.getWishlistKey(), JSON.stringify(wishlist));
      this.updateWishlistCount();
    }
  }

  // Remove an item from the wishlist
  removeFromWishlist(itemId: number): void {
    if (!this.currentUserEmail) return; // No operation if no user is logged in

    let wishlist = this.getWishlistItems();
    wishlist = wishlist.filter((item) => item.id !== itemId);
    localStorage.setItem(this.getWishlistKey(), JSON.stringify(wishlist));
    this.updateWishlistCount();
  }

  // Clear the entire wishlist
  clearWishlist(): void {
    localStorage.setItem(this.getWishlistKey(), JSON.stringify([]));
    this.updateWishlistCount(); // Notify subscribers of the updated count
  }

  // Get the number of items in the wishlist
  getWishlistItemCount(): number {
    if (!this.currentUserEmail) return 0; // No items if no user is logged in

    const wishlist = this.getWishlistItems();
    return wishlist.length;
  }

  // Update wishlist count and notify subscribers
  private updateWishlistCount(): void {
    const count = this.getWishlistItemCount();
    this.wishlistSubject.next(count);
  }
}
