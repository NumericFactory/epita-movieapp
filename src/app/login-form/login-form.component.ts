import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  loginForm!:FormGroup;
  isSubmitted:boolean = false;
  userData:any;

  constructor(
    private fb:FormBuilder, 
    public userSvc: UserService,
    private alertSvc: AlertService,
    private router:Router
    ) {}

  ngOnInit() {
    // construire une instance de FormGroup
    this.loginForm = this.fb.group({
      email:['', [Validators.required, Validators.email] ],
      password:['', Validators.required],
      // les champs de formulaire sont des instances de FormControl
    });

    let userDataInStorage = localStorage.getItem('userData');
    this.userData = userDataInStorage!=null?JSON.parse(userDataInStorage):{};
    
  }




  /*
    OnSubmit()
    Rôle : gestion de la soumission du formulaire de login
    Rappel de la connexion stateless
    1 -> On envoie un couple login/mdp
    2 -> Si l'email et MDP match, le serveur renvoie un JsonWebToken

    On peut stocker le token dans le localStorage, un cookie sécurisé ou simplement d'un subject
    Lorsque l'utilisateur fera une requête qui demande dêtre authentifié, 
    on enverra le token dans les headers de la requête
  */
  onSubmit() {
    // this.loginForm.value; // renvoie {email:'test@test.fr', password:'123456'}
    if(this.loginForm.valid) {
      // faire la request
      this.userSvc.login(this.loginForm.value)
      .subscribe( 
        {
          next: (response:any) => {
            console.log( response);
            // on stock le token dans le localStorage
            let userData = {
              id: response.user.id,
              token: response.jwt, 
              email : response.user.email,
              username : response.user.username,
            };
            localStorage.setItem('token', response.jwt);
            localStorage.setItem('userData', JSON.stringify(userData));

            // si la réponse est OK
            if(response.jwt) {
              this.router.navigate(['/']);
              this.alertSvc.showAlert('Vous êtes connecté(e)');
            }
          },
          error: (err) => console.log(err)
      }

      )
    }
  }

  /*
    logoutAction()
    Rôle : déconnecter l'utilisateur en supprimer le token du localStorage
  */
  logoutAction() {
    this.userSvc.logout()
  }

}
