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
  selector: 'industry-dynamics-list',
  templateUrl: './industry-dynamics-list.component.html',
  styleUrls: ['./industry-dynamics-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndustryDynamicsListComponent implements OnInit {
  pageEnum = PageEnum;
  currentPageNum: number;
  @Output() returnBackToMainPage: EventEmitter<any>;
  dataInfo: any;
  dataList: NoticeModel[];
  selData: NoticeModel; // 选中的当前数据
  listPageInfo: ListPageInfo;
  constructor(private dataService: ParkIntroductManageService, private cdr: ChangeDetectorRef) {
    this.returnBackToMainPage = new EventEmitter<any>();
    this.currentPageNum = this.pageEnum.List;
    this.dataList = [];
    this.selData = {};
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

  goDetail(index) {
    console.log(this.dataList);
    this.selData = this.dataList[index];
    console.log(this.selData);
    this.currentPageNum = this.pageEnum.Detail;
  }

  async getDataList(pageNumSet?: number) {
    const params: SearchCommonVO<{ noticeType: number }> = {
      pageSize: 10,
      pageNum: pageNumSet || this.listPageInfo.pi,
      filters: {noticeType: ParkPageTypeEnum.IndustryNews}
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
