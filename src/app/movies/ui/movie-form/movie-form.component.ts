import { environment } from './../../../../environments/environment';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from '../../data-access/movies.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss'],
})
export class MovieFormComponent implements OnInit {
  @Input() movie: Movie | null;
  categories$ = this.moviesService.getCategories();
  loadingCategories = true;
  loadingUpdateMovie = false;
  env = environment;
  movieForm: FormGroup;
  file: File;

  get f() {
    return this.movieForm.controls;
  }
  constructor(
    private fb: FormBuilder,
    private moviesService: MoviesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.movieForm = this.fb.group({
      name: [this.movie?.name || '', Validators.required],
      description: [this.movie?.description || '', Validators.required],
      image: [null, this.moviesService.imageValidator(this.movie?.image)],
      category_id: [
        this.movie?.category?.id || '',
        [Validators.required, Validators.min(0)],
      ],
    });
    this.movieForm.valueChanges.subscribe(console.log);
    this.moviesService.fetchAllCategories().subscribe({
      next: (res) => (this.loadingCategories = false),
      error: (err) => (this.loadingCategories = false),
    });
  }

  submitMovie() {
    const formData = new FormData();
    for (let formValue in this.movieForm.value) {
      if (
        this.movieForm.value[formValue] === null &&
        formValue === 'image' &&
        this.movie
      ) {
        continue;
      }
      formData.append(formValue, this.movieForm.value[formValue]);
    }
    this.loadingUpdateMovie = true;

    let movieAction$: Observable<any>;
    if (this.movie) {
      formData.append('_method', 'put');

      movieAction$ = this.moviesService.updateMovie(this.movie.id, formData);
    } else {
      movieAction$ = this.moviesService.addMovie(formData);
    }

    movieAction$.subscribe({
      next: (res) => {
        console.log(res);
        this.loadingUpdateMovie = false;
        this.router.navigateByUrl('/movies');
      },
      error: (err) => {
        console.log(err);

        this.loadingUpdateMovie = false;
      },
    });
  }
}
