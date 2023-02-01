
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject} from 'rxjs';
import { map } from 'rxjs/operators';
import { MovieModel } from '../shared/models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  //private movies$:Subject<any> = new Subject();
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
    let params = new HttpParams()
    .set('api_key', 'efdeb661aaa006b1e4f36f990a5fd8fd')
    .set('language', 'fr')
    .set('page', this.indexPage);

    // MAPPER UNE REPONSE
    /*
      - Les opérateurs (pipe, map, filter, etc...) retourne des Observable
      - Ici:
        > this.http.get().pipe()retourne un Observable
        > l'opérateur map permet de mapper notre réponse API et retourne observable
    */
    this.http.get('https://api.themoviedb.org/3/discover/movie', {params})
    .pipe(
      map( (apiResponse:any) => apiResponse.results.map( 
          (movie: any) => new MovieModel(movie) 
        ) 
      )
    ) // fin du pipe()
    // executer la request HTTP
    .subscribe( (movies:MovieModel[]) => {

      console.log(movies);
      let actualMovies = this.movies$.getValue();
      let allMovies:any = [...actualMovies, ...movies];
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
