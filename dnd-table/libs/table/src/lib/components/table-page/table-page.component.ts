import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { DataService } from '../../services/data.service';
import { Column } from '@app/shared';
import { TableEntity } from '../../state/table/table.models';
import { TableFacade } from '../../state/table/table.facade';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablePageComponent implements OnInit {
  title = 'dnd-table';
  users$: Observable<TableEntity[]> = EMPTY;
  columns$: Observable<Column[]> = EMPTY;

  constructor(private dataService: DataService, private tableFacade: TableFacade) {
  }

  ngOnInit() {
    this.users$ = this.tableFacade.allTable$;
    this.columns$ = this.tableFacade.tableColumns$;
    this.tableFacade.init();
  }

  onColumnReorder({ previousIndex, currentIndex }: CdkDragDrop<Column>) {
    this.tableFacade.changeColumnsOrder(previousIndex, currentIndex);
  }

  onColumnResize({ field, width }: Column) {
    this.tableFacade.changeColumnWidth(field, width);
  }

  onSortingChange({ field, sortOrder }: Column) {
    this.tableFacade.sortByField(field, sortOrder);
  }
}
