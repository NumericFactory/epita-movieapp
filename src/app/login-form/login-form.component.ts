import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
      email:['', [Validators.required, Validators.email] ],
      password:['', Validators.required],
      // les champs de formulaire sont des instances de FormControl
    })
  }

  onSubmit() {
    console.log(this.loginForm) // instance FormGroup
    // gérer la soumission
    if(this.loginForm.valid) {
      // faire la requete pour poster la donnée
    }
  }

}
