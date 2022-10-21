import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { environment } from 'src/environments/environment';
import { Store } from "@ngrx/store";
import { deleteMovieFail, deleteMovieStart, deleteMovieSuccessfully } from "../../movies.actions";
import { Actions, ofType } from "@ngrx/effects";
import { map, Observable, take } from "rxjs";

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss'],
})
export class MovieItemComponent implements OnInit {
  @Input() movie!: Movie;
  env = environment;

  loading$: Observable<boolean>;

  constructor(private router: Router, private store: Store, private actions$: Actions) {}

  ngOnInit(): void {}

  editMovie(id: number) {
    this.router.navigateByUrl(`/movies/edit-movie/${id}`);
  }
  deleteMovie(movieId: number) {
    // this.loading = true;
    this.store.dispatch(deleteMovieStart({id: movieId}));
    // this.actions$.pipe(
    //   ofType(deleteMovieSuccessfully),
    //   take(1),
    // ).subscribe(() => {
    //   this.loading = false;
    // })
    this.loading$ =this.actions$.pipe(
      ofType(deleteMovieStart),
      map(() => true)
    )

    this.loading$ = this.actions$.pipe(
      ofType(deleteMovieSuccessfully, deleteMovieFail),
      map(() => false)
    )
  }
}
