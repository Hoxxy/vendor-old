import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from 'src/app/model/order';
import { AuthService } from 'src/app/shared/services/auth';


export interface OrdersTable {
  id: string;
  date: string;
  status: string;
}

const ELEMENT_DATA: OrdersTable[] = [
  {id: "0H19TtsOZHioN3ZhxGAw", date: '16/07/2019', status: 'Finished'},
  {id: "9nmJAUjAsj3gN0yW8OA6", date: '10/01/2020', status: 'Cancelled'},
  {id: "U3lDD5ade0gGJFMlAdee", date: '21/05/2020', status: 'Finished'},
  {id: "0H19TtsOZHioN3ZhxGAw", date: '21/08/2020', status: 'Processing'},
  {id: "9nmJAUjAsj3gN0yW8OA6", date: '31/01/2021', status: 'In Transit'},
];

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})

export class UserHistoryComponent implements OnInit {

  public orders: Array<Order> = [];

  constructor(
    private _AngularFirestore: AngularFirestore,
    private _AngularFireAuth: AngularFireAuth
  ) { }
  

  ngOnInit(): void {

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
            "postcode": order.postcode
          });
        });
        this.dataSource.data = this.orders;
      });
  }

  displayedColumns: string[] = ['id', 'displayname', 'date', 'status', 'total', 'actions'];
  dataSource = new MatTableDataSource<Order>();

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
}
