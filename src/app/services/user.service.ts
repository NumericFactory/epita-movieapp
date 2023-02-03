import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../shared/models/userlogin.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  login(credentials: UserModel ) {
    let userData = {identifier:credentials.email, password: credentials.password };
    return this.http.post('https://api-user-server.herokuapp.com/api/auth/local', userData); // Observable
  }

}
