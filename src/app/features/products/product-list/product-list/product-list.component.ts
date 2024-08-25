// import { Component } from '@angular/core';
// import { ProductListService } from '../service/product-list.service';
// import { IProduct } from '../model/product-list.model'

// @Component({
//   selector: 'app-product-list',
//   templateUrl: './product-list.component.html',
//   styleUrl: './product-list.component.scss',
// })
// export class ProductListComponent {
//   products: IProduct[] = [];

//   constructor(private productListService: ProductListService) {
//     this.productListService.getAllProducts().subscribe((products) => {
//       this.products = products;
//     });
//   }
// }


import { Component, OnInit } from '@angular/core';
import { ProductListService } from '../service/product-list.service';
import { IProduct } from '../model/product-list.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: IProduct[] = [];
  sortOrder: string = 'desc'; // Default sort order
  sortBy: string = 'price'; // Default sort by
  filters: any = {
    category: '',
    priceRange: '',
  };

  constructor(private productListService: ProductListService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productListService
      .getAllProducts(this.sortOrder, this.sortBy, this.filters)
      .subscribe({
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
      this.sortBy = target.value;
      this.loadProducts();
    }
  }

  onFilterChange(key: string, event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.filters[key] = target.value;
      this.loadProducts();
    }
  }
}
