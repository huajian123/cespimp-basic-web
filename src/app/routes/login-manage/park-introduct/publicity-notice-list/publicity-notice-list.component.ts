import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';

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
  @Output() returnBackToMainPage: EventEmitter<any>;

  constructor() {
    this.returnBackToMainPage = new EventEmitter<any>();
    this.currentPageNum = this.pageEnum.List;
  }

  goList() {

    this.currentPageNum = this.pageEnum.List;
  }

  goMainList(){
   this.returnBackToMainPage.emit();
  }

  goDetail() {
    this.currentPageNum = this.pageEnum.Detail;
  }

  ngOnInit() {
  }

}
