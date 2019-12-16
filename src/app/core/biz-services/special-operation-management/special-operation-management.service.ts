import { Injectable } from '@angular/core';
import { HttpUtilService } from '@core/net/http-util.service';
import { SearchCommonVO } from '@core/vo/comm/BusinessEnum';
import { PageInfo } from '@core/vo/comm/PageInfo';

export namespace SpecialOperationManagementServiceNs {
  export interface SpecialOperationInfoModel {
    id: number;
    operationType: SpecialInfoEnum;
    operationName: string;
    operationPlace: string;
    operationContent: string;
    operationCertificate: string;
    applicationName: string;
    guardianName: string;
    leadingName: string;
    operationStartTime: Date;
    operationEndTime: Date;
    reviewName?: string;
    reviewTime?: Date;
    reviewExplain?: number;
    reviewStatus: number;
  }
  export enum SpecialInfoEnum {
    HotWork = 1, // 动火作业
    ConfinedSpaceWork, // 受限空间作业
    ElevatedWork,// 高处作业
    HoistingOperation,// 吊装作业
    TemporaryElectricity,// 临时用电
    EquipmentOverhaul,// 设备检修
    BlindPlate,// 盲板抽堵
    OpenCircuit,// 断路作业
    EarthMoving,// 动土作业
  }

  export class SpecialOperationInfoServiceClass {
    constructor(private http: HttpUtilService) {
    }

    /*新增接口*/
   /* public addSpecialOperation(param: SpecialOperationInfoModel): Promise<void> {
      return this.http.post('data/basic/enterprise/rooms', param, { needSuccessInfo: true }).toPromise();
    }*/

    /*修改接口*/
  /*  public editSpecialOperation(param: SpecialOperationInfoModel): Promise<void> {
      return this.http.put('data/basic/enterprise/rooms', param, { needSuccessInfo: true }).toPromise();
    }*/

    /*库房详情*/
  /*  public getSpecialOperationInfoDetail(id: number): Promise<SpecialOperationInfoModel> {
      return this.http.get('data/basic/enterprise/rooms/' + id).toPromise();
    }*/

    /*特种作业列表*/
    public getSpecialOperationList(param: SearchCommonVO): Promise<PageInfo<SpecialOperationInfoModel>> {
      return this.http.get('data/basic/enterprise/specials', param).toPromise();
    }

    /*删除接口*/
  /*  public delSpecialOperationInfo(id: number): Promise<SpecialOperationInfoModel> {
      return this.http.del('data/basic/enterprise/rooms/' + id).toPromise();
    }*/
  }
}

@Injectable({
  providedIn: 'root',
})
export class SpecialOperationInfoService extends SpecialOperationManagementServiceNs.SpecialOperationInfoServiceClass {
  constructor(http: HttpUtilService) {
    super(http);
  }

}
