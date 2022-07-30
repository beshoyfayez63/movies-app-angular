import {
  Directive,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective implements OnInit {
  @Input('appHighlight')
  categoryItems: HTMLElement;

  @Input()
  categoryIndex: number = 0;

  previousIndex: number = -1;

  constructor(private renderer2: Renderer2) {}

  ngOnInit(): void {}

  @HostListener('click', ['$event']) selectCategory(event: PointerEvent) {
    const items = this.categoryItems.getElementsByClassName('active');
    console.log();

    if (items[0]?.textContent === (event.target as HTMLElement).textContent) {
      let item = items[0];
      this.renderer2.removeClass(item, 'active');
      return;
    }
    if (items.length) {
      let item = items[0];
      this.renderer2.removeClass(item, 'active');
    }

    this.renderer2.addClass(
      this.categoryItems.children[this.categoryIndex].children[0],
      'active'
    );
  }
}
