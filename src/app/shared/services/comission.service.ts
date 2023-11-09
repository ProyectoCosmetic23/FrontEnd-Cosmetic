import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComissionsService {

  private baseUrl = 'http://localhost:8080/api/commissions';
  private url2 = 'http://localhost:8080/api/detailComs';
  private url3 = 'http://localhost:8080/api/employees';
  private url4 = 'http://localhost:8080/api/sales';

  constructor(private http: HttpClient) { }

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
