import { Component, Input, OnInit } from '@angular/core';
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

  clickedCategory: number;

  constructor(private moviesServices: MoviesService) {}

  ngOnInit(): void {}

  selectCategory() {
    this.moviesServices.fetchMoviesByCategory(this.category).subscribe();
  }
}
