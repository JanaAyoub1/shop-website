import { Component } from '@angular/core';
import { WishlistService } from '../service/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent {
  wishlistItems: any[] = [];

  constructor(private wishlistService: WishlistService) {
    this.loadWishlist();
  }

  loadWishlist() {
    this.wishlistItems = this.wishlistService.getWishlistItems();
  }

  removeFromWishlist(itemId: number) {
    this.wishlistService.removeFromWishlist(itemId);
    this.loadWishlist(); // Reload wishlist after removal
  }
}
