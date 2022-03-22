import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Review } from 'src/app/model/review';
import Swal from 'sweetalert2';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  public reviews: Array<Review>;
  public avgRating: number = 0.0;

  constructor(
    private angularFirestore: AngularFirestore,
    private authService: AuthService
  ) { }

  public insertReview(reviewText: String, productId: number, rating: number): void {

    this.angularFirestore.firestore.collection("reviews").doc().set({
      "user": this.authService.getUserFirestoreId(),
      "displayname": this.authService.getUserDisplayName(),
      "product": productId.toString(),
      "text": reviewText,
      "rating": rating,
      "date": formatDate(new Date(), 'dd/MM/yyyy, HH:mm', 'en-US')
    })
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Your review has been successfully submitted.",
          icon: "success",
          showCancelButton: false,
          confirmButtonText: "OK",
        })
      })
      .catch((error) => { });
  }

  private getProductReviews(productId: number): Promise<Array<Review>> {
    return new Promise((resolve, reject) => {
      this.angularFirestore.collection("reviews").ref.where("product", "==", productId).onSnapshot(documents => {
        if (documents.empty) {
          resolve([])
        }
        else {
          resolve(documents.docs.reduce((output, document) => {
            output.push(document.data() as Review); return output;
          }, Array<Review>()))
        }
      }, error => reject(error));
    });
  }


  public loadReviews(productId: number): void {
    this.reviews = [];
    this.avgRating = 0.0;

    let counter = 0;

    this.getProductReviews(productId).then(response => {

      response.forEach(review => {
        this.avgRating += review.rating;
        counter++;

        this.reviews.push({
          "displayname": review.displayname,
          "date": review.date,
          "text": review.text,
          "rating": review.rating
        });
      });

      this.avgRating = this.avgRating / counter;
    });
  }
}
