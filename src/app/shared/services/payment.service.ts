import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  private baseUrl = 'http://localhost:8080/api/payments';
  private url2 = 'http://localhost:8080/api/clients';
  private url3 = 'http://localhost:8080/api/sales';
  private url4 = 'http://localhost:8080/api/orders';

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
    return this.http.get(`${this.baseUrl}/clients/${clientID}`);
  }
  getPayClientSale(clientID: number, saleID: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/clients/${clientID}/sales/${saleID}`);
  }
  getAllClients(): Observable<any> {
    return this.http.get(this.url2);
  }
  getAllSales(): Observable<any> {
    return this.http.get(this.url3);
  }
  getAllOrders(): Observable<any> {
    return this.http.get(this.url4  );
  }
  getPayClienSale(): Observable<any> {
    return this.http.get(this.url3);
  }
  getUnpaidClients(): Observable<any> {
    return this.http.get(`${this.baseUrl}/unpaid-clients`);
  }
}
