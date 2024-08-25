import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private wishlistKey = 'wishlist';

  getWishlistItems(): any[] {
    const wishlist = localStorage.getItem(this.wishlistKey);
    return wishlist ? JSON.parse(wishlist) : [];
  }

  addToWishlist(item: any): void {
    const wishlist = this.getWishlistItems();
    wishlist.push(item);
    localStorage.setItem(this.wishlistKey, JSON.stringify(wishlist));
  }

  removeFromWishlist(itemId: number): void {
    let wishlist = this.getWishlistItems();
    wishlist = wishlist.filter((item) => item.id !== itemId);
    localStorage.setItem(this.wishlistKey, JSON.stringify(wishlist));
  }
}
