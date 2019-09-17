import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditableUlComponent } from './editable-ul/editable-ul.component';
import { EditableModule } from '../editable/editable.module';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { FocusableDirective } from '../focusable.directive';
import { TextFieldModule } from '@angular/cdk/text-field';

@NgModule({
  declarations: [EditableUlComponent, FocusableDirective],
  imports: [
    CommonModule,
    EditableModule,
    FormsModule,
    AppRoutingModule,
    TextFieldModule
  ],
  exports: [EditableUlComponent]
})
export class ComponentsModule {}
