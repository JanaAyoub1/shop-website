import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// const routes: Routes = [
//   {
//     path: 'login',
//     loadChildren: () =>
//       import('../app/core/auth/login/login.module').then((m) => m.LoginModule),
//   },
//   { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
//   // Add other routes here
// ];

// const routes: Routes = [
//   // { path: '', redirectTo: '/home', pathMatch: 'full' },
//   // { path: 'home', component: HomeComponent }, // Ensure this route exists
//   {
//     path: 'login',
//     loadChildren: () =>
//       import('../app/core/auth/login/login.module').then((m) => m.LoginModule),
//   },
//   // Add other routes here
// ];

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('../app/features/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('../app/core/auth/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('../app/core/auth/signup/signup.module').then((m) => m.SignupModule),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

