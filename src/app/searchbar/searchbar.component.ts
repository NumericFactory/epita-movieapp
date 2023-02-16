import { Component } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { MovieModel } from '../shared/models/movie.model';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent {

  searchedMovies:MovieModel[]= [];

  constructor(private movieSvc:MovieService) {}

  ngOnInit() {
    this.movieSvc.searchedMovies$
    .subscribe( (foundMovies:MovieModel[]) => this.searchedMovies = foundMovies  );
  }

  onKeyupInput(userSearch:string) {
    console.log(userSearch);
    // appeler une méthode de MovieService 
    // pour faire la request HTTP à /search/movie?query=userSearch 
    if(userSearch.length==0) {
      this.movieSvc.setSearchMovies$([]);
    }
    else {
      this.movieSvc.searchMoviesFromApi(userSearch);
    }
  }
  
  ngOnDestroy() {
    // A la destruction du component (sur la navigation)
    // on vide le tableau avec searchedMovies$.next([])
    this.movieSvc.setSearchMovies$([]);
  }

}
