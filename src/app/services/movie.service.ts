
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {


  movies$:Subject<any> = new Subject()

  constructor(private http:HttpClient) {
    console.log(this.movies$);
   }
  //  l'objet http de la class HttpClient
  //  dispose des méthodes get(), post(), delete(), put(), ....

  /*
    La librairie HttpClient utilise la librairie RXJS
    ReactiveX : permet de faire de la programmation reactive

    > LA base de RxJs : des Observables
    > un Observable dispose de la methode Observable.subscribe()

    > Subject un type d'Observable
      - on peut s'abonner Subject.subscribe()
      - on peut modifier la valeur Subject.next()
  */
  



  getMoviesFromApi():Observable<any> {
    return this.http.get('https://api.themoviedb.org/3/discover/movie?api_key=efdeb661aaa006b1e4f36f990a5fd8fd&language=fr')
    
  }


}
