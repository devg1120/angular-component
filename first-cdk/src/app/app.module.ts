import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MyFirstPanelComponent } from './my-first-panel/my-first-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    MyFirstPanelComponent
  ],
  imports: [
    BrowserModule,
    OverlayModule,
  ],
  entryComponents: [MyFirstPanelComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
