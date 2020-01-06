import { Injectable } from '@angular/core';
import { HttpUtilService } from '@core/net/http-util.service';
import { PageInfo } from '@core/vo/comm/PageInfo';
import { SearchCommonVO } from '@core/vo/comm/SearchCommonVO';

export namespace ParkIntroductManageServiceNs {
  export interface NoticeModel {
    id?: number;
    noticeType?: number;
    title?: string;
    detail?: string;
    pictureUrl?: string;
    fileUrl?: string;
    createTime?: Date;
    fileName?: string;
  }

  export class ParkIntroductManageServiceClass {
    constructor(private http: HttpUtilService) {
    }

    // 获取通知列表
    public getAnnouncementList(param: SearchCommonVO<{ noticeType: number }>): Promise<PageInfo<NoticeModel>> {
      return this.http.post('/basic/notice/query', param).toPromise();
    }

    // 新增列表
    public addNotice(param: SearchCommonVO<{ noticeType: number }>): Promise<PageInfo<NoticeModel>> {
      return this.http.post('/basic/notice/insert', param, { needSuccessInfo: true }).toPromise();
    }

    // 删除通知列表
    public delNotice(id: number): Promise<PageInfo<NoticeModel>> {
      return this.http.post('/basic/notice/delete', { id: id }, { needSuccessInfo: true }).toPromise();
    }


    public editNotice(params: NoticeModel): Promise<void> {
      return this.http.post('/basic/notice/update', params, { needSuccessInfo: true }).toPromise();
    }

    public getNoticeInfo(id: number): Promise<NoticeModel> {
      return this.http.post('/basic/notice/queryById', { id: id }).toPromise();
    }

  }
}

@Injectable({
  providedIn: 'root',
})
export class ParkIntroductManageService extends ParkIntroductManageServiceNs.ParkIntroductManageServiceClass {

  constructor(http: HttpUtilService) {
    super(http);
  }
}
