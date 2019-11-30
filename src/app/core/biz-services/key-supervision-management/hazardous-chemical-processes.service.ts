import { Injectable } from '@angular/core';
import { HttpUtilService } from '@core/net/http-util.service';
import { SearchCommonVO } from '@core/vo/comm/BusinessEnum';
import { PageInfo } from '@core/vo/comm/PageInfo';

export namespace HazardousChemicalProcessesListServiceNs {
  export interface HazardousChemicalProcessesInfoModel {
    id: number;
    processName: string;
  }

  export interface HazardousChemicalProcessesSearchModel {
    entprName?: string;
    processName?: string;
  }

  export class HazardousChemicalProcessesInfoServiceClass {
    constructor(private http: HttpUtilService) {
    }


    /*新增接口*/
    public addHazardousChemicalProcesses(param: HazardousChemicalProcessesInfoModel): Promise<void> {
      return this.http.post('data/major/hazard/process', param, { needSuccessInfo: true }).toPromise();
    }

    /*修改接口*/
    public editHazardousChemicalProcesses(param: HazardousChemicalProcessesInfoModel): Promise<void> {
      return this.http.put('data/major/hazard/process', param, { needSuccessInfo: true }).toPromise();
    }

    /*详情接口*/
    public getHazardousChemicalProcessesInfoDetail(id: number): Promise<HazardousChemicalProcessesInfoModel> {
      return this.http.get('data/major/hazard/process/' + id).toPromise();
    }

    /*列表接口*/
    public getHazardousChemicalProcessesList(param: SearchCommonVO & HazardousChemicalProcessesSearchModel): Promise<PageInfo<HazardousChemicalProcessesInfoModel>> {
      return this.http.get('data/major/hazard/processes', param).toPromise();
    }

    /*删除接口*/
    public delHazardousChemicalProcesses(id: number): Promise<HazardousChemicalProcessesInfoModel> {
      return this.http.del('data/major/hazard/process/' + id).toPromise();
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class HazardousChemicalProcessesInfoService extends HazardousChemicalProcessesListServiceNs.HazardousChemicalProcessesInfoServiceClass {

  constructor(http: HttpUtilService) {
    super(http);
  }

}
