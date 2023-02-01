
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  // private movies$:Subject<any> = new Subject();
  private movies$:BehaviorSubject<any> = new BehaviorSubject([]);
  private indexPage:number = 1;

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
  getMoviesFromApi():void {
    // 1 je fais la requete http
    // 2 je pousser la donnee (la reponse) dans movies$
    // 3 => Maintenant côté component (ListComponent), je peux m'abonner à movies$
    this.http.get('https://api.themoviedb.org/3/discover/movie?api_key=efdeb661aaa006b1e4f36f990a5fd8fd&language=fr&page='+this.indexPage)
    .subscribe( (response:any) => {
      let actualMovies = this.movies$.getValue(); 
      let allMovies:any = [...actualMovies, response.results]
      this.movies$.next(allMovies);
    });

    this.indexPage = this.indexPage + 1;
  }


  getMovies$() {
    return this.movies$.asObservable()
  }

  setMovie$(movies:any) {
    this.movies$.next(movies);
  }


}
