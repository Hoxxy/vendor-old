import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public _authService: AuthService, private _Router: Router) { }

  ngOnInit(): void {
    if (this._authService.isUserSignedIn) {
      this._Router.navigate(["/"]);
    }
  }

  checkPasswords(pass1: NgModel, pass2: NgModel) : void {
    if (pass1.value !== pass2.value) {
      pass2.control.setErrors( { "notSame": true } );
    }
    else {
      pass2.control.setErrors(null);
    }
  }

  checkFormValidity(form: NgForm): boolean {
    var isFormValid: boolean = true;

    Object.keys(form.controls).forEach(id => {
      if(form.controls[id].hasError('required') || form.controls[id].hasError('pattern')) isFormValid = false;
    });
    return isFormValid && !form.controls["password"]?.hasError("minlength") && !form.controls["passwordRepeat"]?.hasError("matched");
  }

}
