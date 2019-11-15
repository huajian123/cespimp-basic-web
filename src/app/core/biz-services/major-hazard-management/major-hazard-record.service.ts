import { Injectable } from '@angular/core';
import { HttpUtilService } from '@core/net/http-util.service';
import { SearchCommonVO } from '@core/vo/comm/BusinessEnum';
import { PageInfo } from '@core/vo/comm/PageInfo';
export namespace MajorHazardRecordListServiceNs {
  export interface MajorHazardRecordListInfoModel {
    id: number;
    majorHazardId: string;
    applicationName: string;
    applicationTime:Date;
    reviewName?: string;
    reviewTime?: Date;
    reviewExplain: number;
    reviewStatus?: number;
  }

  export interface EntprSearch {
    entprId: number;
  }

  export class MajorHazardRecordListInfoServiceClass {
    constructor(private http: HttpUtilService) {
    }

    public getMajorHazardRecordInfoDetail(param: EntprSearch): Promise<MajorHazardRecordListInfoModel> {
      return this.http.get('data/basic/enterprise/'+param.entprId).toPromise();
    }

    public getMajorHazardRecordList(param: SearchCommonVO): Promise<PageInfo<MajorHazardRecordListInfoModel>> {
      return this.http.get('data/major/hazard/examine', param).toPromise();
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class MajorHazardRecordListInfoService extends MajorHazardRecordListServiceNs.MajorHazardRecordListInfoServiceClass {

  constructor(http: HttpUtilService) {
    super(http);
  }

}
