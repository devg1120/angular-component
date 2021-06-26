import type { GlobalPositionStrategy, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import type { ComponentRef } from '@angular/core';
import { Component } from '@angular/core';
import { OverlayContentComponent } from './overlay-content/overlay-content.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  private _overlayRef?: OverlayRef;

  constructor(
    private readonly _overlay: Overlay,
  ) {
  }

  showOverlay() {
    let positionStrategy: GlobalPositionStrategy = this._overlay.position().global();
    positionStrategy = positionStrategy.centerVertically().centerHorizontally();
    // positionStrategy = positionStrategy.left('10px').bottom('10px');

    const config: OverlayConfig = {
      positionStrategy,

      width: 'auto',
      height: 'auto',
    };
    const overlayRef: OverlayRef = this._overlayRef = this._overlay.create(config);
    const componentPortal: ComponentPortal<OverlayContentComponent> = new ComponentPortal(OverlayContentComponent);
    const componentRef: ComponentRef<OverlayContentComponent> = overlayRef.attach(componentPortal);
  }

  closeOverlay() {
    this._overlayRef?.dispose();
    this._overlayRef = undefined;
  }
}
