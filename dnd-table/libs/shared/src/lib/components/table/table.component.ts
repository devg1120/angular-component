import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Column } from '../../interfaces';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
  @Input()
  data: Record<string, unknown>[] = [];

  @Input()
  columns: Column[] = [];

  @Output()
  columnResize: EventEmitter<Column> = new EventEmitter<Column>();

  @Output()
  columnReorder: EventEmitter<CdkDragDrop<Column>> = new EventEmitter<CdkDragDrop<Column>>();

  @Output()
  sortingChange: EventEmitter<Column> = new EventEmitter<Column>();

  onColumnResize(column: Column) {
    if (column.resizable) {
      this.columnResize.emit(column);
    }
  }

  onColumnMove(event: CdkDragDrop<Column>) {
    this.columnReorder.emit(event);
  }

  onSortingChange(column: Column) {
    if (column.sortable) {
      this.sortingChange.emit(column)
    }
  }
}
