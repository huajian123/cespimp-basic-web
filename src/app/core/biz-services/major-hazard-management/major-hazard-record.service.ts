import { Injectable } from '@angular/core';
import { HttpUtilService } from '@core/net/http-util.service';
import { SearchCommonVO } from '@core/vo/comm/BusinessEnum';
import { PageInfo } from '@core/vo/comm/PageInfo';
export namespace MajorHazardRecordListServiceNs {
  export interface MajorHazardRecordListInfoModel {
    id?: number;
    majorHazardId?: string;
    applicationName?: string;
    applicationTime?:Date;
    reviewName?: string;
    reviewTime?: Date;
    reviewExplain?: string;
    reviewStatus?: number;
  }

  export interface EntprSearch {
    entprId: number;
  }

  export class MajorHazardRecordListInfoServiceClass {
    constructor(private http: HttpUtilService) {
    }
   /*详情接口*/
    public getMajorHazardRecordInfoDetail(id: number): Promise<MajorHazardRecordListInfoModel> {
      return this.http.get('data/major/hazard/examine/'+id).toPromise();
    }
    /*处理审核接口*/
    public getMajorHazardRecord(param:MajorHazardRecordListInfoModel): Promise<MajorHazardRecordListInfoModel> {
      return this.http.put('data/basic/enterprise/examination/'+param.id,param).toPromise();
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
