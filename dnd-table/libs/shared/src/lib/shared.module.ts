import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  CellComponent,
  HeaderCellComponent,
  HeaderComponent,
  RowComponent,
  SortButtonComponent,
  TableComponent
} from './components';

const COMPONENTS = [
  TableComponent,
  HeaderComponent,
  RowComponent,
  CellComponent,
  HeaderCellComponent,
  SortButtonComponent
]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, DragDropModule],
  exports: [...COMPONENTS]
})
export class SharedModule {}
