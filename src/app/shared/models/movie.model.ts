// export interface MovieModel {
//   id:number;
//   titre: string;
//   image_portrait: string;
//   image_landscape: string;
//   score: number;
//   date: Date;
// }

export class MovieModel {
  id:number;
  titre: string;
  resume: string;
  image_portrait: string;
  image_landscape: string;
  score: number;
  date: Date;

  constructor(movieFromApi:any) {
    this.id = movieFromApi.id;
    this.titre = movieFromApi.title;
    this.resume = movieFromApi.overview;
    this.image_portrait = movieFromApi.poster_path;
    this.image_landscape = movieFromApi.backdrop_path;
    this.score = movieFromApi.vote_average;
    this.date = movieFromApi.release_date;
  }


}