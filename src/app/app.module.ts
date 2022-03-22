import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { MaterialModule } from './material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RoutingModule } from './routing.module';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './pages/product/product.component';
import { UserProfileComponent } from './pages/user-profile/profile.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { QuantityControlComponent } from './components/quantity-control/quantity-control.component';
import { UserHistoryComponent } from './pages/user-history/history.component';
import { StarRatingModule } from 'angular-star-rating';
import { WriteProductReviewComponent } from './components/write-product-review/write-product-review.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './shared/services/product.service';
import { CartService } from './shared/services/cart.service';
import { CartComponent } from './pages/cart/cart.component';
import { CategoryService } from './shared/services/category.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SignoutComponent } from './pages/signout/signout.component';
import { ShopComponent } from './pages/shop/shop.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    HomepageComponent,
    ProductComponent,
    UserProfileComponent,
    NotFoundComponent,
    QuantityControlComponent,
    UserHistoryComponent,
    WriteProductReviewComponent,
    CartComponent,
    SignoutComponent,
    ShopComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    RoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StarRatingModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    HttpClientModule,
    SweetAlert2Module.forRoot()
  ],
  exports: [
    QuantityControlComponent
  ],
  providers: [CartService, ProductService, CategoryService],
  bootstrap: [AppComponent],
  entryComponents: [
    WriteProductReviewComponent
  ]
})
export class AppModule { }
