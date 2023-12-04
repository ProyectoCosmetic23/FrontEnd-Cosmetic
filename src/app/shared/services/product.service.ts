import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = environment.url + '/api/productcs';

  constructor(private http: HttpClient) { }

  getAllProducts(token?: string):Observable<any[]>{
    const headers = token ? new HttpHeaders().set('x-token', token) : undefined;
    return this.http.get<any[]>(this.url, { headers });
  }

  createProduct(product: any, token?: string): Observable<any> {
    const headers = token ? new HttpHeaders().set('x-token', token) : undefined;
    return this.http.post(this.url, product, { headers }).pipe(
        catchError((error: HttpErrorResponse) => {
            console.error('Error en la solicitud:', error);
            return throwError('Ocurrió un error al crear el producto. Detalles: ' + error.error);
        })
    );
}

  updateProduct(id: number, updatedData: any,token?: string): Observable<any> {
    const headers = token ? new HttpHeaders().set('x-token', token) : undefined;
    return this.http.put(`${this.url}/${id}`, updatedData, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error en la solicitud:', error);
        return throwError('Ocurrió un error al actualizar el producto. Por favor, inténtalo de nuevo.');
      })
    );
  }
  retireProduct(id: number, data: any): Observable<any> {
    const url = `${this.url}/retire/${id}`;
    return this.http.put(url, data);
  }

  getProductsById(id: number,token?: string): Observable<any> {
    const headers = token ? new HttpHeaders().set('x-token', token) : undefined;
    const url = `${this.url}/${id}`;
    return this.http.get<any>(url, { headers });
  }
  
  
  productChangeStatus(id: any, token?: string, reason?: string): Observable<any> {
    const headers = token ? new HttpHeaders().set('x-token', token) : undefined;
    const url = `${this.url}/changeState/${id}`;
  
    // Agregamos la razón al cuerpo de la solicitud
    const body = reason ? { reason_anulate: reason } : {};
  
    return this.http.put<any>(url, body, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error en la solicitud:', error);
        return throwError('Ocurrió un error al cambiar el estado del producto. Por favor, inténtalo de nuevo.');
      })
    );
  }
  


getValidateProductExist(id_category: number , name_product: string): Observable<boolean>{
  return this.http.get<boolean>(`${this.url}-validate-productexist?id_category=${id_category}&&name_product=${name_product}`);
}



}


