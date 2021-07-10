import { Component, OnInit } from '@angular/core';
import { TaskBoard } from '../models/task';
import { moveItemInArray, CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss']
})
export class TaskBoardComponent implements OnInit {
  connectedTo: string[] = [];
  board: TaskBoard = {
    columnList: [
      {
        state: 'やること',
        id: '1',
        taskList: [
          {
            id: 1,
            title: 'あああ',
            description: '',
          },
          {
            id: 2,
            title: 'test',
            description: '',
          },
        ],
      },
      {
        state: '実行中',
        id: '2',
        taskList: [
          {
            id: 1,
            title: 'あああ',
            description: '',
          },
          {
            id: 2,
            title: 'test',
            description: '',
          },
        ],
      }
    ]
  };
  constructor() { }

  ngOnInit() {
    for (const column of this.board.columnList) {
      this.connectedTo.push(column.id);
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
