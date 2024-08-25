import { Component, OnInit } from '@angular/core';
import { ProductListService } from '../../products/product-list/service/product-list.service';
import { IProduct } from '../../products/product-list/model/product-list.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products: IProduct[] = [];

  constructor(private productListService: ProductListService) {}

  ngOnInit(): void {
    this.loadAllProducts();
  }

  loadAllProducts(): void {
    this.productListService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (err) => {
        console.error('Error loading products:', err);
      },
    });
  }
}
