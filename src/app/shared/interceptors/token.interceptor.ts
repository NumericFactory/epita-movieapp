import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  cloneRequest!:HttpRequest<unknown>;

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   
    let token = localStorage.getItem('token');
    


    console.log(request); // 
    if(request.url.includes('https://api-user-server.herokuapp.com/api/comments')) {
      if(request.method == 'POST') {
        this.cloneRequest = request
        .clone({headers: request.headers.set('Authorization', 'Bearer '+token)})
      }
    }
    else {
      this.cloneRequest = request;
    }

    return next.handle(this.cloneRequest);
  }
}
