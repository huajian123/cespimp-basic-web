import { Injectable } from '@angular/core';
import { HttpUtilService } from '@core/net/http-util.service';
import { SearchCommonVO } from '@core/vo/comm/BusinessEnum';
import { PageInfo } from '@core/vo/comm/PageInfo';
import { FormGroup } from '@angular/forms';

export namespace MajorHazardListServiceNs {
  export interface MajorHazardListInfoModel {
    id: number;
    majorHazardNo: string;
    majorHazardName: string;
    manager?: string;
    unitType: number;
    useDate?: Date;
    majorHazardLevel: number;
    majorHazardNature?: number;
    rvalue?: number;
    majorScope?: { lng: number, lat: number }[];
    locFactory?: string;
    managerMobile?: string;
    description?: string;
    majorHazardUnits: FormGroup[];
  }

  export interface MajorHazardRecordInfoModel extends EntprSearch {
    majorHazardId: number;
    applicationName: string;
  }

  export interface MajorHazardSelectedModel extends EntprSearch {
    partType: number;
  }

  export interface MajorHazardUnitList {
    partId: number;
    partNo: string;
    partName: string;
  }

  export interface EntprSearch {
    entprId: number;
  }

  export interface MajorHazardSearchModel {
    majorHazardNo?: string;
  }

  export class MajorHazardListInfoServiceClass {
    constructor(private http: HttpUtilService) {
    }

    /*新增接口*/
    public addMajorHazard(param: MajorHazardListInfoModel): Promise<void> {
      return this.http.post('data/major/hazard/info', param, { needSuccessInfo: true }).toPromise();
    }

    /*修改接口*/
    public editMajorHazard(param: MajorHazardListInfoModel): Promise<void> {
      return this.http.put('data/major/hazard/info', param, { needSuccessInfo: true }).toPromise();
    }

    /*详情接口*/
    public getMajorHazardInfoDetail(id: number): Promise<MajorHazardListInfoModel> {
      return this.http.get('data/major/hazard/info/' + id).toPromise();
    }

    /*列表信息接口*/
    public getMajorHazardList(param: SearchCommonVO & MajorHazardSearchModel): Promise<PageInfo<MajorHazardListInfoModel>> {
      return this.http.get('data/major/hazard/infos', param).toPromise();
    }

    /*删除接口*/
    public delMajorHazard(id: number): Promise<MajorHazardListInfoModel> {
      return this.http.del('data/major/hazard/info/' + id).toPromise();
    }

    /*重大危险源组成信息下拉列表*/
    public getMajorList(param: MajorHazardSelectedModel): Promise<MajorHazardUnitList[]> {
      return this.http.get('data/major/hazard/partUnit', param).toPromise();
    }

    /*重大危险源备案信息提交*/
    public getRecordInfo(param: MajorHazardRecordInfoModel): Promise<void> {
      return this.http.post('data/major/hazard/MajorHazardFiling', param).toPromise();
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class MajorHazardListInfoService extends MajorHazardListServiceNs.MajorHazardListInfoServiceClass {

  constructor(http: HttpUtilService) {
    super(http);
  }

}
