import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoadingSpinnerComponent } from './ui/loading-spinner/loading-spinner.component';
import { NavbarComponent } from './ui/navbar/navbar.component';
import { FormInputComponent } from './ui/form-elements/form-input/form-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorMsgComponent } from './ui/error-msg/error-msg.component';
import { CustomButtonComponent } from './ui/custom-button/custom-button.component';
import { ImgInputComponent } from './ui/form-elements/img-input/img-input.component';
import { SelectInputComponent } from './ui/form-elements/select-input/select-input.component';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    NavbarComponent,
    FormInputComponent,
    ErrorMsgComponent,
    CustomButtonComponent,
    ImgInputComponent,
    SelectInputComponent,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [
    LoadingSpinnerComponent,
    NavbarComponent,
    FormInputComponent,
    ErrorMsgComponent,
    CustomButtonComponent,
    ImgInputComponent,
    SelectInputComponent,
  ],
})
export class SharedModule {}
