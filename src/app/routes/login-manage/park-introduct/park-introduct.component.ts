import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

enum PageTypeEnum {
  MainPage,
  PlatformIntroduction,
  PublicityNotice,
  IndustryDynamics,
  DocumentNotice
}

@Component({
  selector: 'park-introduct',
  templateUrl: './park-introduct.component.html',
  styleUrls: ['./park-introduct.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParkIntroductComponent implements OnInit {
  pageTypeEnum = PageTypeEnum;
  currentPageType: PageTypeEnum;

  constructor() {
    this.currentPageType = this.pageTypeEnum.MainPage;
  }

  goPage(pageEnum: PageTypeEnum) {
    this.currentPageType = pageEnum;
    console.log(this.currentPageType);
  }

  ngOnInit() {
  }

}
