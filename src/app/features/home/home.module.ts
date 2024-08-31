import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { ProductListService } from '../products/product-list/service/product-list.service';
import { ProductsModule } from '../products/products.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, ProductsModule],
  providers: [ProductListService],
})
export class HomeModule {}
