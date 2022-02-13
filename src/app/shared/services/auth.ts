import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { User } from 'src/app/model/user';


interface Country {
    value: string;
}

@Injectable({
  providedIn: 'root'
})


export class AuthService {
    private userData : User;
    private uid : string;
    countrySelect = new FormControl();
    
    countries : Country[] = [{value: "Serbia"}, {value: "Croatia"}, {value: "Austria"}];

    constructor(
        private _AngularFirestore: AngularFirestore, 
        private _AngularFireAuth: AngularFireAuth,
        private _Router: Router
    ) {
        this._AngularFireAuth.authState.subscribe((user) => {
            if (user) {
                this.userData = user;
                this.uid = user.uid;
                localStorage.setItem('user', JSON.stringify(this.userData));
                JSON.parse(localStorage.getItem('user'));

                this.getUserData();
            } else {
                this.uid = null;
                localStorage.setItem('user', null);
                JSON.parse(localStorage.getItem('user'));
            }
        });
    }

    ngOnInit() : void {
    }

    public getUserFirestoreId() {
        return this.uid;
    }

    userFirstName : string;
    userLastName : string;
    userDisplayName : string;
    userEmail : string;
    userPhone : string;
    userAddress1 : string;
    userAddress2 : string;
    userCity : string;
    userPostcode : string;
    userCountry : string;

    getUserData() {
        this.getFirestoreUserData(this.getUserFirestoreId()).subscribe(data => {
            this.userFirstName = data.get("firstName");
            this.userLastName = data.get("lastName");
            this.userPhone = data.get("phone");
            this.userCity = data.get("city");
            this.userPostcode = data.get("postcode");
            this.userAddress1 = data.get("address1");
            this.userAddress2 = data.get("address2");
            this.userCountry = data.get("country");

            this.userDisplayName = data.get("firstName") + " " + data.get("lastName");
        });

        this.userEmail = this.userData.email;
    }

    signUp(email: string, password: string, form: NgForm): void {
        this._AngularFireAuth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
            // Signed In
            this.userData = userCredential.user;
            this.uid = this.userData.uid;

            this.updateUserDislayName((form.controls["firstName"].value + " " + form.controls["lastName"].value));
            this.updateUserData(userCredential.user.uid, {
                "firstName": form.controls["firstName"].value,
                "lastName": form.controls["lastName"].value,
                "email": form.controls["email"].value,
                "phone": form.controls["phone"].value,
                "city": form.controls["city"].value,
                "postcode": form.controls["postcode"].value,
                "address1": form.controls["address1"].value,
                "address2": form.controls["address2"].value
            });
        }).then(() => {
            Swal.fire({
                title: "Success!",
                text: "Registration was successful.\nYou will be redirected to the home page.",
                icon: "success",
                showCancelButton: false,
                confirmButtonText: "OK",
            }).then(() => {
                this._Router.navigate(["/"]);
            });
        }).catch((error) => {
            console.error(error);
            Swal.fire({
                title: "Signup failed",
                text: error.message,
                icon: "error",
                showCancelButton: false,
                confirmButtonText: "Try again",
            })
        });
    }

    signIn(email: string, password: string): void {
        this._AngularFireAuth.signInWithEmailAndPassword(email, password).then((userCredential) => {
            // Signed In
            this.userData = userCredential.user;
            this.uid = this.userData.uid;
            this._Router.navigate(["/"]);
        }).catch((error) => {
            console.error(error);
            Swal.fire({
                title: "Login failed",
                text: error.message,
                icon: "error",
                showCancelButton: false,
                confirmButtonText: "Try again",
            })
        });
    }

    updateUserDislayName(displayName: string): void {
        this._AngularFireAuth.user.subscribe((result) => {
            if (result) {
                result.updateProfile({ displayName: displayName });
                this.userData.displayName = displayName; 
            };
        });
    }
    
    get isUserSignedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('user'));

        return (user !== null) ? true : false;
    }

    updateUserData(uid: string, data: any) : Promise<void> {
        return new Promise((resolve, reject) => {
            this._AngularFirestore.firestore.collection("users").doc(uid).set(data)
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    getFirestoreUserData(userId: string): Observable<any> {  
        return this._AngularFirestore.collection("users").doc(userId).get();
    }

    signOut() : boolean {
        var success : boolean = false;

        this._AngularFireAuth.signOut().then(() => {
            success = true;
          });

        return success;
    }

    getUserDisplayName(): string {
        return this.userDisplayName;
    }
}