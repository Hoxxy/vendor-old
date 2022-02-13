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

  constructor(
    private _Router: Router,
    public _CartService: CartService,
    private _AngularFirestore: AngularFirestore,
    public _AuthService: AuthService) { }

  private lastOrderId: number;

  ngOnInit(): void {
    this.getLastOrderId();
  }

  getLastOrderId(): void {
    this._AngularFirestore.collection("config").doc("order_id").get().subscribe((data) => {
      this.lastOrderId = data.get("order_id");
    });
  }

  updateOrderId(): void {
    this._AngularFirestore.collection("config").doc("")
  }

  public calculateTotal() : number {
    return this._CartService.subtotal - this._CartService.promoDeduction + Number(this._CartService.shippingCost);
  }

  insertOrder(form: NgForm): void {

    var products = [];
    var quantity = [];
    for (var i = 0; i < this._CartService.cartList.length; i++) {
      products.push(this._CartService.cartList?.[i].product.id);
      quantity.push(this._CartService.cartList?.[i].quantity);
    }
    
    this._AngularFirestore.collection("config").doc("order_id").get().subscribe((data) => {

      let orderId: number = data.get("order_id") + 1;

      this._AngularFirestore.firestore.collection("config").doc("order_id").set({
        "order_id": orderId
      });

      this._AngularFirestore.firestore.collection("orders").doc(orderId.toString()).set({
        "user": this._AuthService.getUserFirestoreId(),
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
        this._CartService.cartList.length = 0;

        Swal.fire({
          title: "Success!",
          text: "You have successfully placed the order.",
          icon: "success",
          showCancelButton: false,
          confirmButtonText: "OK",
        }).then(() => {
            this._Router.navigate(["/"]);
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
      if(form.controls[id].hasError('required') || form.controls[id].hasError('pattern')) isFormValid = false;
    });
    return isFormValid && !this._AuthService.countrySelect.hasError('required');
  }

}
