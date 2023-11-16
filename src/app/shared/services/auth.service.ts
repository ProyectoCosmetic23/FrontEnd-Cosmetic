import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthStatus, LoginResponse, User, checkTokenResponse } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private readonly baseUrl: string = environment.baseUrl;

  private _currentUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  currentUser: Observable<User | null> = this._currentUser.asObservable();
  private _authStatus: BehaviorSubject<AuthStatus> = new BehaviorSubject<AuthStatus>(AuthStatus.checking);

  public authStatus: Observable<AuthStatus> = this._authStatus.asObservable();




  public getAuthStatus(): AuthStatus {
    return this._authStatus.value;
  }


  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {
    this.checkAuthStatus().subscribe();
  }

  private setAuthentication(user: User, token: string): boolean {
    this._currentUser.next(user);
    this.cookieService.set('token', token, { sameSite: 'None' });
    this._authStatus.next(AuthStatus.authenticated);

    console.log(this.cookieService.get('token'));

    return true;
  }

  login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/users/login`;
    const body = { email: email, password: password };
    return this.http.post<LoginResponse>(url, body)
      .pipe(
        map(({ user, token }) => {
          this.setAuthentication(user, token);
          return true;
        }),
        catchError(err => throwError(() => err.error.message))
      );
  }
  
  private checkAuthStatus(): Observable<boolean> {
    console.log('Checking authentication status...');

    const token = this.cookieService.get('token');
    console.log(token)
    if (token == undefined) {

      console.log('No token found. Logging out...');
      this.logout();
      return of(false);
    }

    console.log('Token found. Making request...');

    const url = `'${this.baseUrl}/ruta-protegida'`;

    const headers = new HttpHeaders().set('x-token', token);

    console.log(token);

    return this.http.get<checkTokenResponse>(url, { headers }).pipe(

      map(({ user, token }) => this.setAuthentication(user, token)),

      catchError((error: HttpErrorResponse) => {
        if (error.error && error.error.msg) {
          console.error('Error:', error.error.msg);
        } else {
          console.error('Error desconocido:', error);
        }
        this._authStatus.next(AuthStatus.notAuthenticated);
        return of(false);
      })
    );
  }

  logout() {
    this._currentUser.next(null);
    this._authStatus.next(AuthStatus.notAuthenticated);
    this.cookieService.delete('token');
  }
}
