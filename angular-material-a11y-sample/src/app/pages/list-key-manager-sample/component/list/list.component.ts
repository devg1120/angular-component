import {
  AfterContentInit,
  Component,
  ContentChildren,
  HostBinding,
  HostListener,
  QueryList,
} from '@angular/core';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-list',
  styles: [
    `
      :host {
        display: block;
        max-width: 30rem;
      }
    `,
  ],
  template: ` <ng-content></ng-content>`,
})
export class ListComponent implements AfterContentInit {
  @HostBinding('tabindex') tabindex = '0';
  @ContentChildren(ListItemComponent) items?: QueryList<ListItemComponent>;
  private keyManager?: FocusKeyManager<ListItemComponent>;

  @HostListener('keydown', ['$event'])
  manage(event: KeyboardEvent): void {
    if (!this.keyManager) {
      return;
    }
    this.keyManager.onKeydown(event);
  }

  ngAfterContentInit(): void {
    if (!this.items) {
      return;
    }
    this.keyManager = new FocusKeyManager<ListItemComponent>(
      this.items
    ).withWrap();
  }
}
