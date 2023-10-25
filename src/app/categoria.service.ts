import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http : HttpClient) {  }


obtenerDatosDeAPI() {
  return this.http.get('URL_DE_TU_API');
}
}