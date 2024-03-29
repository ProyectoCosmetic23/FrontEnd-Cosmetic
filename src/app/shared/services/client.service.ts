import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root'
})
export class ClientsService {
    url = environment.url + '/api/clients';

    constructor(private http: HttpClient) { }

    getAllClients(): Observable<any> {
        return this.http.get(this.url);
    }

    createClient(client: any): Observable<any> {
        return this.http.post(this.url, client).pipe(
            catchError((error: HttpErrorResponse) => {
                console.error('Error en la solicitud:', error);
                return throwError('Ocurrió un error al crear el cliente. Por favor, inténtalo de nuevo.');
            })
        );
    }

    updateClient(id: number, updatedData: any): Observable<any> {
        return this.http.put(`${this.url}/${id}`, updatedData).pipe(
            catchError((error: HttpErrorResponse) => {
                console.error('Error en la solicitud:', error);
                return throwError('Ocurrió un error al actualizar el cliente. Por favor, inténtalo de nuevo.');
            })
        );
    }

    checkCedulaAvailability(cedula: string): Observable<boolean> {
        return this.http.get<boolean>(`${this.url}-check-cedula?cedula=${cedula}`);
    }

    checkEmailAvailability(email_client: string): Observable<boolean> {
        return this.http.get<boolean>(`${this.url}-check-email?email=${email_client}`);
    }

    getClientsById(id: number): Observable<any> {
        return this.http.get<any>(`${this.url}/${id}`);
    }


    clientChangeStatus(id: any, reason: any): Observable<any> {
        return this.http.put<boolean>(`${this.url}/change-status/${id}`, {reasonAnulate: reason });

    }

}
