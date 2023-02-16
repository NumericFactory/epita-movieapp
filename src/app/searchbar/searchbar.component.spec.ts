import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../services/movie.service';
import { SearchbarComponent } from './searchbar.component';

describe('SearchbarComponent', () => {
  let component: SearchbarComponent;
  let fixture: ComponentFixture<SearchbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchbarComponent ],
      imports: [ 
        HttpClientTestingModule, 
        FormsModule ],
      providers: [ MovieService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /* si 0 caractères dans le champ
    attendu : searchedMovies = []
  */
  it('should searchedMovies==[] if useRInput contains 0 characters', () => {
     // on simule le fait que le use envoie 0 caractères
     component.onKeyupInput('');
     // on attend que searchedMovies soit vide
     expect(component.searchedMovies).toEqual([]);
  });


  /* si >2 caractères dans le champ
    attendu : on execute la requête
  */
    it('should searchedMovies==[] if useRInput contains 0 characters', () => {
      // on simule le fait que le use envoie 0 caractères
      component.onKeyupInput('ble');
      // on attend que searchedMovies soit vide
      expect(component.searchedMovies).toEqual([]);
   });



});
