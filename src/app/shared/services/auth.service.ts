import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import {
  AuthStatus,
  LoginResponse,
  User,
  checkTokenResponse,
} from "../interfaces";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly userSessionStorageKey = "currentUser";

  private readonly baseUrl: string = environment.baseUrl;

  private _currentUser: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  currentUser: Observable<User | null> = this._currentUser.asObservable();
  private _authStatus: BehaviorSubject<AuthStatus> =
    new BehaviorSubject<AuthStatus>(AuthStatus.checking);

  public authStatus: Observable<AuthStatus> = this._authStatus.asObservable();

  public getAuthStatus(): AuthStatus {
    return this._authStatus.value;
  }

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  isAuthenticated(): boolean {
    const token = this.cookieService.get("token");
    console.log(token);
    return !!token; // Devuelve true si hay un token, de lo contrario, false
  }

  private setAuthentication(user: User, token: string): boolean {
    const userJson = user ? JSON.stringify(user) : null;
    sessionStorage.setItem(this.userSessionStorageKey, userJson);

    // Calcular la fecha de expiración en una hora
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 1);

    // Insertar el token en las cookies
    this.cookieService.set("token", token, {
      sameSite: "Strict",
      expires: expirationDate,
    });

    // Comprobar si el token se insertó correctamente
    const isTokenSet = this.cookieService.get("token") === token;

    if (!isTokenSet) {
      console.error("Error al insertar el token en las cookies.");
      return false;
    }

    // Establecer el estado de autenticación
    this._authStatus.next(AuthStatus.authenticated);

    console.log(
      "Token insertado en las cookies:",
      this.cookieService.get("token")
    );

    return true;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 401) {
      // Credenciales incorrectas
      return throwError(
        "Credenciales incorrectas. Por favor, inténtelo de nuevo."
      );
    } else if (error.status === 0) {
      // No se puede conectar al servidor
      return throwError(
        "No se puede conectar al servidor. Por favor, inténtelo más tarde."
      );
    } else {
      // Otro tipo de error
      return throwError(
        "Error desconocido. Por favor, contacte al soporte técnico."
      );
    }
  }

  private checkAuthStatusAfterLogin(): Observable<boolean> {
    return this._authStatus.pipe(
      // Utilizar switchMap para esperar a que el estado de autenticación cambie a "authenticated"
      switchMap((status) => {
        if (status === AuthStatus.authenticated) {
          // Si el estado es "authenticated", regenera un nuevo token aquí
          console.log("Regenerating token...");

          // Después de regenerar el token, actualiza el estado de autenticación
          this._authStatus.next(AuthStatus.authenticated);

          // Continúa con el flujo normal
          return of(true);
        } else {
          // Si el estado no es "authenticated", retorna false
          return of(false);
        }
      })
    );
  }

  login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/users/login`;
    const body = { email, password };

    return this.http.post<LoginResponse>(url, body).pipe(
      map(({ user, token }) => {
        this.setAuthentication(user, token);
        console.log("Token:", token); // Imprime el token
        this.checkAuthStatusAfterLogin();
        // Llamar al nuevo método para verificar el estado de autenticación después de iniciar sesión
        return true;
      }),
      catchError(this.handleError)
    );
  }

  getStoredUser(): User | null {
    const storedUser = sessionStorage.getItem(this.userSessionStorageKey);
    return storedUser ? JSON.parse(storedUser) : null;
  }

  logout() {
    this._currentUser.next(null);
    this._authStatus.next(AuthStatus.notAuthenticated);
    this.cookieService.delete("token");
    sessionStorage.removeItem(this.userSessionStorageKey);
  }
}
