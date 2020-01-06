import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'park-introduct-manage',
  templateUrl: './park-introduct-manage.component.html',
  styles: [],
})
export class ParkIntroductManageComponent implements OnInit {
  currentTopBg: string;

  constructor() {
    this.currentTopBg = `url(../../../../assets/imgs/login-manage/manage-top.png) center no-repeat, #000949`;
  }

  ngOnInit() {
  }

}
