import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../app/core/auth-guard/auth.guard';
import { LoginGuard } from './core/auth-guard/login.guard';

// add canActivate: [AuthGuard] for dashboard

const routes: Routes = [
  {
    path: 'home',
    canActivate: [LoginGuard],
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
    canActivate: [LoginGuard],
    loadChildren: () =>
      import('../app/features/products/products.module').then(
        (m) => m.ProductsModule
      ),
  },
  {
    path: 'products/:id',
    canActivate: [LoginGuard],
    loadChildren: () =>
      import('../app/features/products/products.module').then(
        (m) => m.ProductsModule
      ),
  },
  {
    path: 'category/:category',
    canActivate: [LoginGuard],
    loadChildren: () =>
      import('../app/features/products/products.module').then(
        (m) => m.ProductsModule
      ),
  },
  {
    path: 'account',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../app/features/user-account/user-account.module').then(
        (m) => m.UserAccountModule
      ),
  },
  {
    path: 'cart',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../app/features/cart/cart.module').then((m) => m.CartModule),
  },
  {
    path: 'wishlist',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../app/features/wishlist/wishlist.module').then(
        (m) => m.WishlistModule
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
