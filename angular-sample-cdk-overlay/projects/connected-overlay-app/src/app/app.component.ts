import type { FlexibleConnectedPositionStrategy, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import type { ComponentRef, ElementRef } from '@angular/core';
import { Component } from '@angular/core';
import { OverlayContentComponent } from './overlay-content/overlay-content.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(
    private readonly _overlay: Overlay,
  ) {
  }

  showOverlay(origin: ElementRef) {
    let positionStrategy: FlexibleConnectedPositionStrategy = this._overlay.position().flexibleConnectedTo(origin);
    positionStrategy = positionStrategy.withPositions([
      { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top' },
      { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom' },
    ]);

    const config: OverlayConfig = {
      positionStrategy,

      width: 'auto',
      height: 'auto',
    };
    const overlayRef: OverlayRef = this._overlay.create(config);
    const componentPortal: ComponentPortal<OverlayContentComponent> = new ComponentPortal(OverlayContentComponent);
    const componentRef: ComponentRef<OverlayContentComponent> = overlayRef.attach(componentPortal);
  }
}
