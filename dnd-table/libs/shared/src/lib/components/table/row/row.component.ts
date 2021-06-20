import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Column } from '../../../interfaces';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RowComponent {
  @Input()
  data: Record<string, unknown> = {};

  @Input()
  columns: Column[] = [];
}
