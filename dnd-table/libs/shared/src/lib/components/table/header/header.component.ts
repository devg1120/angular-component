import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Column } from '../../../interfaces';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input()
  columns: Column[] = [];

  @Output()
  columnResize: EventEmitter<Column> = new EventEmitter<Column>();

  @Output()
  sortingChange: EventEmitter<Column> = new EventEmitter<Column>();

  @Output()
  columnMove: EventEmitter<CdkDragDrop<Column>> = new EventEmitter<CdkDragDrop<Column>>();

  onColumnResize(column: Column) {
    this.columnResize.emit(column);
  }

  dropListDropped(event: CdkDragDrop<Column>) {
    this.columnMove.emit(event);
  }

  onSortingChange(column: Column) {
    this.sortingChange.emit(column);
  }
}
