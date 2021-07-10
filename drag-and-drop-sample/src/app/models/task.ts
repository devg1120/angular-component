export class Task {
  id: number;
  title: string;
  description: string;
}

export class TaskColumn {
  state: string;
  id: string;
  taskList: Task[];
}

export class TaskBoard {
  columnList: TaskColumn[];
}
