import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCategoryService } from '../service/product-category.service';
import { IProduct } from '../model/product-category.model';
import { CartService } from '../../../cart/service/cart.service';
import { WishlistService } from '../../../wishlist/service/wishlist.service';
import { AuthService } from '../../../../core/auth-guard/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss'],
})
export class ProductCategoryComponent implements OnInit {
  selectedCategory: string | null = null;
  products: IProduct[] = [];
  categories: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private productCategoryService: ProductCategoryService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.selectedCategory = params.get('category');
      if (this.selectedCategory) {
        this.loadProductsByCategory(this.selectedCategory);
      }
      // else{
      //   this.loadCategories();
      // }
    });
  }

  // loadCategories(): void {
  //   this.productCategoryService.getAllCategories().subscribe({
  //     next: (categories) => {
  //       this.categories = categories;
  //     },
  //     error: (err) => {
  //       console.error('Error loading categories:', err);
  //     },
  //   });
  // }

  loadProductsByCategory(category: string): void {
    this.productCategoryService.getProductsByCategory(category).subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (err) => {
        console.error('Error loading products by category:', err);
      },
    });
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
