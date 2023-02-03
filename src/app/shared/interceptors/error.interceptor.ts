import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request) // continuer ton chemin la requête 
                                 // > soit vers le prochain interceptor
                                 // > soit vers le backend
    .pipe(
      tap( {
        error(err) {
          console.log(err)
        },
      })
    )
  }
}
