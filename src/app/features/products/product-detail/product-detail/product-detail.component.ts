// // import { Component, OnInit } from '@angular/core';
// // import { ActivatedRoute } from '@angular/router';
// // import {
// //   ProductDetailService,
// // } from '../service/product-detail.service';

// // import { IProduct } from '../model/product-detail.model'

// // @Component({
// //   selector: 'app-product-detail',
// //   templateUrl: './product-detail.component.html',
// //   styleUrls: ['./product-detail.component.css'],
// // })
// // export class ProductDetailComponent implements OnInit {
// //   product: IProduct | undefined;

// //   constructor(
// //     private route: ActivatedRoute,
// //     private productDetailService: ProductDetailService
// //   ) {}

// //   ngOnInit(): void {
// //     // Get the product ID from the route
// //     const productId = +this.route.snapshot.paramMap.get('id')!;

// //     // Fetch the product details using the service
// //     this.productDetailService.getProductById(productId).subscribe(
// //       (productData: IProduct) => {
// //         this.product = productData; // Set the product to the returned data
// //       },
// //       (error) => {
// //         console.error('Error fetching product details:', error);
// //       }
// //     );
// //   }
// // }

// // import { Component, OnInit } from '@angular/core';
// // import { ActivatedRoute } from '@angular/router';
// // import { ProductDetailService } from '../service/product-detail.service';
// // import { IProduct } from '../model/product-detail.model';

// // @Component({
// //   selector: 'app-product-detail',
// //   templateUrl: './product-detail.component.html',
// //   styleUrls: ['./product-detail.component.css'],
// // })
// // export class ProductDetailComponent implements OnInit {
// //   product: IProduct | undefined;
// //   similarProducts: IProduct[] = [];

// //   constructor(
// //     private route: ActivatedRoute,
// //     private productDetailService: ProductDetailService
// //   ) {}

// //   ngOnInit(): void {
// //     // Get product ID from the route
// //     const productId = +this.route.snapshot.paramMap.get('id')!;

// //     // Fetch the product by its ID
// //     this.productDetailService.getProductById(productId).subscribe(
// //       (product) => {
// //         this.product = product;

// //         // Load similar products by category
// //         this.loadSimilarProducts(product.category);
// //       },
// //       (error) => {
// //         console.error('Error fetching product:', error);
// //       }
// //     );
// //   }

// //   // Load similar products based on the product's category
// //   loadSimilarProducts(category: string): void {
// //     this.productDetailService.getProductsByCategory(category).subscribe(
// //       (products) => {
// //         // Exclude the current product from the list of similar products
// //         this.similarProducts = products.filter(
// //           (p) => p.id !== this.product?.id
// //         );
// //       },
// //       (error) => {
// //         console.error('Error fetching similar products:', error);
// //       }
// //     );
// //   }
// // }

// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { ProductDetailService } from '../service/product-detail.service';
// import { IProduct } from '../model/product-detail.model';


// @Component({
//   selector: 'app-product-detail',
//   templateUrl: './product-detail.component.html',
//   styleUrls: ['./product-detail.component.scss'],
// })

// export class ProductDetailComponent implements OnInit {
//   product: IProduct | undefined;
//   similarProducts: IProduct[] = [];

//   constructor(
//     private route: ActivatedRoute,
//     private productDetailService: ProductDetailService
//   ) {}

//   ngOnInit(): void {
//     const productId = +this.route.snapshot.paramMap.get('id')!;
//     this.productDetailService.getProductById(productId).subscribe(
//       (product) => {
//         this.product = product;
//         this.loadSimilarProducts(product.category);
//       },
//       (error) => {
//         console.error('Error fetching product:', error);
//       }
//     );
//   }

//   loadSimilarProducts(category: string): void {
//     this.productDetailService.getProductsByCategory(category).subscribe(
//       (products) => {
//         this.similarProducts = products.filter(
//           (p) => p.id !== this.product?.id
//         );
//       },
//       (error) => {
//         console.error('Error fetching similar products:', error);
//       }
//     );
//   }
// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailService } from '../service/product-detail.service';
import { IProduct } from '../model/product-detail.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product: IProduct | null = null;
  similarProducts: IProduct[] = [];

  constructor(
    private route: ActivatedRoute,
    private productDetailService: ProductDetailService
  ) {}

  ngOnInit(): void {
    const productId = +this.route.snapshot.paramMap.get('id')!;

    this.productDetailService.getProductById(productId).subscribe({
      next: (product) => {
        this.product = product;
        if (this.product && this.product.category) {
          this.loadSimilarProducts(this.product.category);
        } else {
          // Handle the case where product or its category is null
          console.error('Product or product category is null.');
        }
      },
      error: (err) => {
        console.error('Error fetching product:', err);
        // Handle error here (e.g., show a user-friendly message)
      },
    });
  }

  loadSimilarProducts(category: string): void {
    this.productDetailService.getProductsByCategory(category).subscribe({
      next: (products) => {
        this.similarProducts = products.filter(
          (p) => p.id !== this.product?.id
        ); // Exclude the current product
      },
      error: (err) => {
        console.error('Error fetching similar products:', err);
        // Handle error here (e.g., show a user-friendly message)
      },
    });
  }
}
