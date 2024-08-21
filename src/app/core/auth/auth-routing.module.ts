// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { LoginComponent } from './login/login.component';

// const routes: Routes = [
//   { path: '', component: LoginComponent }
// ];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class LoginRoutingModule { }

// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { LoginComponent } from '../auth/login/login/login.component';
// import { SignupComponent } from '../auth/signup/signup/signup.component';

// const routes: Routes = [
//   { path: 'login', component: LoginComponent },
//   { path: 'signup', component: SignupComponent },
// ];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule],
// })
// export class AuthRoutingModule {}

// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { LoginComponent } from '../auth/login/login/login.component';

// const routes: Routes = [
//   { path: 'login', component: LoginComponent },
//   // You don't need to include 'signup' here as it's standalone and will be lazy-loaded via app-routing.module.ts
// ];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule],
// })
// export class AuthRoutingModule {}

// auth-routing.module.ts
// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { LoginComponent } from '../auth/login/login/login.component';
// import { SignupComponent } from '../auth/signup/signup/signup.component';
// import { LoginGuard } from '../auth-guard/login.guard';

// const routes: Routes = [
  // {
  //   path: 'login',
  //   component: LoginComponent,
  //   canActivate: [LoginGuard],
  // },
  // {
  //   path: 'signup',
  //   component: SignupComponent,
  //   canActivate: [LoginGuard],
  // },
//   { path: 'login', component: LoginComponent },
//   { path: 'signup', component: SignupComponent },
// ];

  // const routes: Routes = [
  // {
  //   path: 'auth',
  //   loadChildren: () => import('./auth.module').then((m) => m.AuthModule),
  // },
// ];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule],
// })
// export class AuthRoutingModule {}

// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { LoginComponent } from '../auth/login/login/login.component';
// import { SignupComponent } from '../auth/signup/signup/signup.component';

// const routes: Routes = [
//   { path: 'login', component: LoginComponent },
//   { path: 'signup', component: SignupComponent },
// ];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule],
// })
// export class AuthRoutingModule {}
