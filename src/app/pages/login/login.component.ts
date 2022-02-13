import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public _authService: AuthService, private _Router: Router) { }

  ngOnInit(): void {
    if (this._authService.isUserSignedIn) {
      this._Router.navigate(["/"]);
    }
  }

}
