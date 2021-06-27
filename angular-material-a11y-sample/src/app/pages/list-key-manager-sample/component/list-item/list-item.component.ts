import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { FocusableOption, FocusOrigin } from '@angular/cdk/a11y';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements FocusableOption {
  @HostBinding('tabindex') tabindex = '-1';
  @Input() fruit = '';
  disabled = false;

  constructor(private element: ElementRef) {}

  getLabel(): string {
    return this.fruit;
  }

  focus(origin?: FocusOrigin): void {
    this.element.nativeElement.focus();
  }
}
