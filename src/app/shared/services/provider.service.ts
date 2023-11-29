import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  
  getAllProviders(token?: string): Observable<any[]> {
    const headers = token ? new HttpHeaders().set('x-token', token) : undefined;
    return this.http.get<any[]>(this.baseUrl, { headers });
  }

  getProviderById(providerId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${providerId}`);
  }

  updateProviderStatus(providerId: any, ): Observable<any> {
    return this.http.put(`${this.baseUrl}/state/${providerId}`, null);
  }

  updateProvider(providerId: any, updatedProviderData: any):
  Observable<any> {
    return this.http.put(`${this.baseUrl}/${providerId}`, updatedProviderData);
  }

  checkCedulaAvailability(cedula: string): Observable<boolean> {
    const url = `${this.baseUrl}-check-cedula?cedula=${cedula}`;
    return this.http.get<boolean>(url);
  }

  checkEmailAvailability(email: string): Observable<boolean> {
    const url = `${this.baseUrl}-check-email?email=${email}`;
    return this.http.get<boolean>(url);
  }
}
