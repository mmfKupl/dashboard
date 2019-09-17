import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { MainButtonService } from '../main-button.service';
import { Subtask } from '../subtask';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('subtaskList', { static: false }) subtaskList: ElementRef;
  @ViewChild('h1', { static: false }) h1: ElementRef;

  task: Task;
  id: string | number;

  mainBntSubscription: Subscription;
  returnBntSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: TaskService,
    private btnService: MainButtonService
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          this.id = params.get('id');
          return this.service.getTask(this.id);
        })
      )
      .subscribe(t => (this.task = t))
      .unsubscribe();
    this.mainBntSubscription = this.btnService.mainBtn$.subscribe(d =>
      this.addNewSubTask()
    );
    this.returnBntSubscription = this.btnService.returnBtn$.subscribe(d =>
      this.router.navigateByUrl('tasks')
    );
  }

  ngOnDestroy() {
    this.mainBntSubscription.unsubscribe();
    this.returnBntSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    if (this.task && !this.task.title.trim()) {
      console.log(this.h1.nativeElement.children[0]);
      this.h1.nativeElement.children[0].click();
    }
  }

  onViewModeH1() {
    this.task.title = this.task.title.replace(/\s+/g, ' ').trim();
    this.h1.nativeElement.classList.add('text0-indent-20');
    this.updateTask();
  }

  onViewModeSub(i: number) {
    this.task.subtasks[i].title = this.task.subtasks[i].title
      .replace(/\s+/g, ' ')
      .trim();
    this.updateTask();
  }

  onEditModeH1() {
    this.h1.nativeElement.classList.remove('text0-indent-20');
  }

  addNewSubTask() {
    if (!this.task) {
      return;
    }
    const subs = this.task.subtasks;
    const newId = subs.length ? +subs[subs.length - 1].id + 1 : 1;
    const newSubtask = new Subtask(newId, '', false);
    this.task.subtasks.push(newSubtask);
    setTimeout(() => {
      const ulChildren = this.subtaskList.nativeElement.children;
      const lastLi = ulChildren[ulChildren.length - 1];
      const lastP = lastLi.children[1];
      lastP.children[0].click();
    });
  }

  onDesctiptionBlur() {
    this.updateTask();
  }

  deleteSubtask(i: number) {
    this.task.subtasks.splice(i, 1);
    this.updateTask();
  }

  trackByFn(i: number, item: Subtask) {
    return item.id;
  }

  changeSubStatus() {
    this.updateTask();
  }

  updateTask() {
    console.log('to server -> ', this.task);
  }
}
