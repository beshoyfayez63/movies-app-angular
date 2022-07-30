import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/models/category';
import { MoviesService } from '../../data-access/movies.service';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss'],
})
export class CategoryItemComponent implements OnInit {
  @Input()
  category: Category;
  @Input()
  categoryIndex: number;

  @Output()
  loadingMoviesByCategories = new EventEmitter<boolean>();

  clickedCategory: number;

  constructor(private moviesServices: MoviesService) {}

  ngOnInit(): void {}

  selectCategory() {
    this.loadingMoviesByCategories.emit(true);
    this.moviesServices.fetchMoviesByCategory(this.category).subscribe({
      next: (res) => {
        this.loadingMoviesByCategories.emit(false);
      },
    });
  }
}
