import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthStatus } from '../interfaces';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
  })
  export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}
  
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      const authStatus = this.authService.getAuthStatus();
  
      // Verifica si el usuario está autenticado según el estado de autenticación y si hay un token en las cookies
      if (authStatus === AuthStatus.authenticated) {
        console.log('Autenticado');
        return true;
      } else if (authStatus === AuthStatus.notAuthenticated) {
        console.log('No autenticado');
        // Redirige a la página de inicio de sesión si no está autenticado
        this.router.navigateByUrl('/sessions/signin');
        return false;
      } else {
        // AuthStatus.checking o cualquier otro estado
        console.log('Verificando...');
        if (this.authService.isAuthenticated()) {
          return true;
        } else {
          this.router.navigateByUrl('/sessions/signin');
          return false;          
        }
      }
    }
  }