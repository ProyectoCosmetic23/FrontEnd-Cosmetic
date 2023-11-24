import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComissionsService {

  private baseUrl = environment.url + '/api/commissions';
  private url2 = environment.url +'/api/detailComs';
  private url3 = environment.url +'/api/employees';
  private url4 = environment.url +'/api/sales';
  token: any;
  
  constructor(private http: HttpClient,  private cookieService: CookieService) {this.token = this.cookieService.get('token'); }

  getSalesByEmployeeAndMonth(idEmployee: number, month: string): Observable<any> {
    const url = `${this.baseUrl}/sales/${idEmployee}/${month}`;
    return this.http.get(url);
  }

  getAllEmployees(): Observable<any[]> {
    const headers = this.token ? new HttpHeaders().set('x-token', this.token) : undefined;
    console.log("Los headers", headers);
    return this.http.get<any[]>(this.url3, { headers });
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
  getAllComs(): Observable<any[]> {
    const headers = this.token ? new HttpHeaders().set('x-token', this.token) : undefined;
    console.log("Los headers", headers);
    return this.http.get<any[]>(this.baseUrl, { headers });
  }

  getComsEmploy(employeID: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/employee/${employeID}`);
  }

  getComissionDetailById(idComissionDetail: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/detail/${idComissionDetail}`);
  }
}
