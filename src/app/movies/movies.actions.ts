import { createAction, props } from "@ngrx/store";
import { Movie } from "../models/movie";
import { Category } from "../models/category";

export const START_FETCH_MOVIES_CATEGORIES = '[Movies Page] Start Fetching Movies Categories';
export const FETCH_MOVIES_CATEGORIES_SUCCESSFULLY = '[Movies Page] Fetching Movies Categories Successfully';
export const FETCH_MOVIES_CATEGORIES_FAILED = '[Movies Page] Fetching Movies Categories Failed';
export const START_DELETE_MOVIE = '[Movies Page] Start Delete Movie';
export const DELETE_MOVIE_SUCCESS = '[Movies Page] Delete Movie Success';
export const DELETE_MOVIE_FAIL = '[Movies Page] Delete Movie Fail';
export const GET_CATEGORIES_START = '[Movies page] Get Categories Start';
export const GET_CATEGORIES_SUCCESS = '[Movies page] Get Categories Success';
export const GET_CATEGORIES_FAIL = '[Movies page] Get Categories Fail';
export const GET_SINGLE_MOVIE_START = '[Movies page] Get Single Movie Start';
export const GET_SINGLE_MOVIE_SUCCESS = '[Movies page] Get Single Movie Success';
export const GET_SINGLE_MOVIE_FAIL = '[Movies page] Get Single Movie Fail';
export const UPDATE_MOVIE_START = '[Movies page] Update Movie Start';
export const UPDATE_MOVIE_SUCCESS = '[Movies page] Update Movie Success';
export const UPDATE_MOVIE_FAIL = '[Movies page] Update Movie Fail';

export const startFetchMoviesAndCategories = createAction(START_FETCH_MOVIES_CATEGORIES);
export const fetchMoviesAndCategoriesSuccessfully = createAction(FETCH_MOVIES_CATEGORIES_SUCCESSFULLY, props<{
  movies: Movie[];
  categories: Category[];
}>());
export const fetchMoviesAndCategoriesFail = createAction(FETCH_MOVIES_CATEGORIES_FAILED, props<{ errorMsg: string; }>());

export const deleteMovieStart = createAction(START_DELETE_MOVIE, props<{ id: number; }>());
export const deleteMovieSuccessfully = createAction(DELETE_MOVIE_SUCCESS, props<{ id: number; }>());
export const deleteMovieFail = createAction(DELETE_MOVIE_FAIL, props<{errMsg: string}>());

export const getCategoriesStart = createAction(GET_CATEGORIES_START);
export const getCategoriesSuccess = createAction(GET_CATEGORIES_SUCCESS, props<{categories: Category[] }>());
export const getCategoriesFail = createAction(GET_CATEGORIES_FAIL, props<{ errorMsg: string; }>());

export const getSingleMovieStart = createAction(GET_SINGLE_MOVIE_START, props<{ id: number; }>());
export const getSingleMovieSuccess = createAction(GET_SINGLE_MOVIE_SUCCESS, props<{ movie: Movie }>());
export const getSingleMovieFail = createAction(GET_SINGLE_MOVIE_FAIL, props<{ errorMsg: string; }>());

export const updateMovieStart = createAction(UPDATE_MOVIE_START, props<{ id: number; formData: FormData }>());
export const updateMovieSuccess = createAction(UPDATE_MOVIE_SUCCESS);
export const updateMovieFail = createAction(UPDATE_MOVIE_FAIL, props<{ errorMsg: string; }>());
