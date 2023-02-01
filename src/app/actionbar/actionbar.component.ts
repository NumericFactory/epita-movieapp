import { Component } from '@angular/core';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-actionbar',
  templateUrl: './actionbar.component.html',
  styleUrls: ['./actionbar.component.css']
})
export class ActionbarComponent {

  constructor(private movieSvc: MovieService) {

  }

  onClickBtn() {
    // appeler la méthode getMoviesFromApi()
    this.movieSvc.getMoviesFromApi();

  }

}
