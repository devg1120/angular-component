import { Component, Inject, OnInit, Optional } from '@angular/core';
import { AppOverlayRef } from '../overlay/overlay-ref';
import { APP_OVERLAY_DATA } from '../overlay/overlay.service';

@Component({
  selector: 'app-overlay-content',
  templateUrl: './overlay-content.component.html',
  styleUrls: ['./overlay-content.component.scss'],
})
export class OverlayContentComponent implements OnInit {

  constructor(
    readonly overlayRef: AppOverlayRef<OverlayContentComponent>,
    @Inject(APP_OVERLAY_DATA) @Optional() readonly data?: any) {
  }

  ngOnInit(): void {
  }

  close() {
    this.overlayRef.close(this.data);
  }
}
