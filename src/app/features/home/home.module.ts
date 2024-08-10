import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from '../products/product-list/product-list/product-list.component';
import { ProductListService } from '../products/product-list/service/product-list.service';


@NgModule({
  declarations: [HomeComponent, ProductListComponent],
  imports: [CommonModule, HomeRoutingModule],
  providers: [ProductListService],
})
export class HomeModule {}
