import type { GlobalPositionStrategy, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import type { ComponentRef, Type, ValueProvider } from '@angular/core';
import { Injectable, InjectionToken, Injector } from '@angular/core';
import { AppOverlayRef } from './overlay-ref';

/**
 * Overlayで表示されるComponentに渡されるデータを受け取るInjectionToken
 */
export const APP_OVERLAY_DATA = new InjectionToken<any>('APP_OVERLAY_DATA');

/**
 * Overlayを表示するサービス
 */
@Injectable({
  providedIn: 'root',
})
export class AppOverlayService {

  constructor(
    private readonly _injector: Injector,
    private readonly _overlay: Overlay,
  ) {
  }

  /**
   * Overlayを表示します。
   */
  show<TComponent>(component: Type<TComponent>, data?: any): AppOverlayRef {
    let positionStrategy: GlobalPositionStrategy = this._overlay.position().global();
    positionStrategy = positionStrategy.centerVertically().centerHorizontally();

    const config: OverlayConfig = {
      positionStrategy,

      width: 'auto',
      height: 'auto',
    };
    const overlayRef: OverlayRef = this._overlay.create(config);

    // 表示するComponentに渡すデータを含むInjectorの作成
    const appOverlayRef: AppOverlayRef<TComponent> = new AppOverlayRef<TComponent>(overlayRef);
    const injector: Injector = !data ? this._injector : Injector.create({
      parent: this._injector,
      providers: [
        { provide: AppOverlayRef, useValue: appOverlayRef } as ValueProvider,
        { provide: APP_OVERLAY_DATA, useValue: data } as ValueProvider,
      ],
    });

    // Component作成時に利用するInjectorを第3引数で指定する
    const componentPortal: ComponentPortal<TComponent> = new ComponentPortal(component, null, injector);
    const componentRef: ComponentRef<TComponent> = overlayRef.attach(componentPortal);

    appOverlayRef.component = componentRef.instance;

    return appOverlayRef;
  }
}
