import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { ToastrService } from "ngx-toastr";
import { RolesService } from "./roles.service";
import { AuthStatus, LoginResponse, User } from "../interfaces";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { NavigationService } from "./navigation.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly userSessionStorageKey = "currentUser";

  private readonly baseUrl: string = environment.url;

  private _currentUser: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  currentUser: Observable<User | null> = this._currentUser.asObservable();
  private _authStatus: BehaviorSubject<AuthStatus> =
    new BehaviorSubject<AuthStatus>(AuthStatus.checking);

  public authStatus: Observable<AuthStatus> = this._authStatus.asObservable();

  public getAuthStatus(): AuthStatus {
    return this._authStatus.value;
  }

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private toastr: ToastrService,
    private rolesService: RolesService,
    private navigationService: NavigationService,
    private router: Router
  ) {}

  isAuthenticated(): boolean {
    const token = this.cookieService.get("token");
    return !!token;
  }

  private setAuthentication(user: User, token: string): boolean {
    const userJson = user ? JSON.stringify(user) : null;
    sessionStorage.setItem(this.userSessionStorageKey, userJson);

    // Calcular la fecha de expiración en una hora
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 1);

    // Insertar el token en las cookies
    this.cookieService.set(
      "token",
      token
      // , {
      //   sameSite: "Strict",
      //   expires: expirationDate,
      // }
    );

    // Comprobar si el token se insertó correctamente
    const isTokenSet = this.cookieService.get("token") === token;

    if (!isTokenSet) {
      console.error("Error al insertar el token en las cookies.");
      return false;
    }

    // Establecer el estado de autenticación
    this._authStatus.next(AuthStatus.authenticated);

    return true;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 401) {
      // Credenciales incorrectas
      return throwError('Credenciales incorrectas. Por favor, inténtelo de nuevo.');
    } else if (error.status === 0) {
      // No se puede conectar al servidor
      return throwError('No se puede conectar al servidor. Por favor, inténtelo más tarde.');
    } else {
      // Otro tipo de error
      let errorMessage = 'Error desconocido. Por favor, contacte al soporte técnico.';
      if (error.error && error.error.error) {
        errorMessage = error.error.error;
      }
      return throwError(errorMessage);
    }
  }

  private checkAuthStatusAfterLogin(): Observable<boolean> {
    return this._authStatus.pipe(
      // Utilizar switchMap para esperar a que el estado de autenticación cambie a "authenticated"
      switchMap((status) => {
        if (status === AuthStatus.authenticated) {
          // Si el estado es "authenticated", regenera un nuevo token aquí
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
    const url = `${this.baseUrl}/api/users/login`;
    const body = { email, password };

    return this.http.post<LoginResponse>(url, body).pipe(
      switchMap(({ user, token }) => {
        // Verificar si el usuario está inactivo
        if (user && user.state_user === "Inactivo") {
          // Mostrar mensaje de error utilizando Toastr
          this.toastr.error(
            "El usuario está inactivo.",
            "Error de autenticación",
            {
              progressBar: true,
              timeOut: 3000,
            }
          );
        }
        // Establecer la autenticación y actualizar el estado de autenticación
        const isAuthenticationSet = this.setAuthentication(user, token);
        if (isAuthenticationSet) {
          // Establecer el estado de autenticación
          this._authStatus.next(AuthStatus.authenticated);
          // Mostrar mensaje de inicio de sesión exitoso utilizando Toastr
          this.toastr.success("Inicio de sesión exitoso", "¡Bienvenido!", {
            progressBar: true,
            timeOut: 3000,
          });
          this.navigationService.validateUserModulesPermission();
          return of(true);
        } else {
          return throwError("Error al autenticar al usuario.");
        }
      }),
      catchError((error: HttpErrorResponse) => {
        // Manejar el error utilizando el método handleError
        return this.handleError(error);
      })
    );
  }

  getStoredUser(): User | null {
    const storedUser = sessionStorage.getItem(this.userSessionStorageKey);
    return storedUser ? JSON.parse(storedUser) : null;
  }

  async validateUserPermissions(modulePermission: string): Promise<boolean> {
    try {
      const storedUser = this.getStoredUser();
      const roleResponse = await this.rolesService
        .getRoleById(storedUser.id_role)
        .toPromise();
      // Verifica si el permissionName está presente en alguno de los módulos del rol
      const hasPermission =
        roleResponse.modules_role.find(
          (module) => module === modulePermission
        ) !== undefined;

      if (!hasPermission) {
        Swal.fire({
          icon: "warning",
          title: "Alerta",
          text: `No tiene permiso para interactuar con este módulo.`,
          confirmButtonText: "Volver al Dashboard",
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            // Redirigir al usuario al dashboard/v1
            this.router.navigate(["/dashboard/v1"]);
          }
        });
      }
    } catch (error) {
      console.error("Error al validar permisos:", error);
      return false;
    }
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/users/recover`, { email });
  }

  changePassword(token: string, newPassword: string): Observable<any> {
    const url = `${this.baseUrl}/api/change-password/${token}`;
    const body = { token, newPassword };

    return this.http.post(url, body).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => {
        // Imprime el error completo en la consola
        console.error("Error al cambiar la contraseña:", error);
        return throwError(error);
      })
    );
  }

  logout() {
    this._currentUser.next(null);
    this._authStatus.next(AuthStatus.notAuthenticated);
    this.cookieService.deleteAll("token");
    sessionStorage.removeItem(this.userSessionStorageKey);
    this.router.navigate(["/sessions/signin"]);
    this.navigationService.cleanItems();
  }
}
