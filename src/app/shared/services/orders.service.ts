import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  headers: any;
  url = 'https://api-cosmetic-1iuc.onrender.com/api/orders';
  token: any;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { 
    this.token = this.cookieService.get('token');
  }

  getAllOrders(): Observable<any> {
    return this.http.get(this.url);
  }

  getAllClients(): Observable<any> {
    return this.http.get('https://api-cosmetic-1iuc.onrender.com/api/clients');
  }

  getAllEmployees(): Observable<any[]> {
    const headers = this.token ? new HttpHeaders().set('x-token', this.token) : undefined;
    console.log("Los headers", headers);
    return this.http.get<any[]>('https://api-cosmetic-1iuc.onrender.com/api/employees', { headers });
  }

  getAllProducts(): Observable<any> {
   return this.http.get('https://api-cosmetic-1iuc.onrender.com/api/productcs');
  }

  getOrderById(id: any): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }

  createOrder(orderData: any): Observable<any> {
    return this.http.post(this.url, orderData);
  }

  updateOrderStatus(id: any): Observable<any> {
    return this.http.put(this.url + '/updateStatus/' + id, {});
  }
}
