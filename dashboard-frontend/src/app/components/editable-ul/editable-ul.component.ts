import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from 'events';

type falseTrue = 'false' | 'true';

@Component({
  selector: 'app-editable-ul',
  templateUrl: './editable-ul.component.html',
  styleUrls: ['./editable-ul.component.css']
})
export class EditableUlComponent<T> implements OnInit {
  @Input() editable: falseTrue = 'false';
  @Input() deletable: falseTrue = 'false';
  @Input() toggleable: falseTrue = 'false';
  @Input() linkEnable: falseTrue = 'false';
  @Input() routePath = '/';

  @Input() dataList: Array<
    T & { title: string; status: boolean; id: number | string }
  >;

  @Output() elemDelete = new EventEmitter();
  @Output() dataChange = new EventEmitter();
  @Output() elemToggle = new EventEmitter();

  constructor() {}

  ngOnInit() {
    if (this.editable === 'true') {
      this.linkEnable = 'false';
    }
  }

  deleteElem(i: number) {
    console.log('delete elem');
    this.elemDelete.emit('delete', i);
  }

  updateElem(i: number) {
    console.log('update elemememe');
    this.dataChange.emit('change', i);
  }

  toggleStatus(i: number) {
    console.log('toggle status');
    this.elemToggle.emit('toggle', i);
  }
}
