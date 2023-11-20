import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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

  getAllProducts():Observable<any>{
    return this.http.get(this.url);
  }

  createProduct(product: any): Observable<any> {
    return this.http.post(this.url, product).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error en la solicitud:', error);
        return throwError('Ocurrió un error al crear el producto. Por favor, inténtalo de nuevo.');
      })
    );
  }

  updateProduct(id: number, updatedData: any): Observable<any> {
    return this.http.put(`${this.url}/${id}`, updatedData).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error en la solicitud:', error);
        return throwError('Ocurrió un error al actualizar el producto. Por favor, inténtalo de nuevo.');
      })
    );
  }
  

  getProductsById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }
  
  
  productChangeStatus(id: any): Observable<any> {
    return this.http.put<boolean>(`${this.url}/changeState/${id}`, {});
  
  }
getProducts() {
  return this.http.get('api/products');
}


getValidateProductExist(id_category: number , name_product: string): Observable<boolean>{
  return this.http.get<boolean>(`${this.url}-validate-productexist?id_category=${id_category}&&name_product=${name_product}`);
}



}
 

