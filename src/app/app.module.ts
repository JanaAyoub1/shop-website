import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// import { AuthModule } from './core/auth/auth.module';
import { ProductsModule } from './features/products/products.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { NavbarComponent } from './core/app-shell/user/navbar/navbar.component';

import { authReducer } from './core/auth/login/state/login.reducers';
// import { authEffects } from './core/auth/login/state/login.effects';
import { LoginService } from './core/auth/login/service/login.service';

// import { reducers, metaReducers } from './reducers';

import { AuthInterceptor } from './core/http-interceptor/http-interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './core/auth-guard/auth.service';
import { HomeComponent } from './features/home/home/home.component';
import { UserAccountModule } from './features/user-account/user-account.module';
import { CartModule } from './features/cart/cart.module';
import { WishlistModule } from './features/wishlist/wishlist.module';
// import { CategoryDetailComponent } from './features/category-detail/category-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    // HomeComponent,
    // CategoryDetailComponent,
    // CategoriesComponent,
    // SignupComponent,
    // ProductListComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CartModule,
    WishlistModule,
    // AuthModule,
    UserAccountModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    ProductsModule,

    HttpClientModule,
    // StoreModule.forRoot({}, {}),
    StoreModule.forRoot({ login: authReducer }),
    // EffectsModule.forRoot([AuthEffects]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    LoginService,
    provideAnimationsAsync(),
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
