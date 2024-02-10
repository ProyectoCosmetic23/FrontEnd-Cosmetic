import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  headers: any;
  url = environment.url;
  token: any;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { 
    this.token = this.cookieService.get('token');
  }

  getAllOrders(): Observable<any> {
    return this.http.get(this.url + '/api/orders');
  }

  getAllProcessingOrders(): Observable<any> {
    return this.http.get(this.url + '/api/processing_orders');
  }

  getAllDeliveredOrders(): Observable<any> {
    return this.http.get(this.url + '/api/delivered_orders');
  }

  getAllUnpaidOrders(): Observable<any> {
    return this.http.get(this.url + '/api/unpaid_orders');
  }

  getAllPaidOrders(): Observable<any> {
    return this.http.get(this.url + '/api/paid_orders');
  }

  getAllSales(): Observable<any> {
    return this.http.get(this.url + '/api/completed_orders');
  }

  getAllAnulatedOrders(): Observable<any> {
    return this.http.get(this.url + '/api/anulated_orders');
  }

  getAllReturns(): Observable<any> {
    return this.http.get(this.url + '/api/returned_orders');
  }

  getAllClients(): Observable<any> {
    return this.http.get(this.url + '/api/clients');
  }

  getAllEmployees(): Observable<any> {
    return this.http.get(this.url + '/api/employees');
  }

  getAllProducts(): Observable<any> {
   return this.http.get(this.url + '/api/productcs');
  }

  getOrderById(id: any): Observable<any> {
    return this.http.get(this.url + '/api/orders/' + id);
  }

  createOrder(orderData: any): Observable<any> {
    return this.http.post(this.url + '/api/orders', orderData);
  }

  updateOrderStatus(id: any): Observable<any> {
    return this.http.put(this.url + '/api/orders/updateStatus/' + id, {});
  }

  AnulateOrder(id: any, orderData: any): Observable<any> {
    return this.http.put(this.url + '/api/orders/anulate/' + id, orderData);
  }
}