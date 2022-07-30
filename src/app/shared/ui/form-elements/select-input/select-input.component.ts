import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectInputComponent,
      multi: true,
    },
  ],
})
export class SelectInputComponent implements OnInit, ControlValueAccessor {
  @Input()
  categories: Category[] = [];

  selectedValues: { text: string; value: number }[] = [];

  selectedValue: number;

  onChanged: (value: number) => void;

  ngOnInit(): void {
    this.selectedValues = this.categories.map((cat) => ({
      text: cat.name,
      value: cat.id,
    }));
  }

  writeValue(value: number): void {
    if (value) this.selectedValue = value;
  }
  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any): void {}

  selectChange(event) {
    const value = (event.target as HTMLSelectElement).value;
    if (!value) {
      this.onChanged(-1);
    } else {
      this.onChanged(+value);
    }
  }
}
