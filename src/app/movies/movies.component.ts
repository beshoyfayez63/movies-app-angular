import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie';
import { Store } from "@ngrx/store";
import {
  fetchMoviesAndCategoriesFail,
  fetchMoviesAndCategoriesSuccessfully,
  startFetchMoviesAndCategories
} from "./movies.actions";
import { Actions, ofType } from "@ngrx/effects";
import { take } from "rxjs";
import { categories, movies } from "./store/movies.state";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  movies$ = this.store.select(movies);
  categories$ = this.store.select(categories);
  initialLoading = true;

  loadingMoviesCategories = false;
  constructor(private store: Store, private actions$: Actions) {}

  ngOnInit(): void {
    this.fetchMovies();
    this.actions$.pipe(
      ofType(fetchMoviesAndCategoriesSuccessfully, fetchMoviesAndCategoriesFail),
      take(1)
    ).subscribe({
      next: () => this.initialLoading = false
    });
  }

  fetchMovies() {
    this.store.dispatch(startFetchMoviesAndCategories());
  }

  movieTrackByFn(_, item: Movie) {
    return item.id;
  }

  loadingMoviesByCategories(loading: boolean) {
    this.loadingMoviesCategories = loading;
  }
}
