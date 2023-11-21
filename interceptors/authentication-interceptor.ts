import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { promise } from 'protractor';

@Injectable()
export class MyInterceptor implements HttpInterceptor {

  
  constructor( 
    private cookieService: CookieService,
    ) {}
    intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.cookieService.get("token");
    console.log(token);
    
  
    // You can modify the request before it is sent
    request = request.clone({
      // Add headers or perform other modifications
      setHeaders: {
        'x-token': token ?? '',
      },
    });

    // Pass the modified request to the next handler
    return next.handle(request);
 
  }
}
