import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root'
})
export class ReportService {
    url = environment.url + '/api/';
    urlPrediccion = 'https://cosmeticproyecto.pythonanywhere.com/get_top_products'

    constructor(private http: HttpClient) { }

    getReportProducts(report_is_yearly:boolean, year_data:number, month_data:number): Observable<any> {
        return this.http.get(`${this.url}report-products?report_is_yearly=${report_is_yearly}&&year_data=${year_data}&&month_data=${month_data}`);
    }

    getReportSales(year_data:number): Observable<any> {
        return this.http.get(`${this.url}report-sales?year_data=${year_data}`);
    }

    getReportCards(report_is_yearly:boolean, year_data:number, month_data:number): Observable<any> {
        return this.http.get(`${this.url}report-cards?report_is_yearly=${report_is_yearly}&&year_data=${year_data}&&month_data=${month_data}`);
    }

    getReportEmployees(report_is_yearly:boolean, year_data:number, month_data:number): Observable<any> {
        return this.http.get(`${this.url}report-employees?report_is_yearly=${report_is_yearly}&&year_data=${year_data}&&month_data=${month_data}`);
    }

    getPredictions(){
       return this.http.get(this.urlPrediccion)
    }

}
