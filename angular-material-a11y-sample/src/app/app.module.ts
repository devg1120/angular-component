import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { A11yModule } from '@angular/cdk/a11y';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FocusTrapSamplePageComponent } from './pages/focus-trap-sample/component/focus-trap-sample-page/focus-trap-sample-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopPageComponent } from './pages/top-page/top-page.component';
import {
  ListItemComponent,
} from './pages/list-key-manager-sample/component/list-item/list-item.component';
import {ListKeyManagerSamplePageComponent} from './pages/list-key-manager-sample/component/list-key-manager-sample-page/list-key-manager-sample-page.component';
import {FormsModule} from '@angular/forms';
import {ListComponent} from './pages/list-key-manager-sample/component/list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    ListKeyManagerSamplePageComponent,
    FocusTrapSamplePageComponent,
    TopPageComponent,
    ListItemComponent,
    ListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    A11yModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
