import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from 'src/app/model/order';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class UserHistoryComponent implements OnInit {

  public orders: Array<Order> = [];

  constructor(
    private _AngularFirestore: AngularFirestore,
    private _AngularFireAuth: AngularFireAuth,
    private _ProductService: ProductService
  ) { }
  

  ngOnInit(): void {

    var productList: Array<Product>;
    this.subP = this._ProductService.getProducts('./assets/mock-data/products.json').subscribe(res => {
      productList = res as Array<Product>;

      productList.forEach(product => {
        product.image = this._ProductService.setProductImagePath(product);
      })

      this.getUserOrders().then(response => {
        response.forEach(order => {
          this.orders.push({
            "id": order.id,
            "displayname": order.displayname,
            "status": order.status,
            "date": order.date,
            "total": order.total,
            "address1": order.address1,
            "address2": order.address2,
            "city": order.city,
            "phone": order.phone,
            "postcode": order.postcode,
            "products": order.products,
            "quantity": order.quantity,
            "productInfo": productList.filter(({id}) => order.products.includes(id))
          });;
        });
        this.dataSource.data = this.orders;
      });
    }); 
  }

  displayedColumns: string[] = ['id', 'displayname', 'date', 'status', 'total', 'actions'];
  dataSource = new MatTableDataSource<Order>();
  expandedElement: Order | null;
  subP: any;

  private getUserOrders(): Promise<Array<Order>> {
    return new Promise((resolve, reject) => {
      this._AngularFireAuth.authState.subscribe((user) => {
        if (user) {
          this._AngularFirestore.collection("orders").ref.where("user", "==", user.uid).onSnapshot(documents => {
            if (documents.empty) { 
              resolve([]) 
            }
            else {
              resolve(documents.docs.reduce((output, document) => { 
                output.push(document.data() as Order);
                return output; 
              }, Array<Order>()))
            }
          }, error => reject(error));
        }
      });
    });
  }
  
  ngOnDestroy = () => {
    this.subP.unsubscribe();
  }
}
