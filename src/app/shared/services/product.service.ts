import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = 'http://localhost:8080/api/productcs';

  constructor(private http: HttpClient) { }

  getAllProducts(token?: string):Observable<any[]>{
    const headers = token ? new HttpHeaders().set('x-token', token) : undefined;
    return this.http.get<any[]>(this.baseUrl, { headers });
  }

  createProduct(product: any, token?: string): Observable<any> {
    const headers = token ? new HttpHeaders().set('x-token', token) : undefined;
    return this.http.post(this.baseUrl, product, { headers }).pipe(
        catchError((error: HttpErrorResponse) => {
            console.error('Error en la solicitud:', error);
            return throwError('Ocurrió un error al crear el producto. Detalles: ' + error.error);
        })
    );
}

  updateProduct(id: number, updatedData: any,token?: string): Observable<any> {
    const headers = token ? new HttpHeaders().set('x-token', token) : undefined;
    return this.http.put(`${this.baseUrl}/${id}`, updatedData, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error en la solicitud:', error);
        return throwError('Ocurrió un error al actualizar el producto. Por favor, inténtalo de nuevo.');
      })
    );
  }
  

  getProductsById(id: number,token?: string): Observable<any> {
    const headers = token ? new HttpHeaders().set('x-token', token) : undefined;
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<any>(url, { headers });
  }
  
  
  productChangeStatus(id: any,token?: string): Observable<any> {
    const headers = token ? new HttpHeaders().set('x-token', token) : undefined;
    const url = `${this.baseUrl}/changeState/${id}`;
    return this.http.put<any>(url, {}, { headers });
  
  }

}


