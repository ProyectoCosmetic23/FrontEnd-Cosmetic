import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class DefectiveProductsService {
    url = 'https://api-cosmetic-1iuc.onrender.com/api/returns';

    constructor(private http: HttpClient) { }

    getAllDefectiveProducts(): Observable<any> {
        return this.http.get(this.url);
    }


    getDefectiveProductsById(id: number): Observable<any> {
        return this.http.get<any>(`${this.url}/${id}`);
    }



}
