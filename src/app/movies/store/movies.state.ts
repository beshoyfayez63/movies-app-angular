import { Movie } from "../../models/movie";
import { Category } from "../../models/category";
import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MoviesState } from "./movies.reducer";

export interface MoviesEntity extends EntityState<Movie> {}
export const moviesAdapter = createEntityAdapter<Movie>();

export interface CategoriesEntity extends EntityState<Category> {}
export const categoriesAdapter = createEntityAdapter<Category>()

export const MOVIES_FEATURE_NAME = 'movies';

export const moviesState = createFeatureSelector<MoviesState>(MOVIES_FEATURE_NAME);
const { selectAll: selectMovies } = moviesAdapter.getSelectors();
const { selectAll: selectCategories } = categoriesAdapter.getSelectors();
export const movies = createSelector(moviesState, (state) => selectMovies(state.movies));
export const categories = createSelector(moviesState, (state) => selectCategories(state.categories));
export const movie = createSelector(moviesState, ({ movie }) => movie);
