import { Component, OnInit,  ViewContainerRef } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MyFirstPanelComponent } from './my-first-panel/my-first-panel.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  title = 'app';

  constructor(private overlay: Overlay) { }

  ngOnInit() {
    const overlayRef = this.overlay.create();

    overlayRef.attach(new ComponentPortal(MyFirstPanelComponent));
  }
}

