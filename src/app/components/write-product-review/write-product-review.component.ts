import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ReviewService } from 'src/app/shared/services/review.service';


@Component({
  selector: 'app-write-product-review',
  templateUrl: './write-product-review.component.html',
  styleUrls: ['./write-product-review.component.css']
})
export class WriteProductReviewComponent implements OnInit {

  productPurchased: boolean;
  productId: number;

  constructor(
    private _ReviewService: ReviewService,
    private _MatDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {
      productPurchased: boolean,
      productId: number 
    }
  ) { 
    this.productPurchased = this.data.productPurchased;
    this.productId = this.data.productId;
  }


  ngOnInit(): void {
  }

  submitReview(reviewText: String) : void {
    let rating: number = 0;
    for (let i = 0; i <= 5; i++)
    {
      if (document.getElementById("ratingRef").getElementsByClassName("value-"+i).item(0) !== null) {
        rating = i;
        break;
      }
    }

    this._MatDialog.closeAll();
    this._ReviewService.insertReview(reviewText, this.productId, rating);
  }

}
