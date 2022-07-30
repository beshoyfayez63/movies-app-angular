import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { MoviesService } from '../data-access/movies.service';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.scss'],
})
export class EditMovieComponent implements OnInit {
  movie$ = this.moviesService.getMovie();
  errorMsg = '';
  loading = true;
  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchMovieById();
  }

  fetchMovieById() {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          let id = params.get('id');
          if (id) {
            return this.moviesService.fetchMovieById(+id);
          } else {
            return of(null);
          }
        })
      )
      .subscribe({
        next: () => {
          this.loading = false;
        },
        error: (err: HttpErrorResponse) => this.handleError(err),
      });
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err);
    this.errorMsg = err.error.message;
    this.loading = false;
  }
}
