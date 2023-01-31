
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http:HttpClient) { }
  //  l'objet http de la class HttpClient
  // dispose des méthodes get(), post(), delete(), put(), ....

  getMoviesFromApi() {
    return this.http.get('https://api.themoviedb.org/3/discover/movie?api_key=efdeb661aaa006b1e4f36f990a5fd8fd&language=fr');
  }


}
