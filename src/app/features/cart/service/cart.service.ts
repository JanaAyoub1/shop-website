import { Injectable } from '@angular/core';
import { IProduct } from '../../products/product-list/model/product-list.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartKey = 'cartItems';

  constructor() {}

  // Get cart items from localStorage
  getCartItems(): any[] {
    const cart = localStorage.getItem(this.cartKey);
    return cart ? JSON.parse(cart) : [];
  }

  // Add an item to the cart
  addToCart(item: IProduct): void {
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
    localStorage.setItem(this.cartKey, JSON.stringify(cartItems));
  }

  // Update item quantity in the cart
  updateCartItem(itemId: number, quantity: number): void {
    const cartItems = this.getCartItems();
    const item = cartItems.find((cartItem) => cartItem.id === itemId);

    if (item) {
      item.quantity = quantity;
      localStorage.setItem(this.cartKey, JSON.stringify(cartItems));
    }
  }

  // Remove an item from the cart
  removeFromCart(itemId: number): void {
    const cartItems = this.getCartItems();
    const updatedCartItems = cartItems.filter(
      (cartItem) => cartItem.id !== itemId
    );

    localStorage.setItem(this.cartKey, JSON.stringify(updatedCartItems));
  }

  // Clear the entire cart
  clearCart(): void {
    localStorage.removeItem(this.cartKey);
  }
}
