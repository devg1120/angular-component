import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../models/task';

@Component({
  selector: 'app-task-item-edit-dialog',
  templateUrl: './task-item-edit-dialog.component.html',
  styleUrls: ['./task-item-edit-dialog.component.scss']
})
export class TaskItemEditDialogComponent implements OnInit {

  initItem: Task = new Task();
  constructor(
    private dialogRef: MatDialogRef<TaskItemEditDialogComponent>, // 追加
    @Inject(MAT_DIALOG_DATA) public data: Task
  ) { }

  ngOnInit() {
    this.initItem = JSON.parse(JSON.stringify(this.data));
  }

  apply() {
    this.dialogRef.close(this.data);
  }

  cancel(): void {
    this.dialogRef.close(this.initItem);
  }

}
