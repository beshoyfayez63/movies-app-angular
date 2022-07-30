import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { EditMovieComponent } from './edit-movie/edit-movie.component';
import { MoviesComponent } from './movies.component';

const moviesRoutes: Routes = [
  { path: '', component: MoviesComponent },
  { path: 'edit-movie/:id', component: EditMovieComponent },
  { path: 'add-movie', component: AddMovieComponent },
];

@NgModule({
  imports: [RouterModule.forChild(moviesRoutes)],
  exports: [RouterModule],
})
export class MoviesRoutingModule {}
