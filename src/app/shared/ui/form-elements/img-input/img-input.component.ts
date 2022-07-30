import { environment } from '../../../../../environments/environment';
import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-img-input',
  templateUrl: './img-input.component.html',
  styleUrls: ['./img-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImgInputComponent),
      multi: true,
    },
  ],
})
export class ImgInputComponent implements ControlValueAccessor {
  imgValue: File = null;
  url = environment.imgUrl;
  file: File;
  fileBase64: string;

  @Input()
  movieImage: string;

  @ViewChild('fileInput', { static: false })
  fileInput: ElementRef<HTMLInputElement>;

  onChanged: (value: File) => void;

  constructor() {}

  writeValue(obj: File): void {
    if (obj) this.imgValue = obj;
  }
  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any): void {}

  addImage() {
    this.fileInput.nativeElement.click();
  }

  async filePickerChanged(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.file = file;
    this.fileBase64 = await this.showFilePreview();
    this.imgValue = this.file;
    this.onChanged(file);
  }

  showFilePreview(): Promise<any> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.readAsDataURL(this.file);
    });
  }
}
