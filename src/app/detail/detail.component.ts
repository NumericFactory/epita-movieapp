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

  movie:any = {};
  movieId:number = 0;
  videoUrl!:SafeResourceUrl;

  constructor(
    private route:ActivatedRoute, 
    private router:Router,
    private movieSvc:MovieService,
    private sanitizer: DomSanitizer
    ) {}


  ngOnInit() {

    console.log( this.route.snapshot.params) // {id: 123456}
    this.movieId = this.route.snapshot.params['id'];

    // récupérer les données du film sur movies$ (movie.service.ts)
    this.movieSvc.getMovies$().subscribe( (movies:MovieModel[]) => {
      this.movie = movies.find( (movie) => movie.id == this.movieId);
      console.log(this.movie);
    })

    // récupérer la liste des videos
    // endpoint /movie/[id]/videos
    this.movieSvc.getVideosFromApi(this.movieId)
    .subscribe( (response:any) => {
      console.log(response);
      let videoId = response.results[0].key;
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+videoId);
    })



  } // Fin ngOnInit()




  goBack() {
    // la méthode navigate([route, params]) d'un Objet Router permet d'exectuer de la navigation (changement d'Url)
    // IDEM que l'attribut routerLink="/" dans le HTML
    this.router.navigate(['/']);
  }

}
