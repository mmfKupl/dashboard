import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditableComponent } from './editable.component';
import { EditableOnEnterDirective } from './editable-on-enter.directive';
import { EditModeDirective } from './edit-mode.directive';
import { ViewModeDirective } from './view-mode.directive';

@NgModule({
  declarations: [
    EditModeDirective,
    ViewModeDirective,
    EditableOnEnterDirective,
    EditableComponent
  ],
  imports: [CommonModule],
  exports: [
    EditModeDirective,
    ViewModeDirective,
    EditableOnEnterDirective,
    EditableComponent
  ]
})
export class EditableModule {}
