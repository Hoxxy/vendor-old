import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./user/login/login.component";
import { SignupComponent } from "./user/signup/signup.component";
import { HomepageComponent } from "./pages/homepage/homepage.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { ProductComponent } from "./products/product.component";
import { UserHistoryComponent } from "./user/user-history/history.component";
import { UserProfileComponent } from "./user/user-profile/profile.component";
import { CartComponent } from "./pages/cart/cart.component";
import { SignoutComponent } from "./user/signout/signout.component";
import { ShopComponent } from "./pages/shop/shop.component";
import { CheckoutComponent } from "./pages/checkout/checkout.component";

const routes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'signout', component: SignoutComponent },
    { path: 'shop', component: ShopComponent },
    { path: 'user/profile', component: UserProfileComponent },
    { path: 'user/orders', component: UserHistoryComponent },
    { path: 'product/:id', component: ProductComponent },
    { path: 'cart', component: CartComponent },
    { path: 'checkout', component: CheckoutComponent },
    { path: '**', component: NotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],

    exports: [RouterModule]
})

export class RoutingModule { }