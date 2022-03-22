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

  totalPrice: number;
  selected = '15';
  shippingMethod = new FormControl();

  displayedColumns: string[] = ['title', 'quantity', 'price'];

  constructor(public cartService: CartService, private router: Router) {
    this.cartService.loadCart();
  };

  removeFromCart = (index: number) => {
    this.cartService.removeCart(index);
  };

  changeQuantity = (newQuantity: number, index: number) => {
    this.cartService.updateQuantity(index, newQuantity);
  };

  checkout(shippingCost: any) {
    this.cartService.shippingCost = Number(shippingCost);
    this.router.navigate(['/checkout']);
  }

  calculateTotal(): number {
    return this.cartService.subtotal - this.cartService.promoDeduction + Number(this.selected);
  }

  promo(promoCode: string) {
    setTimeout(() => {
      if (promoCode === "20OFF") {
        // valid promo code
        this.cartService.promoDeduction = this.cartService.subtotal * 0.2;

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