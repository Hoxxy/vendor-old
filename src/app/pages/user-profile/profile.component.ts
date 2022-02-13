import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class UserProfileComponent implements OnInit {
  constructor(
    public _AuthService: AuthService,
    private _AngularFireAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {}

  checkAddressFormValidity(form: NgForm): boolean {
    var isFormValid: boolean = true;

    Object.keys(form.controls).forEach(id => {
      if(form.controls[id].hasError('required') || form.controls[id].hasError('pattern')) isFormValid = false;
    });
    return isFormValid && !this._AuthService.countrySelect.hasError('required');
  }

  checkCredentialsFormValidity(form: NgForm): boolean {
    var isFormValid: boolean = true;

    Object.keys(form.controls).forEach(id => {
      if(form.controls[id].hasError('required') || form.controls[id].hasError('pattern')) isFormValid = false;
    });

    return isFormValid && !form.controls["password"]?.hasError("minlength") && !form.controls["passwordRepeat"]?.hasError("matched");
  }

  updateCredentials(form: NgForm): void {
    this._AngularFireAuth.user.subscribe(result => {
      result.updateEmail(form.controls["email"].value).then(() => {
        result.updatePassword(form.controls["password"].value).then(() => {
          Swal.fire({
            title: "Success!",
            text: "E-mail and password have been successfully updated.",
            icon: "success",
            showCancelButton: false,
            confirmButtonText: "OK"
          })
        }).catch((error) => {
          Swal.fire({
            title: "Error",
            text: "Error updating password: "+error,
            icon: "error",
            showCancelButton: false,
            confirmButtonText: "OK"
          })
        })
      }).catch((error) => {
        Swal.fire({
          title: "Error",
          text: "Error updating e-mail: "+error,
          icon: "error",
          showCancelButton: false,
          confirmButtonText: "OK"
        })
      })
    });
  }

  updateAddress(form: NgForm): void {
    this._AuthService.updateUserData(this._AuthService.getUserFirestoreId(), {
      "firstName": form.controls["firstName"].value,
      "lastName": form.controls["lastName"].value,
      "phone": form.controls["phone"].value,
      "city": form.controls["city"].value,
      "postcode": form.controls["postcode"].value,
      "address1": form.controls["address1"].value,
      "address2": form.controls["address2"].value
    }).then(() => {
      Swal.fire({
          title: "Success!",
          text: "Your address information has been successfully updated.",
          icon: "success",
          showCancelButton: false,
          confirmButtonText: "OK"
      });
    })
  }
}