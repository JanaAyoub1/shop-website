import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../app/core/auth-guard/auth.guard';
import { LoginGuard } from './core/auth-guard/login.guard';

// add canActivate: [AuthGuard] for dashboard

const routes: Routes = [
  // {
  //   path: 'home',
  //   loadChildren: () =>
  //     import('../app/features/home/home.module').then((m) => m.HomeModule),
  // },
  // {
  //   path: 'login',
  //   canActivate: [LoginGuard],
  //   loadComponent: () =>
  //     import('./core/auth/login/login/login.component').then(
  //       (m) => m.LoginComponent
  //     ),
  // },
  // {
  //   path: 'signup',
  //   canActivate: [LoginGuard],
  //   loadComponent: () =>
  //     import('./core/auth/signup/signup/signup.component').then(
  //       (m) => m.SignupComponent
  //     ),
  // },
  // {
  //   path: 'auth',
  //   // canActivate: [LoginGuard],
  //   loadChildren: () =>
  //     import('./core/auth/auth.module').then((m) => m.AuthModule),
  // },
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
    path: 'signup',
    canActivate: [LoginGuard],
    loadChildren: () =>
      import('../app/core/auth/signup/signup.module').then(
        (m) => m.SignupModule
      ),
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('./features/categories/categories.module').then(
        (m) => m.CategoriesModule
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
