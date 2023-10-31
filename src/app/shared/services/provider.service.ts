import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs-compat';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  url ='http://localhost:8080/api/proveedores';
  constructor(
    private http: HttpClient
  ) { }

  getAllProviders():Observable<any>{
    return this.http.get(this.url);
  }
}
