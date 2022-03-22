import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth';
import { CartService } from 'src/app/shared/services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  
  private lastOrderId: number;
  
  constructor(
    private router: Router,
    private angularFirestore: AngularFirestore,
    public cartService: CartService,
    public authService: AuthService) { }


  ngOnInit(): void {
    this.getLastOrderId();
  }

  getLastOrderId(): void {
    this.angularFirestore.collection("config").doc("order_id").get().subscribe((data) => {
      this.lastOrderId = data.get("order_id");
    });
  }

  updateOrderId(): void {
    this.angularFirestore.collection("config").doc("")
  }

  public calculateTotal(): number {
    return this.cartService.subtotal - this.cartService.promoDeduction + Number(this.cartService.shippingCost);
  }

  insertOrder(form: NgForm): void {

    var products = [];
    var quantity = [];
    for (var i = 0; i < this.cartService.cartList.length; i++) {
      products.push(this.cartService.cartList?.[i].product.id);
      quantity.push(this.cartService.cartList?.[i].quantity);
    }

    this.angularFirestore.collection("config").doc("order_id").get().subscribe((data) => {

      let orderId: number = data.get("order_id") + 1;

      this.angularFirestore.firestore.collection("config").doc("order_id").set({
        "order_id": orderId
      });

      this.angularFirestore.firestore.collection("orders").doc(orderId.toString()).set({
        "user": this.authService.getUserFirestoreId(),
        "id": orderId,
        "products": products,
        "quantity": quantity,
        "status": "Processing",
        "date": formatDate(new Date(), 'dd/MM/yyyy, HH:mm', 'en-US'),
        "displayname": form.controls["firstName"].value + " " + form.controls["lastName"].value,
        "phone": form.controls["phone"].value,
        "city": form.controls["city"].value,
        "postcode": form.controls["postcode"].value,
        "address1": form.controls["address1"].value,
        "address2": form.controls["address2"].value,
        "total": this.calculateTotal()
      })
        .then(() => {
          this.cartService.cartList.length = 0;

          Swal.fire({
            title: "Success!",
            text: "You have successfully placed the order.",
            icon: "success",
            showCancelButton: false,
            confirmButtonText: "OK",
          }).then(() => {
            this.router.navigate(["/"]);
          });
        })
        .catch((error) => {
          Swal.fire({
            title: "Failed",
            text: error.message,
            icon: "error",
            showCancelButton: false,
            confirmButtonText: "Try again",
          })
        });
    })
  }

  checkFormValidity(form: NgForm): boolean {
    var isFormValid: boolean = true;

    Object.keys(form.controls).forEach(id => {
      if (form.controls[id].hasError('required') || form.controls[id].hasError('pattern')) isFormValid = false;
    });
    return isFormValid && !this.authService.countrySelect.hasError('required');
  }

}
