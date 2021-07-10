import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Task } from '../models/task';
import { MatDialog } from '@angular/material/dialog';
import { TaskItemEditDialogComponent } from '../task-item-edit-dialog/task-item-edit-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit, OnDestroy {
  @Input() item: Task = new Task();
  subscription: Subscription = new Subscription();
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  edit() {
    const dialogRef = this.dialog.open(TaskItemEditDialogComponent, {
      data: this.item,
      disableClose: true
    });
    this.subscription.add(dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.item = result;
      }
    }));
  }
}
