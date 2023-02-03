import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  loginForm!:FormGroup;
  isSubmitted:boolean = false;

  constructor(private fb:FormBuilder, private userSvc: UserService) {}

  ngOnInit() {
    // construire une instance de FormGroup
    this.loginForm = this.fb.group({
      email:['', [Validators.required, Validators.email] ],
      password:['', Validators.required],
      // les champs de formulaire sont des instances de FormControl
    })
  }

  onSubmit() {
    // this.loginForm.value; // {email:'test@test.fr', password:'123456'}
    if(this.loginForm.valid) {
      // faire la request
      this.userSvc.login(this.loginForm.value)
      .subscribe( (response:any) => {
        console.log( response);
        // je stock le token dans le localStorage
        localStorage.setItem('token', response.jwt)
      })
    }
  }

}
