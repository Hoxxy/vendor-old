import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { Product } from "src/app/products/product.model";

@Injectable()
export class ProductService {

    constructor(private httpClient: HttpClient) { }

    public getProducts(dataURL: string) {
        return this.httpClient.get(dataURL)
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