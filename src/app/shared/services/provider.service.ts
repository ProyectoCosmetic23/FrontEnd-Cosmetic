import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  private baseUrl = 'http://localhost:8080/api/providers';

  constructor(private http: HttpClient) { }

  createProvider(providerData: any): Observable<any> {
    return this.http.post(this.baseUrl, providerData);
  }
  
  getAllProviders(token?: string): Observable<any[]> {
    const headers = token ? new HttpHeaders().set('x-token', token) : undefined;
    return this.http.get<any[]>(this.baseUrl, { headers });
  }

  getProviderById(providerId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${providerId}`);
  }

  updateProviderStatus(providerId: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/state/${providerId}`, null);
  }

  updateProvider(providerId: any, updatedProviderData: any):
  Observable<any> {
    return this.http.put(`${this.baseUrl}/${providerId}`, updatedProviderData);
  }
}
