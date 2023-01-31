import { Component} from '@angular/core';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent {

  movies:Array<any> = []; // variable de vue

  constructor(private movieSvc:MovieService)  {
    console.log(this); // this.http est un objet de la class HttpClient
  }

  /* une méthode du cycle de vie du component */
  /* dans ngOnInit, on initialise les valeurs des variables d'affichage */
  ngOnInit() {
    /*
      1 faire la requete HTTP [GET] à TMBD (/discover/movie)
      ******************************************************
      this.http.get(url) retourne un Observable (C'est un objet proposé par la librarie RxJS)
      >  sur un Observable, on peut s'abonner au changement avec .subscribe()
      > .subscribe() exécutera la callback lorsque le serveur renverra une réponse
      > Observable.subscribe( faire qqchose quand il y a un changment sur l'observable )
    */
    this.movieSvc.getMoviesFromApi()
    .subscribe( (response:any) => {
      console.log(response.resulsts);
      //  2 assigner la reponse (array of movies objects) en valeur de this.movies
      this.movies = response.results;
    });

    // "Hello" s'affichera dans la console AVANT le console.log(this.movies)
    console.log("Hello"); 

  } // fin ngOnInit()



  getImgFullUrl(urlFragment:string):string {
    // https://image.tmdb.org/t/p/w500/faXT8V80JRhnArTAeYXz0Eutpv9.jpg
    return 'https://image.tmdb.org/t/p/w500'+ urlFragment;
  }









  // on requete l'API TMDB

  // la méthode .get(url) de l'objet HttpClient
  // permet de faire une requête HTTP
  
  
  
  



}
