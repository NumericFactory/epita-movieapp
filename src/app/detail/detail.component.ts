import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { MovieModel } from '../shared/models/movie.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {

  movie!:MovieModel;
  movieId:number = 0;
  videoUrl:string = '';

  constructor(
    private route:ActivatedRoute, 
    private router:Router,
    public movieSvc:MovieService,
    private sanitizer: DomSanitizer
    ) {}


  ngOnInit() {
    console.log( this.route.snapshot.params) // {id: 123456}
    this.movieId = this.route.snapshot.params['id'];

    // Récupérer les données du film
    // endpoint /movie/[id]
    this.movieSvc.getDetailsFromApi(this.movieId);

    // // this.movieSvc.movieDetail$
    // // .subscribe((movie:MovieModel) => {
    //   this.movie = movie
    // });


    // récupérer la liste des videos
    // endpoint /movie/[id]/videos
    this.movieSvc.getVideosFromApi(this.movieId)
    .subscribe( (response:any) => {
      console.log(response);
      if(response.results.length>0) {
        let videoId = response.results[0].key;
        this.videoUrl = 'https://www.youtube.com/embed/' + videoId;
      }

    })



  } // Fin ngOnInit()




  goBack() {
    // la méthode navigate([route, params]) d'un Objet Router permet d'exectuer de la navigation (changement d'Url)
    // IDEM que l'attribut routerLink="/" dans le HTML
    this.router.navigate(['/']);
  }

}
