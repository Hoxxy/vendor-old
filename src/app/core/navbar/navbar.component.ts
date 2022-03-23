import { Component } from '@angular/core';
import { AuthService } from 'src/app/user/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  // cartItems : number = 0;

  constructor(public authService: AuthService, public cartService: CartService) { }
}
