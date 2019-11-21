import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';

enum PageEnum {
  List,
  Detail
}


@Component({
  selector: 'document-notification-list',
  templateUrl: './document-notification-list.component.html',
  styleUrls: ['./document-notification-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentNotificationListComponent implements OnInit {
  pageEnum = PageEnum;
  currentPageNum: number;
  @Output() returnBackToMainPage: EventEmitter<any>;
  data = {
    otherdata: 1,
    time: new Date(),
  };
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
