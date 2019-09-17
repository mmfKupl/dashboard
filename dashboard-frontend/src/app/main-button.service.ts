import { Injectable } from '@angular/core';
import { of, fromEvent, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainButtonService {
  mainBtn$: Observable<Event>;
  returnBtn$: Observable<Event>;

  constructor() {}

  initObservation(mainBtn: HTMLElement, returnBtn: HTMLElement) {
    this.mainBtn$ = fromEvent(mainBtn, 'click');
    this.returnBtn$ = fromEvent(returnBtn, 'click');
  }
}
