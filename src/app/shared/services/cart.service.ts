import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../../model/cart';
import { ProductService } from './product.service';

@Injectable()

export class CartService {

  public cartListSubject = new BehaviorSubject([]);
  public toggleCartSubject = new BehaviorSubject(false);

  public cartList: CartItem[] = [];
  public subtotal: number;
  public shippingCost: number;
  public promoDeduction: number = 0;

  constructor(private _productService: ProductService) {}

    loadCart = () => {
        this.cartListSubject
            .subscribe(res => {
                this.cartList = res;
                let total = 0;
                for(let cart of this.cartList) {
                    total += cart.product.price * cart.quantity;
                }
                this.subtotal = total;
            });
    };

  toggleCart = () => {
      this.toggleCartSubject.next(!this.toggleCartSubject.getValue());
  };

  addToCart = (cart:CartItem) => {
      let current = this.cartListSubject.getValue();
      let dup = current.find(c=>c.product.title === cart.product.title);
      if (dup) dup.quantity += cart.quantity;
      else current.push(cart);
      this.cartListSubject.next(current);
      
      cart.product.image = this._productService.setProductImagePath(cart.product);
  };

  reloadCart = (cartList) => {
      this.cartListSubject.next(cartList);
  };

  updateQuantity = (index: number, newQuantity: number) => {
    let oldQuantity: number = this.cartList[index].quantity;
    this.cartList[index].quantity = newQuantity;

    if (newQuantity > oldQuantity)
        this.subtotal += this.cartList[index].product.price;
    else if (newQuantity < oldQuantity)
        this.subtotal -= this.cartList[index].product.price;
  };

  removeCart = (index) => {
      let current = this.cartListSubject.getValue();
      current.splice(index, 1);
      this.cartListSubject.next(current);
  };

  getCartItems = () => {
    let cartList: CartItem[];

    this.cartListSubject
    .subscribe(res => {
        cartList = res;
    })
  }
}
