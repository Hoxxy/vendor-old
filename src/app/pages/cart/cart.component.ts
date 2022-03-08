import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  public totalPrice: number;
  public shippingMethod = new FormControl();
  public selected = '15';

  displayedColumns: string[] = ['title', 'quantity', 'price'];

  constructor(
      public _cartService: CartService,
      private _router: Router) {
      this._cartService.loadCart();
  };

  removeFromCart = (index: number) => {
      this._cartService.removeCart(index);
  };

  changeQuantity = (newQuantity: number, index: number) => {
    this._cartService.updateQuantity(index, newQuantity);
  };

  checkout(shippingCost : any) {
    this._cartService.shippingCost = Number(shippingCost);
    this._router.navigate(['/checkout']);
  }

  public calculateTotal() : number {
    return this._cartService.subtotal - this._cartService.promoDeduction + Number(this.selected);
  }

  public promo(promoCode: string) {
    setTimeout(() => {
      if (promoCode === "20OFF") {
        // valid promo code
        this._cartService.promoDeduction = this._cartService.subtotal * 0.2;

        Swal.fire({
          title: "Success",
          text: "The promo code has been successfully applied.",
          icon: "success",
          showCancelButton: false,
          confirmButtonText: "OK",
        });
      }
      else {
        Swal.fire({
          title: "Error",
          text: "The promo code you've entered is not valid.",
          icon: "error",
          showCancelButton: false,
          confirmButtonText: "OK",
        });
      }
    }, 1000);
  }

}