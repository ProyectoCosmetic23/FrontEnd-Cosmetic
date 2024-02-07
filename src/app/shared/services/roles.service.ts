import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs-compat';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  url = environment.url +'/api';
  constructor(
    private http: HttpClient
  ) { }

  getAllRoles(): Observable<any> {
    return this.http.get(this.url + '/roles');
  }

  getRoleById(id: any): Observable<any> {
    return this.http.get(this.url + '/roles/' + id);
  }

  validateRoleName(name: string): Observable<any> {
    return this.http.get(`${this.url}/validate-role/${name}`);
  }

  createRole(roleData: any): Observable<any> {
    return this.http.post(this.url + '/roles/', roleData);
  }

  editRole(id: any, roleData: any): Observable<any> {
    return this.http.put(this.url + '/roles/update/' + id, roleData);
  }

  updateRoleStatus(id: any, roleData: any): Observable<any> {
    return this.http.put(this.url + '/roles/updateStatus/' + id, roleData);
  }
}
