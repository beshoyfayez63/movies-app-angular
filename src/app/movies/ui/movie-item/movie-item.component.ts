import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { environment } from 'src/environments/environment';
import { MoviesService } from '../../data-access/movies.service';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss'],
})
export class MovieItemComponent implements OnInit {
  @Input() movie!: Movie;
  env = environment;

  loading = false;

  constructor(private router: Router, private moviesService: MoviesService) {}

  ngOnInit(): void {}

  editMovie(id: number) {
    this.router.navigateByUrl(`/movies/edit-movie/${id}`);
  }
  deleteMovie(movieId: number) {
    this.loading = true;
    this.moviesService.deleteMovie(movieId).subscribe(() => {
      this.loading = false;
    });
  }
}
