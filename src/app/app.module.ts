
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LoginModule } from './core/auth/login/login.module';
import { SignupModule } from './core/auth/signup/signup.module';
import { ProductsModule } from './features/products/products.module';

import { AppComponent } from './app.component';
// import { LoginComponent } from './core/auth/login/login/login.component';
import { NavbarComponent } from './core/app-shell/user/navbar/navbar.component';
// import { ProductListComponent } from './core/product-list/product-list.component';
// import { SignupComponent } from './core/signup/signup.component';

import { authReducer } from './core/auth/login/state/login.reducers';
// import { authEffects } from './core/auth/login/state/login.effects';
import { LoginService } from './core/auth/login/service/login.service';

// import { reducers, metaReducers } from './reducers';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/http-interceptor/http-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    // SignupComponent,
    // ProductListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    LoginModule,
    SignupModule,
    ReactiveFormsModule,
    HttpClientModule,
    // StoreModule.forRoot({}, {}),
    StoreModule.forRoot({ login: authReducer }),
    // EffectsModule.forRoot([AuthEffects]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    LoginService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
