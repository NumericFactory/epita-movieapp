import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  loginForm!:FormGroup;

  constructor(private fb:FormBuilder) {}

  ngOnInit() {
    // construire une instance de FormGroup
    this.loginForm = this.fb.group({
      email:'',
      password:'',
      // les champs de formulaire sont des instances de FormControl
    })
  }

  onSubmit() {
    console.log(this.loginForm) // instance FormGroup
  }

}
