import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  //Url de la api
  url ='http://localhost:8080/api/categories';
  constructor(
    private http: HttpClient
  ) { }


  // Trae toas las categories
  getAllCategory():Observable<any>{
    return this.http.get(this.url);
  }

  //Ruta para verificar si ya esxite una categoria
  getValidateCategoryExist(name_category: boolean): Observable<boolean>{
    return this.http.get<boolean>(`${this.url}-validate-categoryexist?name_category=${name_category}`);
  }


//Ruta para crear una categoria

  createCategory(categoriaData: any):Observable<any>{
    return this.http.post(this.url, categoriaData)
  }




  getCategoryById(id: number): Observable<any> {
    if (isNaN(id) || id <= 0) {
      // Aquí puedes manejar el caso en el que 'id' no sea un número válido o sea negativo.
      return throwError('ID de categoría no válido');
    }
  
    return this.http.get<any>(`${this.url}/${id}`);
  }
  


  CategoryChangeStatus(id: any): Observable<any> {
    return this.http.put(this.url + '/change-status' + id, {});
  }




  categoryPut(id: any):Observable<any>{
    return this.http.put(this.url + '/' + id, {});
  }


  updateCategory(id: number, updatedData: any): Observable<any> {
    return this.http.put(`${this.url}/${id}`, updatedData).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error en la solicitud:', error);
        return throwError('Ocurrió un error al actualizar la categoría. Por favor, inténtalo de nuevo.');
      })
    );
  }
  

}