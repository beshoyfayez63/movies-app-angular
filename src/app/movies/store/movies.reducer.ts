import { createReducer, on } from "@ngrx/store";
import {
  deleteMovieSuccessfully,
  fetchMoviesAndCategoriesFail,
  fetchMoviesAndCategoriesSuccessfully,
  getCategoriesSuccess, getSingleMovieSuccess,
  startFetchMoviesAndCategories
} from "../movies.actions";
import { categoriesAdapter, CategoriesEntity, moviesAdapter, MoviesEntity } from "./movies.state";
import { Movie } from "../../models/movie";

export interface MoviesState {
  movies: MoviesEntity;
  categories: CategoriesEntity;
  movie: Movie;
  errorMsg: string;
}

export const initialState: MoviesState = {
  movies: moviesAdapter.getInitialState(),
  categories: categoriesAdapter.getInitialState(),
  movie: null,
  errorMsg: null
}

export const moviesReducer = createReducer(
  initialState,
    on(startFetchMoviesAndCategories, (state) => ({
      ...state,
      movies: moviesAdapter.setAll([], state.movies),
      categories: categoriesAdapter.setAll([], state.categories),
    })),
    on(fetchMoviesAndCategoriesSuccessfully, (state, action) => ({
      ...state,
      movies: moviesAdapter.setAll(action.movies, state.movies),
      categories: categoriesAdapter.setAll(action.categories, state.movies),
      errorMsg: ''
    })),
    on(fetchMoviesAndCategoriesFail, (state, action) => ({
      ...state,
      movies: moviesAdapter.setAll([], state.movies),
      categories: categoriesAdapter.setAll([], state.categories),
      errorMsg: action.errorMsg,
    })),
    on(deleteMovieSuccessfully, (state, action) => ({
      ...state,
      movies: moviesAdapter.removeOne(action.id, state.movies),
    })),
    on(getCategoriesSuccess, (state, action) => ({
      ...state,
      categories: categoriesAdapter.setAll(action.categories, state.categories),
    })),
    on(getSingleMovieSuccess, (state, action) => ({
      ...state,
      movie: action.movie,
    }))
  );


