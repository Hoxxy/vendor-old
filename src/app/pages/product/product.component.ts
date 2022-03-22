import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WriteProductReviewComponent } from '../../components/write-product-review/write-product-review.component';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/shared/services/product.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ReviewService } from 'src/app/shared/services/review.service';
import { AuthService } from 'src/app/shared/services/auth';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit, OnDestroy {

  private sub: any;
  private subC: any;
  product: Product = new Product();
  category: Category = new Category();

  productPurchased: boolean = false;

  quantity: number = 0;
  productHasReviews: boolean = true;

  constructor(public matDialog: MatDialog,
    private matSnackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private productService: ProductService,
    private cartService: CartService,
    private categoryService: CategoryService,
    public reviewService: ReviewService,
    public authService: AuthService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.getProduct(res.id);
      this.reviewService.loadReviews(res.id);

      this.angularFireAuth.authState.subscribe((user) => {
        if (user) {
          this.angularFirestore.collection("orders").ref.where("user", "==", user.uid).where("products", 'array-contains', Number(res.id)).where("status", "==", "Finished").onSnapshot(documents => {
            if (documents.empty) {
              this.productPurchased = false;
            }
            else {
              this.productPurchased = true;
            }
          });
        }
      });
    });
  }

  getProduct = (id: number) => {
    this.sub = this.productService.getProducts('./assets/mock-data/products.json')
      .subscribe(res => {
        this.product = res[id - 1];
        this.product.image = this.productService.setProductImagePath(this.product);
        this.getCategoryTitle(this.product.category);
      })
  };

  changeQuantity = (newQuantity: number) => {
    this.quantity = newQuantity;
  };

  getCategoryTitle = (id: number) => {
    this.subC = this.categoryService.getCategories('./assets/mock-data/categories.json').subscribe(res => {
      this.category = res[id - 1];

    });
  }

  public addToCart = (product: Product) => {

    if (this.quantity <= 0) this.quantity = 1;
    this.cartService.addToCart({ product, quantity: this.quantity });

    this.matSnackBar
      .open("Added to the shopping cart.", "View cart", { duration: 4000 })
      .afterDismissed().subscribe(info => {
        if (info.dismissedByAction === true) {
          this.router.navigate(['/cart']);
        }
      });

  };

  openReviewDialog = () => {
    this.matDialog.open(WriteProductReviewComponent, {
      data: {
        productPurchased: this.productPurchased,
        productId: this.product.id
      },
      panelClass: 'full-width-dialog'
    });
  }

  ngOnDestroy = () => {
    this.sub.unsubscribe();
    this.subC.unsubscribe();
  }

}
