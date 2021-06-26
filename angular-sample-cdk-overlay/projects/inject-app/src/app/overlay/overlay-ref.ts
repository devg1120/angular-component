import type { OverlayRef } from '@angular/cdk/overlay';
import { Observable, Subject } from 'rxjs';
import { first } from 'rxjs/operators';

export class AppOverlayRef<TComponent = any, TResult = any> {

  private readonly _closed$ = new Subject<TResult | undefined>();

  get closed$(): Observable<TResult | undefined> {
    return this._closed$.asObservable();
  }

  component!: TComponent;
  returnData?: any;

  constructor(
    private readonly _overlayRef: OverlayRef,
  ) {
    // OverlayRefに表示されているComponentがDetachされたらclosed$に値を放流する
    this._overlayRef.detachments()
      .pipe(first())
      .subscribe(() => {
        this._closed$.next(this.returnData);
        this._closed$.complete();
      });
  }

  close(data?: TResult): void {
    this.returnData = data;
    this._overlayRef.dispose();
  }
}
