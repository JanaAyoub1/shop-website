// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-product-list',
//   templateUrl: './product-list.component.html',
//   styleUrl: './product-list.component.scss'
// })
// export class ProductListComponent {

// }

import { Component } from '@angular/core';
import { ProductListService, Product } from '../service/product-list.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  products: Product[] = [];

  constructor(private productListService: ProductListService) {
    this.productListService.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }
}
