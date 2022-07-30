import { Component, OnInit } from '@angular/core';
import { Observable, switchMap, take } from 'rxjs';
import { Category } from '../models/category';
import { Movie } from '../models/movie';
import { MoviesService } from './data-access/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  movies$ = this.movieService.getMovies();
  categories$ = this.movieService.getCategories();

  loading = true;
  constructor(private movieService: MoviesService) {}

  ngOnInit(): void {
    this.fetchMovies();
  }

  fetchMovies() {
    this.movieService
      .fetchMovies()
      .pipe(
        switchMap(() => {
          return this.movieService.fetchAllCategories();
        })
      )
      .subscribe({
        next: (_) => {
          this.loading = false;
        },
        error: (_) => {
          this.loading = false;
        },
      });
  }
}
