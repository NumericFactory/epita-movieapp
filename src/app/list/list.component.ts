import { Component, OnInit} from '@angular/core';
import { MovieService } from '../services/movie.service';
import { MovieModel } from '../shared/models/movie.model';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent  {

  movies:Array<MovieModel> = []; // variable de vue

  constructor(private movieSvc:MovieService)  {
    console.log(this); // this.http est un objet de la class HttpClient
  }

  /* 
    ngOnInit est une méthode du cycle de vie du component
    ngOnInit est éxécutée par Angular lorsque le component est initialisé et prêt
    On initialise ici : 
    - les valeurs des variables utilisée dans la vue HTML
    - les souscriptions à des Observables 
    - les appels de données aux services
    documentation : https://angular.io/guide/lifecycle-hooks
  */
  ngOnInit() { 
    // 1 faire la requete HTTP [GET] à TMBD (/discover/movie)
    this.movieSvc.getMoviesFromApi();

    // 2 je m'abonne à this.movieSvc.movies$. 
    //   Lors d'un changement: on assigne la réponse en valeur de la propriété movies
    this.movieSvc.getMovies$()
    .subscribe( (moviesArr:MovieModel[]) => this.movies = moviesArr );

  } // fin ngOnInit()


  /*
    getImgFullUrl()
    Rôle : retourne une url image formatée
  */
  getImgFullUrl(urlFragment:string):string {
    // https://image.tmdb.org/t/p/w500/faXT8V80JRhnArTAeYXz0Eutpv9.jpg
    return 'https://image.tmdb.org/t/p/w500'+ urlFragment;
  }

 
  
  
}
