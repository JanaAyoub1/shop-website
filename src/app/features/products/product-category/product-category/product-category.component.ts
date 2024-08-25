import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCategoryService } from '../service/product-category.service';
import { IProduct } from '../model/product-category.model';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss'],
})
export class ProductCategoryComponent implements OnInit {
  selectedCategory: string | null = null;
  products: IProduct[] = [];
  categories: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private productCategoryService: ProductCategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.selectedCategory = params.get('category');
      if (this.selectedCategory) {
        this.loadProductsByCategory(this.selectedCategory);
      }
      // else{
      //   this.loadCategories();
      // }
    });
  }

  // loadCategories(): void {
  //   this.productCategoryService.getAllCategories().subscribe({
  //     next: (categories) => {
  //       this.categories = categories;
  //     },
  //     error: (err) => {
  //       console.error('Error loading categories:', err);
  //     },
  //   });
  // }

  loadProductsByCategory(category: string): void {
    this.productCategoryService.getProductsByCategory(category).subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (err) => {
        console.error('Error loading products by category:', err);
      },
    });
  }
}
