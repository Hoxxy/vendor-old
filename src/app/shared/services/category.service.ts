import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { Category } from "src/app/model/category";

@Injectable()
export class CategoryService {

    private subC : any;

    constructor(public http: HttpClient) { }

    public getCategories(dataURL: string) {
        return this.http.get(dataURL)
            .pipe(
                map(res => res), 
                catchError(this.handleError)
            );
    }

    private handleError(error: any) {
        return throwError(error.message);
    }    

    getCategoryById = (id : number) : Category => {
        let category : Category;
        this.subC = this.getCategories('./assets/mock-data/categories.json')
        .subscribe(res => {
            category = res[id-1];
        });

        return category;
    }

    ngOnDestroy = () => {
        this.subC.unsubscribe();
    }
}