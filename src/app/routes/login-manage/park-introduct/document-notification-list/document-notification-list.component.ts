import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SearchCommonVO } from '@core/vo/comm/SearchCommonVO';
import { ListPageInfo, PageTypeEnum } from '@core/vo/comm/BusinessEnum';
import {
  ParkIntroductManageService,
  ParkIntroductManageServiceNs,
} from '@core/biz-services/park-introduct/park-introduct-manage.service';
import NoticeModel = ParkIntroductManageServiceNs.NoticeModel;

enum PageEnum {
  List,
  Detail
}

enum ParkPageTypeEnum {
  Announcement = 1, // 公告
  IndustryNews, // 行业动态发布
  FileNotifi, // 文件通知
  ParkIntroduction, // 园区介绍
  MainPage,
  AnnouncementDetail,
  IndustryNewsDetail
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
  dataList: NoticeModel[];
  @Output() returnBackToMainPage: EventEmitter<any>;
  listPageInfo: ListPageInfo;
  data = {
    otherdata: 1,
    time: new Date(),
  };

  constructor(private dataService: ParkIntroductManageService, private cdr: ChangeDetectorRef) {
    this.returnBackToMainPage = new EventEmitter<any>();
    this.currentPageNum = this.pageEnum.List;
    this.dataList = [];
    this.listPageInfo = {
      total: 0,
      ps: 10,// 每页数量
      pi: 1,// 当前页码
    };
  }

  goList() {

    this.currentPageNum = this.pageEnum.List;
  }

  goMainList() {
    this.returnBackToMainPage.emit();
  }

  goDetail() {
    this.currentPageNum = this.pageEnum.Detail;
  }

  async getDataList(pageNumSet?: number) {
    const params: SearchCommonVO<{ noticeType: number }> = {
      pageSize: 10,
      pageNum: pageNumSet || this.listPageInfo.pi,
      filters: { noticeType: ParkPageTypeEnum.FileNotifi },
    };
    const { total, list, pageNum } = await this.dataService.getAnnouncementList(params);
    this.dataList = list;
    this.listPageInfo.total = total;
    this.listPageInfo.pi = pageNum;
    this.currentPageNum = pageNum;
    this.cdr.markForCheck();
  }

  ngOnInit() {
    this.getDataList();
  }

}
