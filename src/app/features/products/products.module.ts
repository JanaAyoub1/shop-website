import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsRoutingModule } from './products-routing.module';
// import { ProductListComponent } from './product-list/product-list/product-list.component';
import { ProductListService } from './product-list/service/product-list.service';

@NgModule({
  // declarations: [ProductListComponent],
  imports: [CommonModule, ProductsRoutingModule, ReactiveFormsModule],
  providers: [ProductListService],
})
export class ProductsModule {}
