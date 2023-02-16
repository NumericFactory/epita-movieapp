
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject} from 'rxjs';
import { map } from 'rxjs/operators';
import { MovieModel } from '../shared/models/movie.model';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  env = environment;
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
  private _movies$ = new BehaviorSubject<MovieModel[]>([]);
  private _movieDetail$ = new BehaviorSubject<MovieModel | any>({});
  private indexPage:number = 1;

  private _searchedMovies$:BehaviorSubject<any> = new BehaviorSubject([]);

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
           > et pousser la donnée :MovieModel[] dans le Subject _movies$
    endpoint : /discover/movie
    queryString : api_key:string, language:string, page:number
  */
  getMoviesFromApi():void {
    // 1 définition de l'objet HttpParams
    let params = new HttpParams()
    .set('api_key', this.env.API_KEY_TMDB)
    .set('language', 'fr')
    .set('page', this.indexPage);

    let endpoint = '/discover/movie';

    // http.get(url, options) => Observable
    this.http.get(this.env.API_TMDB + '/discover/movie' , {params})
    // mapper la réponse à l'aide de pipe() et de l'opérateur RxJs map()
    .pipe(
      map( (apiResponse:any) => {
        return apiResponse.results.map((movie: any) => new MovieModel(movie))
      })
    ) // fin du pipe() NB : Observable.pipe()retourne un Observable,

    .subscribe( (movies:MovieModel[]) => {
      console.log("objets mappés: ", movies);
      let actualMovies = this._movies$.getValue();
      let allMovies:any = [...actualMovies, ...movies];
      // pousser la donnee allMovies dans _movies$
      this._movies$.next(allMovies);  
    });

    this.indexPage = this.indexPage + 1;
    // => Maintenant côté component (ListComponent), je peux m'abonner à _movies$
  }

   /*
    searchMoviesFromApi()
    endpoint : search/movie/
    param : query:string
    Rôle: Rechercher des films
  */
  searchMoviesFromApi(userSearch:string):void{
    let params = new HttpParams()
    .set('api_key', 'efdeb661aaa006b1e4f36f990a5fd8fd')
    .set('language', 'fr')
    .set('query', userSearch);
    // la request
    this.http.get('https://api.themoviedb.org/3/search/movie', {params})
    // mapper la réponse avec pipe() et de l'opérateur RxJs map()
    .pipe(
      map( (apiResponse:any) => {
        return apiResponse.results.map((movie: any) => new MovieModel(movie))
      })
    ) // fin du pipe() 
      // NB : Observable.pipe()retourne un Observable,
    .subscribe( (foundMovies:MovieModel[]) => this._searchedMovies$.next(foundMovies) )

  }

  /*
    getDetailsFromApi()
    endpoint : /movie/[id]
    Rôle: récupérer le détails d'un film pour le component detail
    On expose getDetailsFromApi()
    (requête Http exécutable dans le component DetailComponent)
  */
  getDetailsFromApi(id:number):void {
    let params = new HttpParams()
    .set('api_key', this.env.API_KEY_TMDB)
    .set('language', 'fr');
    this.http.get(this.env.API_TMDB + '/movie/' + id, {params})
    .pipe(
      map( (apiResponse:any) => new MovieModel(apiResponse))
    ) // fin du pipe() 
      // NB : Observable.pipe()retourne un Observable,
    .subscribe( (movie:MovieModel) => this._movieDetail$.next(movie) )
  }

  /*
    getVideosFromApi()
    endpoint : /movie/[id]/videos
    Rôle : faire la request HTTP 
    On expose getVideosFromApi()
    (consommable directement dans le component DetailComponent avec .subscribe())
  */
  getVideosFromApi(id:number):Observable<unknown> {
    let params = new HttpParams()
    .set('api_key', this.env.API_KEY_TMDB)
    .set('language', 'fr');
    return this.http.get(this.env.API_TMDB + '/movie/' + id + '/videos', {params});
  }



  /* 
    rôle : getter de _movies$ - return un Observable 
    Nos components peuvent consommer : 
    > this.movieSvc.movies$.subscribe()
  */
  get movies$():Observable<MovieModel[]> {
    return this._movies$.asObservable()
  }

  /* 
    rôle : getter de _moviesDetail$ - return un Observable 
    le component DetailComponent peut consommer : 
    > this.movieSvc.moviesDetail$.subscribe()
  */
  get movieDetail$():Observable<MovieModel> {
    return this._movieDetail$.asObservable()
  }
 
  get searchedMovies$():Observable<MovieModel[]> {
    return this._searchedMovies$.asObservable();
  }
  setSearchMovies$(movies:MovieModel[]):void {
    this._searchedMovies$.next(movies)
  }



}
