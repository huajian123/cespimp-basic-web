import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  ParkIntroductManageService,
  ParkIntroductManageServiceNs,
} from '@core/biz-services/park-introduct/park-introduct-manage.service';
import NoticeModel = ParkIntroductManageServiceNs.NoticeModel;
import { SearchCommonVO } from '@core/vo/comm/SearchCommonVO';
import { ListPageInfo } from '@core/vo/comm/BusinessEnum';

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
  selector: 'publicity-notice-list',
  templateUrl: './publicity-notice-list.component.html',
  styleUrls: ['./publicity-notice-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicityNoticeListComponent implements OnInit {
  pageEnum = PageEnum;
  currentPageNum: number;
  @Output() returnBackToMainPage: EventEmitter<any>;
  dataList: NoticeModel[];
  listPageInfo: ListPageInfo;
  selData: NoticeModel; // 选中的当前数据
  constructor(private dataService: ParkIntroductManageService, private cdr: ChangeDetectorRef) {
    this.returnBackToMainPage = new EventEmitter<any>();
    this.currentPageNum = this.pageEnum.List;
    this.dataList = [];
    this.listPageInfo = {
      total: 0,
      ps: 10,// 每页数量
      pi: 1,// 当前页码
    };
    this.selData = {};
  }

  goList() {

    this.currentPageNum = this.pageEnum.List;
  }

  goMainList() {
    this.returnBackToMainPage.emit();
  }

  goDetail(index) {
    this.selData = this.dataList[index];
    this.currentPageNum = this.pageEnum.Detail;
  }

  async getDataList(pageNumSet?: number) {
    const params: SearchCommonVO<{ noticeType: number }> = {
      pageSize: 10,
      pageNum: pageNumSet || this.listPageInfo.pi,
      filters: {noticeType: ParkPageTypeEnum.Announcement}
    };
    const {total, list, pageNum} = await this.dataService.getAnnouncementList(params);
    this.dataList = list;
    this.listPageInfo.total = total;
    this.listPageInfo.pi = pageNum;
    this.cdr.markForCheck();
  }

  ngOnInit() {
    this.getDataList();
  }

}
