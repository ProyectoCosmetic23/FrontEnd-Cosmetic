import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthStatus } from '../interfaces';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root',
    })
    export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private CookieService: CookieService,private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        
        const token = this.CookieService.get('token');

        const authStatus = this.authService.getAuthStatus();

        if(authStatus === AuthStatus.authenticated) {
        return true;
        }
        
        // Redirige a la página de inicio de sesión si no está autenticado
     
        this.router.navigateByUrl('/sessions/signin');
        return false;
    }
}
