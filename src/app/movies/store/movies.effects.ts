import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import {
  deleteMovieFail,
  deleteMovieStart,
  deleteMovieSuccessfully,
  fetchMoviesAndCategoriesFail,
  fetchMoviesAndCategoriesSuccessfully, getCategoriesFail,
  getCategoriesStart,
  getCategoriesSuccess, getSingleMovieFail,
  getSingleMovieStart,
  getSingleMovieSuccess,
  startFetchMoviesAndCategories, updateMovieFail, updateMovieStart, updateMovieSuccess
} from "../movies.actions";
import { catchError, exhaustMap, map, of, switchMap, tap } from "rxjs";
import { environment } from "../../../environments/environment";
import { Movie } from "../../models/movie";
import { HttpClient } from "@angular/common/http";
import { Category } from "../../models/category";
import { Store } from "@ngrx/store";
import { MoviesService } from "../data-access/movies.service";
import { Router } from "@angular/router";

interface GetMovies {
  status: string;
  message: Movie[];
}

interface GetCategories {
  status: string;
  message: Category[];
}

@Injectable()
export class MoviesEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store,
    private moviesService: MoviesService,
    private router: Router
  ) {
  }

  fetchMoviesAndCategories$ = createEffect(() => {
    let moviesRes: GetMovies;
    return this.actions$.pipe(
      ofType(startFetchMoviesAndCategories),
      switchMap(() => {
        return this.moviesService.fetchingMovies().pipe(
          exhaustMap((moviesResponse: GetMovies) => {
            moviesRes = moviesResponse;
            return this.moviesService.fetchingCategories()
          }),
          map((categoriesRes) => {
            return fetchMoviesAndCategoriesSuccessfully({
              movies: moviesRes.message,
              categories: categoriesRes.message
            })
          }),
          catchError((err) => of(fetchMoviesAndCategoriesFail({ errorMsg: err.error })))
        )
      }),
    )
  })

  fetchCategories$ = createEffect(() => this.actions$.pipe(
    ofType(getCategoriesStart),
    // concatLatestFrom(action => this.store.select(categories)),
    // switchMap(([action, categories]) => {
    switchMap(() => {
      // if(categories)
      return this.moviesService.fetchingCategories().pipe(
        map((response: GetCategories) => getCategoriesSuccess({ categories: response.message })),
        catchError(err => of(getCategoriesFail({ errorMsg: err.error.message })))
      )
    })
  ))

  fetchSingleMovie$ = createEffect(() => this.actions$.pipe(
    ofType(getSingleMovieStart),
    switchMap((action) => {
      return this.moviesService.fetchMovieById(action.id).pipe(
        map((response) => getSingleMovieSuccess({ movie: response.message })),
        catchError(err => of(getSingleMovieFail({ errorMsg: err.message })))
      )
    })
  ))

  updateMovie$ = createEffect(() => this.actions$.pipe(
    ofType(updateMovieStart),
    switchMap(({ id, formData }) => {
      return this.moviesService.updateMovie(id, formData).pipe(
        map(() => updateMovieSuccess()),
        catchError(err => of(updateMovieFail({errorMsg: 'Update Failed'})))
      )
    })
  ))

  navigateAfterUpdate$ = createEffect(() => this.actions$.pipe(
    ofType(updateMovieSuccess),
    tap(async () => await this.router.navigateByUrl('/movies'))
  ))

  deleteMovie$ = createEffect(() => this.actions$.pipe(
    ofType(deleteMovieStart),
    switchMap(({id}) => {
      return this.moviesService.deleteMovieById(id).pipe(
        map((response) => deleteMovieSuccessfully({ id })),
        catchError(err => {
          console.log(err);
          return of(deleteMovieFail({ errMsg: err.error }))
        })
      )
    })
  ))


}

