
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs-compat';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  url = 'http://localhost:8080/api/orders';
  constructor(
    private http: HttpClient
  ) { }

  getAllOrders(): Observable<any> {
    return this.http.get(this.url);
  }

  getAllClients(): Observable<any> {
    return this.http.get('http://localhost:8080/api/clients');
  }

  getAllEmployees(): Observable<any> {
    return this.http.get('http://localhost:8080/api/employees');
  }

  getAllProducts(): Observable<any> {
   return this.http.get('http://localhost:8080/api/productcs');
  }

  getOrderById(id: any): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }

  updateOrderStatus(id: any): Observable<any> {
    return this.http.put(this.url + '/updateStatus/' + id, {});
  }
}
