
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject} from 'rxjs';
import { map } from 'rxjs/operators';
import { MovieModel } from '../shared/models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  /*
    > La base de RxJs : des Observables. 
      documentation : https://rxjs.dev/guide/overview

    > Un Observable expose la methode Observable.subscribe(callback)
      Observable.Subscribe() permet de réagir au changement, en executant une callback définie en argument. Ainsi nous pouvons réagir au changement de donnée de façon asynchrone. C'est de la programmation dite "reactive".

    > Les subjects et behaviorSubjects sont des Observable particuliers : 
    - on peut s'abonner Subject.subscribe()
    - on peut pousser une nouvelle donnée Subject.next(value)
    (documentation : https://rxjs.dev/guide/subject)

    > Différence entre Subject et BehaviorSubject
      ** BehaviorSubject : au moment où on subscribe, on récupere la dernière valeur.
         A l'instanciation il oblige à passer une valeur en paramètres.
      ** Subject : au moment où on subscribe, la methode ne peut récuperer 
         que la PROCHAINE valeur
  */
  private movies$:BehaviorSubject<any> = new BehaviorSubject([]);
  private indexPage:number = 1;

  /*
    Injection de dépendance : 
    > on déclare la propriété http instance de HttpClient (en param de constructor)
      this.http exposera les méthodes get(), post(), delete(), put(),...
    > Ces méthodes retournent des Observable, 
      on peut donc y souscrire avec .subscribe() afin de réagir à la réponse serveur
  */
  constructor(private http:HttpClient) {
    console.log(this); // voir l'objet ListComponent dans la console
  }
 

  /*
    getMoviesFromApi()
    rôle : > faire une request HTTP[GET] à l'API theMovieDB
           > et pousser la donnée :MovieModel[] dans le Subject movies$
    endpoint : /discover/movie
    queryString : api_key:string, language:string, page:number
  */
  getMoviesFromApi():void {
    // 1 définition de l'objet HttpParams
    let params = new HttpParams()
    .set('api_key', 'efdeb661aaa006b1e4f36f990a5fd8fd')
    .set('language', 'fr')
    .set('page', this.indexPage);

    // http.get(url, options) => Observable
    this.http.get('https://api.themoviedb.org/3/discover/movie', {params})
    // mapper la réponse à l'aide de pipe() et de l'opérateur RxJs map()
    .pipe(
      map( (apiResponse:any) => {
        return apiResponse.results.map((movie: any) => new MovieModel(movie))
      })
    ) // fin du pipe() NB : Observable.pipe()retourne un Observable,

    .subscribe( (movies:MovieModel[]) => {
      console.log("objets mappés: ", movies);
      let actualMovies = this.movies$.getValue();
      let allMovies:any = [...actualMovies, ...movies];
      // pousser la donnee allMovies dans movies$
      this.movies$.next(allMovies);  
    });

    this.indexPage = this.indexPage + 1;
    // => Maintenant côté component (ListComponent), je peux m'abonner à movies$
  }



  /* 
    rôle : getter de _movies$ - return un Observable 
    Nos components peuvent consommer : > this.movieSvc.movies$.subscribe()
  */
  getMovies$() {
    return this.movies$.asObservable()
  }

  /* 
    rôle : getter de _movies$ - return un Observable 
    Nos components peuvent consommer : > this.movieSvc.movies$.subscribe()
  */
  setMovie$(movies:any) {
    this.movies$.next(movies);
  }


}
