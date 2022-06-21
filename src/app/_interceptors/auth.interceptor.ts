import { MessageService } from 'primeng/api';
import { HTTP_INTERCEPTORS, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';

import { TokenStorageService } from '../_services/token-storage.service';

const TOKEN_HEADER_KEY = 'Authorization';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenStorageService, private messageService : MessageService) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let authReq = req;
    const token = this.tokenService.getToken();
    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }

    return next.handle(authReq).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        

        if (error.status == 401) {
          this.tokenService.signOut();
          this.messageService.add({
            severity: "error",
            summary: "Faça login para acessar o sistema",
            life: 3000,
          });
        } else if (error.status == 404) {
          this.messageService.add({
            severity: "error",
            summary: "Página não encontrada",
            life: 3000,
          });
        }  else if (error.status == 400) {
          this.messageService.add({
            severity: "error",
            summary: "Credenciais Inválidas",
            life: 3000,
          });
        } else {
          this.messageService.add({
            severity: "error",
            summary: "Ocorreu um erro no servidor!!",
            life: 3000,
          });
        }

        
        return throwError(() => error);      })
    ); 
  }
}



export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
