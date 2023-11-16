import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  url = 'http://localhost:8080/api/employees';

  constructor(private http: HttpClient) { }

  getAllEmployees():Observable<any>{
    return this.http.get(this.url);
  }

  createEmployee(employee: any): Observable<any> {
    return this.http.post(this.url, employee).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error en la solicitud:', error);
        return throwError('Ocurrió un error al crear el empleado. Por favor, inténtalo de nuevo.');
      })
    );
  }

  updateEmployee(id: number, updatedData: any): Observable<any> {
    return this.http.put(`${this.url}/${id}`, updatedData).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error en la solicitud:', error);
        return throwError('Ocurrió un error al actualizar el empleado. Por favor, inténtalo de nuevo.');
      })
    );
  }
  



checkCedulaAvailability(cedula: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}-check-cedula?cedula=${cedula}`);
}

checkEmailAvailability(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}-check-email?email=${email}`);
}

getEmployeesById(id: number): Observable<any> {
  return this.http.get<any>(`${this.url}/${id}`);
}


employeeChangeStatus(id: any): Observable<any> {
  return this.http.put<boolean>(`${this.url}/changeState/${id}`, {});

}

}


