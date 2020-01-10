import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ListPageInfo, OptionsInterface, RoleEnum } from '@core/vo/comm/BusinessEnum';
import { STColumn, STData } from '@delon/abc';
import { EVENT_KEY } from '@env/staticVariable';
import {
  ParkIntroductManageService,
  ParkIntroductManageServiceNs,
} from '@core/biz-services/park-introduct/park-introduct-manage.service';
import NoticeModel = ParkIntroductManageServiceNs.NoticeModel;
import { MapPipe, MapSet } from '@shared/directives/pipe/map.pipe';
import { GoBackParam } from '@core/vo/comm/ReturnBackVo';
import { MessageType, ShowMessageService } from '../../../../widget/show-message/show-message';

enum NoticeTypeEnum {
  Announcement = 1, // 公告
  IndustryNews, // 行业动态发布
  FileNotifi, // 文件通知
  ParkIntroduction // 园区介绍
}

enum PageTypeEnum {
  Announcement = 1, // 公告
  IndustryNews, // 行业动态发布
  FileNotifi, // 文件通知
  ParkIntroduction, // 园区介绍
  List,
  AddOrEdit,
  Detail,
}

@Component({
  selector: 'park-introduct-manage',
  templateUrl: './park-introduct-manage.component.html',
  styleUrls: ['./park-introduct-manage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParkIntroductManageComponent implements OnInit {
  currentTopBg: string;
  listPageInfo: ListPageInfo;
  columns: STColumn[];
  currentNoticeType: number;
  noticeTypeOptions: OptionsInterface[];
  currentNoticeTypeStr: string;

  dataList: NoticeModel[];
  currentPage: number;
  pageTypeEnum = PageTypeEnum;
  // 选中列的id
  itemId: number;


  constructor(private dataService: ParkIntroductManageService, private messageService: ShowMessageService, private cdr: ChangeDetectorRef) {
    this.currentPage = this.pageTypeEnum.List;
    this.listPageInfo = {
      total: 0,
      ps: 10,// 每页数量
      pi: 1,// 当前页码
    };
    this.itemId = null;
    this.currentTopBg = `url(../../../../assets/imgs/login-manage/manage-top.png) center no-repeat, #000949`;
    this.columns = [];
    this.noticeTypeOptions = [];
    this.currentNoticeType = NoticeTypeEnum.Announcement;
    this.currentNoticeTypeStr = '公告';

  }

  add() {
    this.itemId = null;
    this.currentPage = this.currentNoticeType;
  }

  del(item) {
    const modalCtrl = this.messageService.showAlertMessage('', '您确定要删除吗？', MessageType.Confirm);
    modalCtrl.afterClose.subscribe((type: string) => {
      if (type !== 'onOk') {
        return;
      }
      this.dataService.delNotice(item.id).then(() => this.getDataList(this.listPageInfo.pi));
    });
  }

  goEditPage(item) {
    this.itemId = item.id;
    this.currentPage = this.currentNoticeType;
  }

  async returnToList(e?: GoBackParam) {
    this.currentPage = this.pageTypeEnum.List;
    if (!!e && e.refesh) {
      this.listPageInfo.pi = e.pageNo;
      await this.getDataList(e.pageNo);
    }
  }

  changeNoticeType() {
    switch (this.currentNoticeType) {
      case PageTypeEnum.Announcement:
        this.currentNoticeTypeStr = '公告';
        break;
      case PageTypeEnum.IndustryNews:
        this.currentNoticeTypeStr = '行业动态';
        break;
      case PageTypeEnum.FileNotifi:
        this.currentNoticeTypeStr = '文件通知';
        break;
      case PageTypeEnum.ParkIntroduction:
        this.currentNoticeTypeStr = '园区介绍';
        break;
      default:
        this.currentNoticeTypeStr = '公告';
        break;
    }

    this.getDataList(1);
  }

  async getDataList(pageNumber?: number) {
    const params = {
      pageNum: pageNumber || this.listPageInfo.pi,
      pageSize: this.listPageInfo.ps,
      filters: { noticeType: this.currentNoticeType },
    };
    const { total, list, pageNum } = await this.dataService.getAnnouncementList(params);
    this.listPageInfo.total = total;
    this.listPageInfo.pi = pageNum;
    this.dataList = list || [];
    this.cdr.markForCheck();
  }

  format(toBeFormat, arg) {
    return new MapPipe().transform(toBeFormat, arg);
  }

  private initTable(): void {
    this.columns = [
      {
        title: '类型',
        index: 'noticeType',
        width: 120,
        format: (item: STData, _col: STColumn, index) => this.format(item[_col.indexKey], _col.indexKey),
      },
      { title: '标题', index: 'title', width: 120 },
      {
        title: '发布时间',
        index: 'createTime',
        width: 100,
        type: 'date',
      },
      {
        title: '操作',
        fixed: 'right',
        width: '130px',
        buttons: [
          {
            text: '编辑',
            icon: 'edit',
            click: this.goEditPage.bind(this),
          },
          {
            text: '删除',
            icon: 'delete',
            click: this.del.bind(this),
          },
        ],
      },
    ];
  }

  ngOnInit() {
    this.noticeTypeOptions = [...MapPipe.transformMapToArray(MapSet.noticeType)];
    this.initTable();
    this.getDataList(1);
  }

}
