import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignoutComponent implements OnInit {

  constructor(public _authService: AuthService, private _Router: Router) { }

  ngOnInit(): void {
    if (this._authService.isUserSignedIn) {
      this._authService.signOut();
    }
    else {
      this._Router.navigate(["/"]);
    }
  }

}
