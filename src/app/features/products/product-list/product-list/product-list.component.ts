import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductListService } from '../service/product-list.service';
import { IProduct } from '../model/product-list.model';
import { CartService } from '../../../cart/service/cart.service';
import { WishlistService } from '../../../wishlist/service/wishlist.service';
import { AuthService } from '../../../../core/auth-guard/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: IProduct[] = [];
  sortOrder: string = 'desc'; // Default sort order

  constructor(
    private productListService: ProductListService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productListService.getAllProducts(this.sortOrder).subscribe({
      next: (products: IProduct[]) => {
        this.products = products;
      },
      error: (err) => {
        console.error('Failed to load products', err);
      },
    });
  }

  onSortChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.sortOrder = target.value;
      console.log(this.sortOrder);
      this.loadProducts();
    }
  }

  addToCart(product: IProduct): void {
    if (this.authService.isLoggedIn()) {
      this.cartService.addToCart(product);
      this.snackBar.open('Added to Cart', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
      });
    } else {
      this.snackBar.open(
        'You need to log in to add items to the cart.',
        'Close',
        {
          duration: 3000,
          verticalPosition: 'top',
        }
      );
      this.router.navigate(['/login']);
    }
  }

  addToWishlist(product: IProduct): void {
    if (this.authService.isLoggedIn()) {
      this.wishlistService.addToWishlist(product);
      this.snackBar.open('Added to Wishlist', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
      });
    } else {
      this.snackBar.open(
        'You need to log in to add items to the wishlist.',
        'Close',
        {
          duration: 3000,
          verticalPosition: 'top',
        }
      );
      this.router.navigate(['/login']);
    }
  }

  increaseQuantity(product: IProduct): void {
    product.quantity = (product.quantity || 1) + 1;
  }

  decreaseQuantity(product: IProduct): void {
    if (product.quantity > 1) {
      product.quantity -= 1;
    }
  }
}
