import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router:Router, private alertSvc:AlertService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request) // continuer ton chemin la requête 
                                 // > soit vers le prochain interceptor
                                 // > soit vers le backend
    .pipe(
      tap( {
        error: (err) => {
          console.log(err)
          if(err instanceof HttpErrorResponse) {
            switch(err.status) {
              case 400:
             this.alertSvc.showAlert("Mauvaise requête (err 400)")
              break;
              case 401:
                this.alertSvc.showAlert("Vous n'êtes pas authentifié(e)");
                this.router.navigate(['/login']);
              break;
              case 403:
                this.alertSvc.showAlert("Vous n'êtes pas autorisé(e)")
                // this.router.navigate(['/login']);
              break;
              case 404:
                this.alertSvc.showAlert("La ressource n'est pas disponible")
              break;

              default:
              this.alertSvc.showAlert("Erreur serveur")
            }
          }

        },
      })
    )
  }
}
