import {
  ChangeDetectionStrategy,
  Component, ElementRef,
  EventEmitter,
  HostBinding,
  Input, OnDestroy,
  Output
} from '@angular/core';
import { Column, SortOrder } from '../../../interfaces';
import { ResizeHelperService } from '../../../services';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header-cell',
  templateUrl: './header-cell.component.html',
  styleUrls: ['./header-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderCellComponent implements OnDestroy {
  @Input()
  column: Column;

  @Output()
  cellResize: EventEmitter<Column> = new EventEmitter<Column>();

  @Output()
  sortingChange: EventEmitter<Column> = new EventEmitter<Column>();

  @HostBinding('style.width.px')
  get width() {
    return this.column.width;
  }

  private colChangeSubscription: Subscription = Subscription.EMPTY;
  private destroyed$ = new Subject<void>();

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private resizeHelperService: ResizeHelperService) {
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  resizeInit(event: MouseEvent): void {
    if (!this.column.resizable) {
      return;
    }
    this.colChangeSubscription.unsubscribe();
    const { nativeElement: resizable } = this.elementRef;
    this.colChangeSubscription = this.resizeHelperService
      .resizeInit(event, resizable)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((width) => {
        const column = {
          ...this.column,
          width
        }
        this.cellResize.emit(column)
      });
  }

  onSortingChange(sortOrder: SortOrder) {
    const data: Column = { ...this.column, sortOrder };
    this.sortingChange.emit(data);
  }
}
