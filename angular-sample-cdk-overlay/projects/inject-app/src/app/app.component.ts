import { Component } from '@angular/core';
import { OverlayContentComponent } from './overlay-content/overlay-content.component';
import { AppOverlayService } from './overlay/overlay.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  result?: any;

  constructor(
    private readonly _overlay: AppOverlayService,
  ) {
  }

  showOverlay() {
    const ref = this._overlay.show(OverlayContentComponent, { name: 'hoge' });
    ref.closed$.subscribe(v => this.result = v);
  }
}
