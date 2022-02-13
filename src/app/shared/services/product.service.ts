import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { Product } from "src/app/model/product";

@Injectable()
export class ProductService {

    constructor(public http: HttpClient) { }

    public getProducts(dataURL: string) {
        return this.http.get(dataURL)
            .pipe(
                map(res => res), 
                catchError(this.handleError)
            );
    }

    private handleError(error: any) {
        return throwError(error.message);
    }    
    
    setProductImagePath = (product: Product): string => {
        let path: string = "./assets/images/product-" + product.id + ".jpg";
        return path;
      }
}