import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs-compat';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  url ='http://localhost:8080/api/empleados';
  constructor(
    private http: HttpClient
  ) { }

  getAllEmployes():Observable<any>{
    return this.http.get(this.url);
  }
}
