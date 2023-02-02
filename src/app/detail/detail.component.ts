import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { MovieModel } from '../shared/models/movie.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {

  movie:any = {};
  movieId:number = 0;

  constructor(
    private route:ActivatedRoute, 
    private movieSvc:MovieService) {}


  ngOnInit() {



    console.log( this.route.snapshot.params) // {id: 123456}
    this.movieId = this.route.snapshot.params['id'];

    this.movieSvc.getMovies$().subscribe( (movies:MovieModel[]) => {
      this.movie = movies.find( (movie) => movie.id == this.movieId);
      console.log(this.movie);
    })



  }

}
