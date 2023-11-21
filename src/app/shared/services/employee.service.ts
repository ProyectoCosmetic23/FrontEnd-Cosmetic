import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  baseUrl = 'http://localhost:8080/api/employees';

  constructor(private http: HttpClient) { }

  getAllEmployees(token?: string): Observable<any[]> {
    const headers = token ? new HttpHeaders().set('x-token', token) : undefined;
    return this.http.get<any[]>(this.baseUrl, { headers });
  }

  createEmployee(employee: any, token?: string): Observable<any> {
    const headers = token ? new HttpHeaders().set('x-token', token) : undefined;
    return this.http.post(this.baseUrl, employee, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error en la solicitud:', error);
        return throwError('Ocurrió un error al crear el empleado. Por favor, inténtalo de nuevo.');
      })
    );
  }

  updateEmployee(id: number, updatedData: any, token?: string): Observable<any> {
    const headers = token ? new HttpHeaders().set('x-token', token) : undefined;
    return this.http.put(`${this.baseUrl}/${id}`, updatedData, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error en la solicitud:', error);
        return throwError('Ocurrió un error al actualizar el empleado. Por favor, inténtalo de nuevo.');
      })
    );
  }
  



checkCedulaAvailability(cedula: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}-check-cedula?cedula=${cedula}`);
}

checkEmailAvailability(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}-check-email?email=${email}`);
}

getEmployeesById(id: number, token?: string): Observable<any> {
  const headers = token ? new HttpHeaders().set('x-token', token) : undefined;
  const url = `${this.baseUrl}/${id}`;
  return this.http.get<any>(url, { headers });
}

employeeChangeStatus(id: number, token?: string): Observable<any> {
  const headers = token ? new HttpHeaders().set('x-token', token) : undefined;
  const url = `${this.baseUrl}/changeState/${id}`;
  return this.http.put<any>(url, {}, { headers });
}

}


