import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../app/core/auth-guard/auth.guard';
import { LoginGuard } from './core/auth-guard/login.guard';

// add canActivate: [AuthGuard] for dashboard

const routes: Routes = [
  {
    path: 'home',
    // canActivate: [LoginGuard],
    loadChildren: () =>
      import('../app/features/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'login',
    canActivate: [LoginGuard],
    loadChildren: () =>
      import('../app/core/auth/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('../app/features/products/products.module').then(
        (m) => m.ProductsModule
      ),
  },
  {
    path: 'products/:id',
    loadChildren: () =>
      import('../app/features/products/products.module').then(
        (m) => m.ProductsModule
      ),
  },
  {
    path: 'category/:category',
    loadChildren: () =>
      import('../app/features/products/products.module').then(
        (m) => m.ProductsModule
      ),
  },
  {
    path: 'signup',
    canActivate: [LoginGuard],
    loadChildren: () =>
      import('../app/core/auth/signup/signup.module').then(
        (m) => m.SignupModule
      ),
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/home', // or a 404 page
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
