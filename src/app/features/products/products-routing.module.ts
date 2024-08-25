import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail/product-detail.component';
import { ProductCategoryComponent } from './product-category/product-category/product-category.component';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: ':id', component: ProductDetailComponent },
  { path: 'category/:category', component: ProductCategoryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
