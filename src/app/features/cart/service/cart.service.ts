import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../../products/product-list/model/product-list.model';
import { AuthService } from '../../../core/auth-guard/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartKeyBase = 'cartItems';
  private cartItemCountSubject = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCountSubject.asObservable();
  private currentUserEmail: string | null = null;

  constructor(private authService: AuthService) {
    // Subscribe to authentication status and user info
    this.authService.authStatus$.subscribe((status) => {
      if (status) {
        this.authService.userInfo$.subscribe((user) => {
          this.currentUserEmail = user?.preferred_username; // Use preferred_username as the unique identifier
          this.updateCartItemCount(); // Update item count based on the logged-in user
        });
      } else {
        this.currentUserEmail = null;
        this.updateCartItemCount(); // Clear the count when not logged in
        this.clearCart();
      }
    });
  }

  private getCartKey(): string {
    return this.currentUserEmail
      ? `${this.cartKeyBase}${this.currentUserEmail}`
      : this.cartKeyBase;
  }

  // Get cart items from localStorage
  getCartItems(): IProduct[] {
    const cart = localStorage.getItem(this.getCartKey());
    return cart ? JSON.parse(cart) : [];
  }

  // Add an item to the cart
  addToCart(item: IProduct): void {
    if (!this.currentUserEmail) return; // No operation if no user is logged in

    const cartItems = this.getCartItems();
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      // If item already exists in the cart, increase the quantity
      existingItem.quantity =
        (existingItem.quantity || 1) + (item.quantity || 1);
    } else {
      // Otherwise, add the new item with the specified quantity
      item.quantity = item.quantity || 1;
      cartItems.push(item);
    }

    // Save updated cart items to localStorage
    localStorage.setItem(this.getCartKey(), JSON.stringify(cartItems));

    // Update the cached count and notify subscribers
    this.updateCartItemCount();
  }

  // Update item quantity in the cart
  updateCartItem(itemId: number, quantity: number): void {
    if (!this.currentUserEmail) return; // No operation if no user is logged in

    const cartItems = this.getCartItems();
    const item = cartItems.find((cartItem) => cartItem.id === itemId);

    if (item) {
      item.quantity = quantity;
      localStorage.setItem(this.getCartKey(), JSON.stringify(cartItems));

      // Update the cached count and notify subscribers
      this.updateCartItemCount();
    }
  }

  // Remove an item from the cart
  removeFromCart(itemId: number): void {
    if (!this.currentUserEmail) return; // No operation if no user is logged in

    const cartItems = this.getCartItems();
    const updatedCartItems = cartItems.filter(
      (cartItem) => cartItem.id !== itemId
    );

    localStorage.setItem(this.getCartKey(), JSON.stringify(updatedCartItems));

    // Update the cached count and notify subscribers
    this.updateCartItemCount();
  }

  // Clear the entire cart
  clearCart(): void {
    localStorage.setItem(this.getCartKey(), JSON.stringify([]));

    // Update the cached count and notify subscribers
    this.updateCartItemCount();
  }

  // Update the cached cart item count and notify subscribers
  private updateCartItemCount(): void {
    if (!this.currentUserEmail) {
      this.cartItemCountSubject.next(0); // No items if no user is logged in
      return;
    }
    const count = this.getCartItems().length;
    this.cartItemCountSubject.next(count);
  }

  // Get the number of items in the cart
  getCartItemCount(): number {
    return this.cartItemCountSubject.value;
  }
}
