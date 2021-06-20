import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ResizeHelperService {
  private readonly renderer: Renderer2;
  constructor(private readonly rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }
  public resizeInit(event: MouseEvent, resizable: HTMLElement): Observable<number> {
    const columnWidth$ = new Subject<number>();
    const stopResize$ = new Subject<void>();
    const doDrag = (e: MouseEvent) => {
      const finalWidth: number = startWidth + e.clientX - startX;
      this.renderer.setStyle(resizable, 'width', finalWidth + 'px');
    };

    const stopDrag = (e: MouseEvent) => {
      document.documentElement.removeEventListener('mousemove', doDrag, false);
      document.documentElement.removeEventListener('mouseup', stopDrag, false);
      const finalWidth = startWidth + e.clientX - startX;
      columnWidth$.next(finalWidth);
      stopResize$.next();
      stopResize$.complete();
    };
    const startX: number = event.clientX;
    const startWidth: number = parseInt(document.defaultView?.getComputedStyle(resizable).width as string, 10);
    document.documentElement.addEventListener('mousemove', doDrag, false);
    document.documentElement.addEventListener('mouseup', stopDrag, false);
    return columnWidth$.asObservable().pipe(takeUntil(stopResize$));
  }
}
