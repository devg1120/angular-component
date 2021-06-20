import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TablePageComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: TablePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableRoutingModule {}
