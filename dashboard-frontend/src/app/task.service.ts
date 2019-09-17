import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from './task';
import { map, retry } from 'rxjs/operators';
import { TASKS } from './mock-tasks';
import { Subtask } from './subtask';
import { TaskListComponent } from './task-list/task-list.component';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor() {}

  getTaskList(): Observable<Task[]> {
    return of(TASKS);
  }

  getTask(id: string | number): Observable<Task> {
    return this.getTaskList().pipe(
      map((tasks: Task[]) => tasks.find(task => String(task.id) === String(id)))
    );
  }

  getSubtaskList(taskId: string | number): Observable<Subtask[]> {
    return this.getTaskList().pipe(
      map(
        (tasks: Task[]) =>
          tasks.find(task => String(task.id) === String(taskId)).subtasks
      )
    );
  }

  addNewTask() {
    const newId = +TASKS[TASKS.length - 1].id + 1;
    const newTask = new Task(newId, '', '', false, []);
    TASKS.push(newTask);
    return newId;
  }

  updateTask(id: string | number, newData: Task) {
    const ind = TASKS.findIndex(t => String(t.id) === String(id));
    if (ind === -1) {
      return;
    }
    TASKS[ind] = { ...TASKS[ind], ...newData };
  }
}
