// // import { Component } from '@angular/core';

// // @Component({
// //   selector: 'app-categories',
// //   templateUrl: './categories.component.html',
// //   styleUrl: './categories.component.scss'
// // })
// // export class CategoriesComponent {

// // }
// import { Component, OnInit } from '@angular/core';
// import { CategoriesService } from '../service/categories.service'; 
// import { ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-categories',
//   templateUrl: './categories.component.html',
//   styleUrls: ['./categories.component.scss'],
// })
// export class CategoriesComponent implements OnInit {
//   // categories: string[] = [];

//   // constructor(private categoriesService: CategoriesService) {}

//   // ngOnInit(): void {
//   //   this.loadCategories();
//   // }

//   // private loadCategories(): void {
//   //   this.categoriesService.getCategories().subscribe({
//   //     next: (categories) => {
//   //       this.categories = categories;
//   //     },
//   //     error: (err) => {
//   //       console.error('Failed to load categories', err);
//   //     },
//   //   });
//   // }
//   category: string | null = null;
//   products: any[] = [];

//   constructor(
//     private route: ActivatedRoute,
//     private categoriesService: CategoriesService
//   ) {}

//   ngOnInit(): void {
//     this.route.paramMap.subscribe((params) => {
//       this.category = params.get('name');
//       if (this.category) {
//         this.fetchCategoryProducts(this.category);
//       }
//     });
//   }

//   private fetchCategoryProducts(category: string): void {
//     this.categoriesService.getProductsByCategory(category).subscribe({
//       next: (products) => {
//         this.products = products;
//       },
//       error: (err) => {
//         console.error('Failed to load category products', err);
//       },
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../service/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories: string[] = [];
  products: any[] = [];
  selectedCategory: string | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchCategories();

    // Get the category from route parameters if available
    this.route.paramMap.subscribe((params) => {
      const category = params.get('category');
      if (category) {
        this.selectedCategory = category;
        this.fetchProductsByCategory(category);
      }
    });
  }

  private fetchCategories(): void {
    this.categoriesService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (err) => {
        console.error('Failed to load categories', err);
        this.error = 'Failed to load categories';
      },
    });
  }

  private fetchProductsByCategory(category: string): void {
    this.loading = true;
    this.categoriesService.getProductsByCategory(category).subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load products', err);
        this.error = 'Failed to load products';
        this.loading = false;
      },
    });
  }

  onCategorySelect(category: string): void {
    this.router.navigate(['/categories', category]);
  }
}
