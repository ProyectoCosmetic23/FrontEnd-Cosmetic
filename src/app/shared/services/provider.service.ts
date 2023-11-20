import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  private baseUrl = environment.url + '/api/providers';

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

  updateProviderStatus(providerId: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/state/${providerId}`, null);
  }

  updateProvider(providerId: any, updatedProviderData: any):
  Observable<any> {
    return this.http.put(`${this.baseUrl}/${providerId}`, updatedProviderData);
  }
}
