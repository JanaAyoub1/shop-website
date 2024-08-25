import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
import { ProductListService } from '../service/product-list.service';
import { IProduct } from '../model/product-list.model';
import { CartService } from '../../../cart/service/cart.service';
import { WishlistService } from '../../../wishlist/service/wishlist.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: IProduct[] = [];
  sortOrder: string = 'desc'; // Default sort order
  // sortBy: string = 'price'; // Default sort by
  // filters: any = {
  //   category: '',
  //   priceRange: '',
  // };

  constructor(
    private productListService: ProductListService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private snackBar: MatSnackBar // Inject MatSnackBar
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
      console.log(this.sortOrder)
      this.loadProducts();
    }
  }

  // onFilterChange(key: string, event: Event): void {
  //   const target = event.target as HTMLSelectElement;
  //   if (target) {
  //     this.filters[key] = target.value;
  //     this.loadProducts();
  //   }
  // }

  addToCart(product: IProduct): void {
    this.cartService.addToCart(product);
    this.snackBar.open('Added to Cart', 'Close', {
      duration: 2000,
    });
  }

  addToWishlist(product: IProduct): void {
    this.wishlistService.addToWishlist(product);
    this.snackBar.open('Added to Wishlist', 'Close', {
      duration: 2000,
    });
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
