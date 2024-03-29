import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root",
})
export class UsersService {
  getEmployeeById(id: number) {
      throw new Error("Method not implemented.");
  }
  url = environment.url + "/api/users";
  url2 = environment.url + "/api/roles";
  url3 = environment.url + "/api/employees";

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this.http.get(this.url);
  }

  createUser(user: any): Observable<any> {
    return this.http.post(this.url, user).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error("Error en la solicitud:", error);
        return throwError(
          "Ocurrió un error al crear el usuario. Por favor, inténtalo de nuevo."
        );
      })
    );
  }

  updateUser(id: number, updatedData: any): Observable<any> {
    return this.http.put(`${this.url}/${id}`, updatedData).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error("Error en la solicitud:", error);
        return throwError(
          "Ocurrió un error al actualizar el usuario. Por favor, inténtalo de nuevo."
        );
      })
    );
  }

  checkEmailAvailability(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}-check-email?email=${email}`);
  }

  getUsersById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  userChangeStatus(id: any, reason?: string): Observable<any> {
     // Agregamos la razón al cuerpo de la solicitud
     
     const body = reason ? { reason_anulate: reason } : {};
    return this.http.put<boolean>(`${this.url}/state/${id}`,body, {});
    
  }

  getAllRoles(): Observable<any> {
    return this.http.get(this.url2);
  }

  getEmployeeByEmail(idCard: string): Observable<any> {
    const url = `${this.url}/employeeByCard/${idCard}`;

    return this.http.get(url).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error("Error al obtener el correo del empleado:", error);
        return throwError("Ocurrió un error al buscar el correo del empleado.");
      })
    );
  }

  getEmployeesById(id: number): Observable<any> {
    const url = `${this.url3}/${id}`;
    return this.http.get<any>(url);
  }

  checkEmployeeAvailability(id_employee: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}-check-empleado?id_employee=${id_employee}`);
  }
}
