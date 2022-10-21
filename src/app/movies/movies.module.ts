import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies.component';
import { MovieItemComponent } from './ui/movie-item/movie-item.component';
import { EditMovieComponent } from './edit-movie/edit-movie.component';
import { MovieFormComponent } from './ui/movie-form/movie-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { CategoryItemComponent } from './ui/category-item/category-item.component';
import { HighlightDirective } from './directives/highlight.directive';
import { StoreModule } from "@ngrx/store";
import { moviesReducer } from "./store/movies.reducer";
import { EffectsModule } from "@ngrx/effects";
import { MoviesEffects } from "./store/movies.effects";
import { MOVIES_FEATURE_NAME } from "./store/movies.state";

@NgModule({
  declarations: [
    MoviesComponent,
    MovieItemComponent,
    EditMovieComponent,
    MovieFormComponent,
    AddMovieComponent,
    CategoryItemComponent,
    HighlightDirective,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MoviesRoutingModule,
    SharedModule,
    StoreModule.forFeature(MOVIES_FEATURE_NAME, moviesReducer),
    EffectsModule.forFeature([MoviesEffects])
  ],
})
export class MoviesModule {}
