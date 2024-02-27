import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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

  updateProviderStatus(id: any, reason?: string): Observable<any> {
    const url = `${this.baseUrl}/state/${id}`;
    
    // Agregamos la razón al cuerpo de la solicitud
    const body = reason ? { reason_anulate: reason } : {};
    // console.log("reason", body);
    return this.http.put<any>(url, body).pipe(
      catchError((error: HttpErrorResponse) => {
        // console.error('Error en la solicitud:', error);
        return throwError('Ocurrió un error al cambiar el estado del proveedor. Por favor, inténtalo de nuevo.');
      })
    );
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
