import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  private baseUrl = 'http://localhost:8080/api/proveedores';

  constructor(private http: HttpClient) { }

  createProvider(providerData: any): Observable<any> {
    return this.http.post(this.baseUrl, providerData);
  }
  getAllProviders(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getProviderById(providerId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${providerId}`);
  }


  updateProvider(providerId: number, providerData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${providerId}`, providerData);
  }
}
