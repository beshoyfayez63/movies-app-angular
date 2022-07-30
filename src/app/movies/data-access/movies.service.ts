import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { Category } from 'src/app/models/category';
import { AbstractControl, ValidatorFn } from '@angular/forms';

interface GetMovies {
  status: string;
  message: Movie[];
}

interface GetMovie {
  status: string;
  message: Movie;
}
interface GetCategories {
  status: string;
  message: Category[];
}

@Injectable({ providedIn: 'root' })
export class MoviesService {
  private movies$ = new BehaviorSubject<Movie[]>([]);
  private movie$ = new BehaviorSubject<Movie | null>(null);
  private categories$ = new BehaviorSubject<Category[]>([]);
  private selectedCategory$ = new BehaviorSubject<Category>(null);

  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    return this.movies$.asObservable();
  }

  getMovie() {
    return this.movie$.asObservable();
  }

  getCategories() {
    return this.categories$.asObservable();
  }

  getSelectedCategory() {
    return this.selectedCategory$.asObservable();
  }

  fetchMovies() {
    return this.http.get<GetMovies>(`${environment.apiUrl}/movies`).pipe(
      tap((res) => {
        this.movies$.next(res.message);
      })
    );
  }

  fetchMovieById(movieId: number) {
    return this.http
      .get<GetMovie>(`${environment.apiUrl}/movies/${movieId}`)
      .pipe(
        tap((res) => {
          this.movie$.next(res.message);
        })
      );
  }

  fetchAllCategories() {
    return this.http.get<GetCategories>(`${environment.apiUrl}/category`).pipe(
      tap((res) => {
        this.categories$.next(res.message);
      })
    );
  }

  imageValidator(movieImage: string): ValidatorFn {
    return (control: AbstractControl) => {
      if (!movieImage && !control.value) {
        return { imageRequired: true };
      } else {
        return null;
      }
    };
  }

  updateMovie(movieId: number, formData: FormData) {
    return this.http.post(`${environment.apiUrl}/movies/${movieId}`, formData);
  }

  addMovie(formData: FormData) {
    return this.http.post(`${environment.apiUrl}/movies`, formData);
  }
  deleteMovie(movieId: number) {
    return this.http
      .post(`${environment.apiUrl}/movies/${movieId}`, { _method: 'delete' })
      .pipe(
        tap((res) => {
          const movies = this.movies$.value;
          this.movies$.next(movies.filter((movie) => movie.id !== movieId));
        })
      );
  }

  fetchMoviesByCategory(category: Category) {
    // this.selectedCategory$.next(category);
    const selectedCategory = this.selectedCategory$.value;

    if (selectedCategory && selectedCategory.id === category.id) {
      return this.fetchMovies().pipe(
        tap(() => {
          this.selectedCategory$.next(null);
        })
      );
    }
    return this.http
      .get<GetMovies>(`${environment.apiUrl}/moviesByCategory/${category.id}`)
      .pipe(
        tap((res) => {
          this.selectedCategory$.next(category);
          this.movies$.next(res.message);
        })
      );
  }
}
