import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class ReturnsService {
    url = 'http://localhost:8080/api/returns';

    constructor(private http: HttpClient) { }
    
    //Obtener todas las devoluciones
    getAllReturns(): Observable<any> {
        return this.http.get(`${this.url}`);
    }

    //Obtener una devolucion por id
    getReturnById(id: number): Observable<any> {
        return this.http.get(`${this.url}/${id}`);
    }

    //procesar la devolucion 
    processReturn(returnData: any): Observable<any> {
        return this.http.post(`${this.url}/processReturn`, returnData).pipe(
            catchError((error: HttpErrorResponse) => {
                return throwError('Error processing return');
            })
        );
    }

    //Crear una venta y cancelar la venta existente 
    createNewSaleAndCancelOldSale(saleData: any): Observable<any> {
        return this.http.post(`${this.url}/createNewSale`, saleData).pipe(
            catchError((error: HttpErrorResponse) => {
                return throwError('Error creating new sale and cancelling old sale');
            })
        );
    }
    
    

    
    





}
