import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReviewService } from 'src/app/shared/services/review.service';


@Component({
  selector: 'app-write-product-review',
  templateUrl: './write-product-review.component.html'
})

export class WriteProductReviewComponent {

  productPurchased: boolean;
  productId: number;

  constructor(
    private reviewService: ReviewService,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {
      productPurchased: boolean,
      productId: number
    }
  ) {
    this.productPurchased = this.data.productPurchased;
    this.productId = this.data.productId;
  }

  submitReview(reviewText: String): void {
    let rating: number = 0;
    for (let i = 0; i <= 5; i++) {
      if (document.getElementById("ratingRef").getElementsByClassName("value-" + i).item(0) !== null) {
        rating = i;
        break;
      }
    }

    this.matDialog.closeAll();
    this.reviewService.insertReview(reviewText, this.productId, rating);
  }
}
