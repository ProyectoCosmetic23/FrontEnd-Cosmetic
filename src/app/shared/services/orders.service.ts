import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs-compat';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  url = 'https://api-cosmetic-w32d.onrender.com/api/orders';
  constructor(
    private http: HttpClient
  ) { }

  getAllOrders(): Observable<any> {
    return this.http.get(this.url);
  }

  getAllClients(): Observable<any> {
    return this.http.get('https://api-cosmetic-w32d.onrender.com/api/clients');
  }

  getAllEmployees(): Observable<any> {
    return this.http.get('https://api-cosmetic-w32d.onrender.com/api/employees');
  }

  getAllProducts(): Observable<any> {
   return this.http.get('https://api-cosmetic-w32d.onrender.com/api/productcs');
  }

  getOrderById(id: any): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }

  updateOrderStatus(id: any): Observable<any> {
    return this.http.put(this.url + '/updateStatus/' + id, {});
  }
}
