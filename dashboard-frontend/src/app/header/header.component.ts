import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  imgUrl = '../../assets/img/defaut-logo.png';

  userName = 'unlogged';

  constructor() {}

  ngOnInit() {}
}
