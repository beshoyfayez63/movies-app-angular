import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss'],
})
export class CustomButtonComponent implements OnInit {
  @Input() btnText: string;
  @Input() btnType: string;
  @Input() loading = false;
  @Input() disabled: boolean;
  constructor() {}

  ngOnInit(): void {}
}
