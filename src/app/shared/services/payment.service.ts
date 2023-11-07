import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  private baseUrl = 'http://localhost:8080/api/pagos';
  private url2 = 'http://localhost:8080/api/clientes';
  private url3 = 'http://localhost:8080/api/sales';

  constructor(private http: HttpClient) { }

  createPayment(paymentData: any): Observable<any> {
    return this.http.post(this.baseUrl, paymentData);
  }
  getAllPayments(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  getPaymentById(paymentID: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${paymentID}`);
  }
  getSaleById(saleId: number): Observable<any> {
    return this.http.get(`${this.url3}/${saleId}`);
  }
  getPayClient(clientID: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/clientes/${clientID}`);
  }
  getPayClientSale(clientID: number, saleID: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/clientes/${clientID}/ventas/${saleID}`);
  }
  getAllClients(): Observable<any> {
    return this.http.get(this.url2);
  }
  getAllSales(): Observable<any> {
    return this.http.get(this.url3);
  }
  getPayClienSale(): Observable<any> {
    return this.http.get(this.url3);
  }
}
