import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { SortOrder } from '../../interfaces';

@Component({
  selector: 'app-sort-button',
  templateUrl: './sort-button.component.html',
  styleUrls: ['./sort-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SortButtonComponent {
  @Input()
  sortOrder: SortOrder;

  sortOrderValues = SortOrder;

  @Output()
  sortingChange: EventEmitter<SortOrder> = new EventEmitter<SortOrder>();

  onSortingChange() {
    const sortOrder: SortOrder = this.getNextSorting(this.sortOrder);

    this.sortingChange.emit(sortOrder);
  }

  private getNextSorting(sortOrder: SortOrder): SortOrder {
    switch (sortOrder) {
      case SortOrder.Asc:
        return SortOrder.Desc;
      case SortOrder.Desc:
        return SortOrder.None;
      case SortOrder.None:
      default:
        return SortOrder.Asc;
    }
  }
}
