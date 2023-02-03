import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../shared/models/userlogin.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_USER = 'https://api-user-server.herokuapp.com/api';

  constructor(private http:HttpClient) { }

  login(credentials: UserModel ) {
    let userData = {
      identifier:credentials.email, 
      password: credentials.password 
    };
    return this.http.post(this.API_USER+'/auth/local', userData); // Observable
  }

}
