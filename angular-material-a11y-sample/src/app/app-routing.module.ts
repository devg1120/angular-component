import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TopPageComponent} from './pages/top-page/top-page.component';
import {FocusTrapSamplePageComponent} from './pages/focus-trap-sample/component/focus-trap-sample-page/focus-trap-sample-page.component';
import {ListKeyManagerSamplePageComponent} from './pages/list-key-manager-sample/component/list-key-manager-sample-page/list-key-manager-sample-page.component';

const routes: Routes = [
  {path: '', component: TopPageComponent},
  {path: 'dialog-sample', component: FocusTrapSamplePageComponent},
  {path: 'list-sample', component: ListKeyManagerSamplePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
