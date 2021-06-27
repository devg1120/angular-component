import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-focus-trap-sample-page',
  templateUrl: './focus-trap-sample-page.component.html',
  styleUrls: ['./focus-trap-sample-page.component.scss'],
})
export class FocusTrapSamplePageComponent {
  private nativeElement: HTMLElement;
  isVisibleDialog = false;

  constructor(private element: ElementRef) {
    this.nativeElement = element.nativeElement;
  }

  openDialog(): void {
    this.isVisibleDialog = true;
    const dialogTitle = this.nativeElement.querySelector('h1');
    if (dialogTitle) {
      dialogTitle.focus();
    }
  }

  closeDialog(): void {
    this.isVisibleDialog = false;
  }
}
