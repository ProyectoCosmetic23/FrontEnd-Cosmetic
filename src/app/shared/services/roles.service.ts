import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs-compat';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  url = 'https://api-cosmetic-1iuc.onrender.com/api/roles';
  constructor(
    private http: HttpClient
  ) { }

  getAllRoles(): Observable<any> {
    return this.http.get(this.url);
  }

  getRoleById(id: any): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }

  createRole(roleData: any): Observable<any> {
    return this.http.post(this.url + '/', roleData);
  }

  editRole(id: any, roleData: any): Observable<any> {
    return this.http.put(this.url + '/update/' + id, roleData);
  }

  updateRoleStatus(id: any): Observable<any> {
    return this.http.put(this.url + '/updateStatus/' + id, {});
  }
}
