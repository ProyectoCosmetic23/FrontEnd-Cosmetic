import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReturnsService {
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

  getAllClients(): Observable<any> {
    return this.http.get(this.url + '/api/clients');
  }

  getAllEmployees(): Observable<any[]> {
    const headers = this.token ? new HttpHeaders().set('x-token', this.token) : undefined;
    return this.http.get<any[]>(this.url + '/api/employees', { headers });
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

  retireProduct(data: any): Observable<any> {
    return this.http.post(this.url + '/api/processReturn', data);
  }

  AnulateOrder(id: any, data: any): Observable<any> {
    return this.http.put(this.url + '/api/returns/anulate/' + id, data);
  }

  getReturnedProducts(id: any): Observable<any> {
    return this.http.get(this.url + '/api/returns_detail/' + id);
  }
}
