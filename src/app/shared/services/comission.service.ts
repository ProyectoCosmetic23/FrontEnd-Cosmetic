import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComissionsService {

  private baseUrl = environment.url + '/api/commissions';
  private url2 = environment.url +'/api/detailComs';
  private url3 = environment.url +'/api/employees';
  private url4 = environment.url +'/api/sales';

  constructor(private http: HttpClient) { }

  getSalesByEmployeeAndMonth(idEmployee: number, month: string): Observable<any> {
    const url = `${this.baseUrl}/sales/${idEmployee}/${month}`;
    return this.http.get(url);
  }

  getAllEmployees(): Observable<any> {
    return this.http.get(this.url3);
  }

  getAllSales(): Observable<any> {
    return this.http.get(this.url4);
  }

  getComsById(comsId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${comsId}`);
  }

  getAllComsDetail(): Observable<any> {
    return this.http.get(this.url2);
  }

  createComs(comisionData: any): Observable<any> {
    return this.http.post(this.baseUrl, comisionData);
  }
  getAllComs(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getComsEmploy(employeID: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/employee/${employeID}`);
  }

  getComissionDetailById(idComissionDetail: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/detail/${idComissionDetail}`);
  }
}
