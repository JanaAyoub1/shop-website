import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
import { CartService } from '../service/cart.service';
import { IProduct } from '../../products/product-list/model/product-list.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  public cartItems: IProduct[] = [];
  public isCartEmpty: boolean = true;

  constructor(
    public cartService: CartService,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartItems = this.cartService.getCartItems();
    this.isCartEmpty = this.cartItems.length === 0;
  }

  increaseQuantity(product: IProduct): void {
    this.cartService.updateCartItem(product.id, product.quantity + 1);
    this.loadCartItems();
    // this.snackBar.open('Quantity increased', 'Close', {
    //   duration: 2000,
    // });
  }

  decreaseQuantity(product: IProduct): void {
    if (product.quantity > 1) {
      this.cartService.updateCartItem(product.id, product.quantity - 1);
      this.loadCartItems();
      // this.snackBar.open('Quantity decreased', 'Close', {
      //   duration: 2000,
      // });
    }
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.loadCartItems();
    this.snackBar.open('Removed from Cart', 'Close', {
      duration: 2000,
    });
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.loadCartItems();
    this.snackBar.open('Cart cleared', 'Close', {
      duration: 2000,
    });
  }
}
