import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComissionsDetailService {

  private baseUrl = 'https://api-cosmetic-1iuc.onrender.com/api/detailComs';
  private url2 = 'https://api-cosmetic-1iuc.onrender.com/api/commissions';

  constructor(private http: HttpClient) { }

  createDetailCom(detailData: any): Observable<any> {
    return this.http.post(`${this.url2}/detailComs`, detailData);
  }
  getAllDetails(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getDetailComsById(detailID: number): Observable<any> {
    return this.http.get(`${this.url2}/${this.baseUrl}/${detailID}`);
  }
}
