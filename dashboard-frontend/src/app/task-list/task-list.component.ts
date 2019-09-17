import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';
import { TaskService } from '../task.service';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { Task } from '../task';
import { MainButtonService } from '../main-button.service';
import { Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnDestroy {
  @ViewChild('taskList', { static: false }) taskListUl: ElementRef;

  tasks$: Observable<Task[]>;

  tmpEventSubscription: Subscription;
  tmpBlurEventSubscription: Subscription;
  bntSubscription: Subscription;

  displaingStatus = false;

  constructor(
    private service: TaskService,
    private btnService: MainButtonService,
    private router: Router
  ) {}

  ngOnInit() {
    this.tasks$ = this.service.getTaskList();
    this.bntSubscription = this.btnService.mainBtn$.subscribe(d =>
      this.addNewTask()
    );
  }

  ngOnDestroy() {
    this.bntSubscription.unsubscribe();
  }

  addNewTask() {
    const addData = this.service.addNewTask();
    this.router.navigateByUrl(`task/${addData}`);
  }

  get filteredTasks$(): Observable<Task[]> {
    console.log(this.tasks$.subscribe(t => console.log(t)));
    return this.tasks$.pipe(
      map(tasks => tasks.filter(task => task.status === this.displaingStatus))
    );
  }
}
