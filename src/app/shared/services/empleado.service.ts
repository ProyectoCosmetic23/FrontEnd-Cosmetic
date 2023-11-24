import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs-compat';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  url = 'https://api-cosmetic-1iuc.onrender.com/api/employees';
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getAllEmployes(): Observable<any> {
    return this.http.get(this.url);
  }
}
