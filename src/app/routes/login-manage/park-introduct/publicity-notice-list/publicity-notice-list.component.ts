import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

enum PageEnum {
  List,
  Detail
}


@Component({
  selector: 'publicity-notice-list',
  templateUrl: './publicity-notice-list.component.html',
  styleUrls: ['./publicity-notice-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicityNoticeListComponent implements OnInit {
  pageEnum = PageEnum;
  currentPageNum: number;

  constructor() {
    this.currentPageNum = this.pageEnum.List;
  }

  goDetail() {
    this.currentPageNum = this.pageEnum.Detail;
  }

  ngOnInit() {
  }

}
