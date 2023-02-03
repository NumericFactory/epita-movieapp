import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ActionbarComponent } from './actionbar/actionbar.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    DetailComponent,
    SearchbarComponent,
    ActionbarComponent,
    LoginFormComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // pour utiliser les formulaire reactifs, on doit importer ReactiveFormsModule
    ReactiveFormsModule

  ],
  // on provide l'interceptor ErrorInterceptor à l'appplication
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
