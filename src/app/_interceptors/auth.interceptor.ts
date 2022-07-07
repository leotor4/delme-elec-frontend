import { MessageService } from 'primeng/api';
import { HTTP_INTERCEPTORS, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';

import { TokenStorageService } from '../_services/token-storage.service';
import {TranslateService} from "@ngx-translate/core";

const TOKEN_HEADER_KEY = 'Authorization';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenStorageService,
              private messageService : MessageService,
              public translate: TranslateService) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let authReq = req;
    const token = this.tokenService.getToken();
    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }

    return next.handle(authReq).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        this.translate.getTranslation("pt").subscribe(data=>{
          if (error.status == 401) {
            this.tokenService.signOut();
            this.messageService.add({
              severity: "error",
              summary: data.login.error4,
              life: 3000,
            });
          } else if (error.status == 404) {
            this.messageService.add({
              severity: "error",
              summary: data.login.error5,
              life: 3000,
            });
          }  else if (error.status == 400) {
            this.messageService.add({
              severity: "error",
              summary: data.login.error6,
              life: 3000,
            });
          } else {
            this.messageService.add({
              severity: "error",
              summary: data.login.error7,
              life: 3000,
            });
          }
        })


        
        return throwError(() => error);      })
    ); 
  }
}



export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
