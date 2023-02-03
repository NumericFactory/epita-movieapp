import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
import { LoginFormComponent } from './login-form/login-form.component';

const routes: Routes = [
  // definir des routes : une url => un component

  // sur localhost:4200 => le component ListComponent s'affiche
  {
    path:'', component: ListComponent 
  },

  // sur localhost:4200/detail => le component DetailComponent s'affiche
  {
    path:'detail/:id', component: DetailComponent
  },

  // sur localhost:4200/detail => le component DetailComponent s'affiche
  {
    path:'login', component: LoginFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
