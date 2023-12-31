import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs-compat';
import { Utils } from 'src/app/shared/utils';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {

  //Url de la api
  url = environment.url +'/api/purchases';
  constructor(
    private http: HttpClient
  ) { }

  
  // Trae toas las purchase
  getAllPurchase():Observable<any>{
    return this.http.get(this.url);
  }

  //Ruta para verificar si ya esxite una categoria
  getValidatePurchaseExist(invoice_number: boolean): Observable<boolean>{
    return this.http.get<boolean>(`${this.url}-validate-invoiceexist?invoice_number=${invoice_number}`);
  }


//Ruta para crear una categoria

  createPurchase(categoriaData: any):Observable<any>{
    return this.http.post(this.url, categoriaData)
  }


  //Ruta para traer una categoria en especifico
  getPurchaseById(id: number):Observable<any>{
    if (typeof id !== 'number' || isNaN(id)) {
      // Manejar el caso en el que id no sea un número válido, por ejemplo, mostrar un error.
      console.error('ID de categoría no válido');
      
    }
    return this.http.get<any>(`${this.url}/${id}`);
  }


  //Ruta para cambiar el estado de una categoria
  PurchaseChangeStatus(id: any, reason: any):Observable<any>{
    return this.http.put(this.url + '/anulate/' + id, {reasonAnulate: reason});


  }



  categoryPut(id: any):Observable<any>{
    return this.http.put(this.url + '/' + id, {});
  }
}