import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  cartItems : number = 0;

  constructor(
    public _authService: AuthService,
    public _cartService: CartService) {
    
   }

  ngOnInit(): void {
    
  }

}
