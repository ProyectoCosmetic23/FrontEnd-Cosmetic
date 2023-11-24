import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComissionsDetailService {

  private baseUrl = 'http://localhost:8080/api/detailComs';
  private url2 = 'http://localhost:8080/api/commissions';
  token: any;
  headers: any;
  
  constructor(private http: HttpClient) { }

  createDetailCom(detailData: any): Observable<any> {
    return this.http.post(`${this.url2}/detailComs`, detailData);
  }
  getAllDetails(): Observable<any[]> {
    const headers = this.token ? new HttpHeaders().set('x-token', this.token) : undefined;
    console.log("Los headers", headers);
    return this.http.get<any[]>(this.baseUrl, { headers });
  }

  getDetailComsById(detailID: number): Observable<any> {
    return this.http.get(`${this.url2}/${this.baseUrl}/${detailID}`);
  }
}
