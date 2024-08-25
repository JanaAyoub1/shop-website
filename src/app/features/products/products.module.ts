// // src/app/products/products.module.ts
// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';

// import { ProductDetailComponent } from './product-detail/product-detail/product-detail.component';
// import { ProductListComponent } from './product-list/product-list/product-list.component';

// @NgModule({
//   declarations: [
//     //ProductDetailComponent, ProductListComponent
//     ],
//   imports: [
//     CommonModule,
//     RouterModule, 
//   ],
// })
// export class ProductsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductDetailComponent } from './product-detail/product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list/product-list.component';
import { ProductCategoryComponent } from './product-category/product-category/product-category.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductCategoryComponent,
  ],
  imports: [CommonModule, ProductsRoutingModule],
  exports: [
    ProductListComponent,
    ProductDetailComponent,
    ProductCategoryComponent,
  ],
})
export class ProductsModule {}
