import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from "@ngrx/store";
import { getSingleMovieStart, getSingleMovieSuccess } from "../movies.actions";
import { movie } from "../store/movies.state";
import { Actions, ofType } from "@ngrx/effects";
import { take } from "rxjs";


@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.scss'],
})
export class EditMovieComponent implements OnInit {
  movie$ = this.store.select(movie);
  errorMsg = '';
  loading = true;
  constructor(
    private store: Store,
    private actions$: Actions,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.store.dispatch(getSingleMovieStart({ id }));
    this.actions$.pipe(
      ofType(getSingleMovieSuccess),
      take(1)
    ).subscribe({ next: () => this.loading = false })
  }
}
