import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MainButtonService } from '../main-button.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, AfterViewInit {
  @ViewChild('mainBtn', { static: false }) mainBtn;
  @ViewChild('returnBtn', { static: false }) returnBtn;

  constructor(private btnService: MainButtonService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.btnService.initObservation(
      this.mainBtn.nativeElement,
      this.returnBtn.nativeElement
    );
  }
}
