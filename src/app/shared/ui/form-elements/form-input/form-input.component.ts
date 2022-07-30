import { Component, forwardRef, Input } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInputComponent),
      multi: true,
    },
  ],
})
export class FormInputComponent implements ControlValueAccessor {
  @Input() labelName: string;
  @Input() placeholder = '';
  @Input() inputType = 'text';
  @Input() formField: AbstractControl;
  @Input() errors: {
    error: string;
    message: string;
  }[] = [];
  inputValue = '';

  changed: (value: string) => void;

  touched: () => void;

  constructor() {}

  writeValue(obj: string): void {
    if (obj) this.inputValue = obj;
  }

  registerOnChange(fn: any): void {
    this.changed = fn;
  }

  registerOnTouched(fn: any): void {
    this.touched = fn;
  }

  onChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.changed(value);
  }
}
