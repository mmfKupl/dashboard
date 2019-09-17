import {
  Component,
  OnInit,
  ContentChild,
  Output,
  ElementRef,
  OnDestroy
} from '@angular/core';
import { ViewModeDirective } from './view-mode.directive';
import { EditModeDirective } from './edit-mode.directive';
import { Subject, fromEvent } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { take, filter, switchMapTo } from 'rxjs/operators';

@Component({
  selector: 'app-editable',
  template: `
    <ng-container *ngTemplateOutlet="currentView"></ng-container>
  `,
  styleUrls: ['./editable.component.css']
})
export class EditableComponent implements OnInit, OnDestroy {
  @ContentChild(ViewModeDirective, { static: false })
  viewModeTpl: ViewModeDirective;

  @ContentChild(EditModeDirective, { static: false })
  editModeTpl: EditModeDirective;

  @Output() update = new EventEmitter();
  @Output() toEditMode = new EventEmitter();

  editMode = new Subject();
  editMode$ = this.editMode.asObservable();

  mode: 'view' | 'edit' = 'view';

  constructor(private host: ElementRef) {}

  ngOnInit() {
    this.viewModeHandler();
    this.editModeHandler();
  }

  toViewMode() {
    this.update.emit('update');
    this.mode = 'view';
  }

  private get element() {
    return this.host.nativeElement;
  }

  private viewModeHandler() {
    fromEvent(this.element, 'click')
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.mode = 'edit';
        this.editMode.next(true);
        this.toEditMode.emit('toEditMode');
      });
  }

  private editModeHandler() {
    const clickOutside$ = fromEvent(document, 'click').pipe(
      filter(({ target }) => {
        return !this.element.contains(target) && this.mode === 'edit';
      }),
      take(1)
    );

    this.editMode$
      .pipe(
        switchMapTo(clickOutside$),
        untilDestroyed(this)
      )
      .subscribe(event => this.toViewMode());
  }

  get currentView() {
    return this.mode === 'view' ? this.viewModeTpl.tpl : this.editModeTpl.tpl;
  }

  ngOnDestroy() {}
}
