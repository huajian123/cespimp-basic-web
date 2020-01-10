import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  ParkIntroductManageService,
  ParkIntroductManageServiceNs,
} from '@core/biz-services/park-introduct/park-introduct-manage.service';
import NoticeModel = ParkIntroductManageServiceNs.NoticeModel;
import { SearchCommonVO } from '@core/vo/comm/SearchCommonVO';

enum PageTypeEnum {
  MainPage,
  PlatformIntroduction,
  PublicityNotice,
  IndustryDynamics,
  DocumentNotice
}

export enum ParkIntroductPageTypeEnum {
  Announcement = 1, // 公告
  IndustryNews, // 行业动态发布
  FileNotifi, // 文件通知
  ParkIntroduction, // 园区介绍
  MainPage,
  AnnouncementDetail,
  IndustryNewsDetail
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
  parkIntroductionInfo: NoticeModel;
  parkIntroductPageTypeEnum = ParkIntroductPageTypeEnum;
  announcementList: NoticeModel[];
  sleAnnouncementOrNews: NoticeModel; // 选中的公告或行业动态
  industryNewsList: NoticeModel[]; // 行业动态列表
  fileNotifiList: NoticeModel[]; // 文件通知列表
  constructor(private dataService: ParkIntroductManageService, private cdr: ChangeDetectorRef) {
    this.currentPageType = this.pageTypeEnum.MainPage;
    this.parkIntroductionInfo = {
      pictureUrl: '',
      detail: '',
    };
    this.announcementList = [];
    this.sleAnnouncementOrNews = {};
    this.industryNewsList = [];
    this.fileNotifiList = [];
  }

  goBack() {
    this.currentPageType = this.pageTypeEnum.MainPage;
  }

  goPage(pageEnum: PageTypeEnum) {
    this.currentPageType = pageEnum;
    console.log(this.currentPageType);
  }

  // 获取企业介绍
  getPageInfo() {
    // 获取园区介绍
    const params: SearchCommonVO<{ noticeType: number }> = {
      pageSize: 1,
      pageNum: 1,
      filters: { noticeType: ParkIntroductPageTypeEnum.ParkIntroduction },
    };
    this.dataService.getAnnouncementList(params).then(res => {
      this.parkIntroductionInfo = res.list[0];
      this.cdr.markForCheck();
    });

    // 获取公告
    params.pageSize = 5;
    params.filters.noticeType = this.parkIntroductPageTypeEnum.Announcement;
    this.dataService.getAnnouncementList(params).then(res => {
      this.announcementList = res.list;
      this.cdr.markForCheck();
    });

    // 获取行业动态
    params.pageSize = 2;
    params.filters.noticeType = this.parkIntroductPageTypeEnum.IndustryNews;
    this.dataService.getAnnouncementList(params).then(res => {
      this.industryNewsList = res.list;
      this.cdr.markForCheck();
    });

    // 获取文件通知列表
    params.pageSize = 5;
    params.filters.noticeType = this.parkIntroductPageTypeEnum.FileNotifi;
    this.dataService.getAnnouncementList(params).then(res => {
      this.fileNotifiList = res.list;
      this.cdr.markForCheck();
    });
  }

  ngOnInit() {
    this.getPageInfo();
  }

}
