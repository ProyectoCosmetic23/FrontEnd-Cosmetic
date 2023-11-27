import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs-compat';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  url = environment.url +'/api/employees';
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getAllEmployes(): Observable<any> {
    return this.http.get(this.url);
  }
}
