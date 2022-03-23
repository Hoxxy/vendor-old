import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { Product } from 'src/app/products/product.model';
import { ProductService } from 'src/app/shared/services/product.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { _isNumberValue } from '@angular/cdk/coercion';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  private subC: Subscription;
  private subP: Subscription;
  public currentCategory: Category = new Category();
  public productList: Array<Product>;
  public paramCategory: any = null;
  public paramPrice: any = null;

  constructor(private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.paramCategory = params['category'];
      this.paramPrice = params['price']

      if (_isNumberValue(this.paramCategory))
        this.getCategoryById(this.paramCategory as unknown as number);
      else
        this.getCategoryByName(this.paramCategory);

      this.loadProducts();

    });
  }

  getCategoryById = (id: number) => {
    this.subC = this.categoryService.getCategories('./assets/mock-data/categories.json').subscribe(res => {
      this.currentCategory = res[id - 1];
    })
  }

  getCategoryByName = (name: string) => {
    this.subC = this.categoryService.getCategories('./assets/mock-data/categories.json').subscribe(res => {
      let categoryList: Array<any> = res as Array<Category>;
      this.currentCategory = categoryList.find(categoryItem => categoryItem.idReadable === name.toLowerCase());
    })
  }

  loadProducts = (price?: any) => {
    this.subP = this.productService.getProducts('./assets/mock-data/products.json').subscribe(res => {
      this.productList = res as Array<Product>;

      if (this.paramCategory) {
        this.productList = this.productList.filter(item => item.category == this.currentCategory.id);
      }

      if (this.paramPrice === "cheap") {
        this.productList = this.productList.filter(item => item.price < 200.0)
      }
      else if (this.paramPrice === "premium") {
        this.productList = this.productList.filter(item => item.price >= 200.0)
      }
    });
  }

  addToCart = (product: Product) => {
    this.cartService.addToCart({ product, quantity: 1 });

    this.snackBar
      .open("Added to the shopping cart.", "View cart", { duration: 4000 })
      .afterDismissed().subscribe(info => {
        if (info.dismissedByAction === true) {
          this.router.navigate(['/cart']);
        }
      });
  };

  ngOnDestroy = () => {
    this.subC.unsubscribe();
    this.subP.unsubscribe();
  }
}
