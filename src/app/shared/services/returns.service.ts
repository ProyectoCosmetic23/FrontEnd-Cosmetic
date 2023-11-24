import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ReturnsService {
  headers: any;
  url = 'http://localhost:8080/api/orders';
  url2 = 'http://localhost:8080/api/returns';
  url3='http://localhost:8080/api/clients';
  token: any;

  constructor(
    private http: HttpClient,
    // private cookieService: CookieService
  ) {
    // this.token = this.cookieService.get('token');
  }

  getAllOrders(): Observable<any> {
    return this.http.get(this.url);
  }

  getAllClients(): Observable<any> {
    return this.http.get(this.url3);
}
  getAllEmployees(): Observable<any[]> {
    const headers = this.token ? new HttpHeaders().set('x-token', this.token) : undefined;
    console.log("Los headers", headers);
    return this.http.get<any[]>('http://localhost:8080/api/employees', { headers });
  }

  getAllProducts(): Observable<any> {
    return this.http.get('http://localhost:8080/api/productcs');
  }

  getOrderById(id: any): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }



  getProductByIdOrder(id: any): Observable<any> {
    return this.http.get<any>(`${this.url2}/productByIdOrder/${id}`);

  }
  






}