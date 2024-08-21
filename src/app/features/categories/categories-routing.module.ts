import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from "./categories/categories.component"

const routes: Routes = [
 { path: '', component: CategoriesComponent }, // Route to show all categories
  { path: ':category', component: CategoriesComponent } // Route for specific category details
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
