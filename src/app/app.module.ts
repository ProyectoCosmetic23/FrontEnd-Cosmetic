import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxPaginationModule } from "ngx-pagination";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SharedModule } from "./shared/shared.module";
import { MyInterceptor } from "interceptors/authentication-interceptor";
import { CookieService } from "ngx-cookie-service";
import { AuthService } from "./shared/services/auth.service";
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [AppComponent],
  imports: [
  
    BrowserAnimationsModule,
    FormsModule,
    BrowserModule,
    SharedModule,
    NgxPaginationModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule, 
  ],
  providers: [CookieService,AuthService,HttpClient,
   {
provide: HTTP_INTERCEPTORS,
useClass: MyInterceptor,
      multi: true,
    }
    ,
    
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
