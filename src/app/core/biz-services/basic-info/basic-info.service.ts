import { Injectable } from '@angular/core';
import { HttpUtilService } from '@core/net/http-util.service';
import { SearchCommonVO } from '@core/vo/comm/BusinessEnum';
import { PageInfo } from '@core/vo/comm/PageInfo';


export namespace BasicInfoServiceNs {
  export interface FactoryInfoModel {
    id: number;
    entprName: string;
    entprSimpleName?: string;
    region?: string;
    detailAddr?: string;
    entprScope?: { lng: number, lat: number }[];
    longitude: number; // 经度
    latitude: number; // 纬度
    legalPerson?: string;
    legalMobile?: string;
    boss?: string;
    bossMobile?: string;
    safetyManager?: string;
    safetyMobile?: string;
    businessScope?: string;
    operatingStatus?: number;
    ecoType?: number;
    entprScale?: number;
    regCapi?: number;
    floorArea?: number;
    employeeNum?: number;
    specialOperationNum?: number;
    standLevel?: number;
    safetySupervisionLevel?: number;
    localSafetyAdmin?: number;
  }

  export interface IdCardTabModel {
    id: number;
    uscCode: string;
    businessLicencesBeginTime?: Date;
    businessLicencesEndTime?: Date;
    businessLicencesRange?: string;
    businessLicencesAuthority?: string;
    businessLicencesAccessory?: string;
    safetyCertificateCode?: string;
    safetyCertificateBeginTime?: Date;
    safetyCertificateEndTime?: Date;
    safetyPermitRange?: string;
    safetyCertificateAuthority?: string;
    safetyCertificateAccessory?: string;
    dischargePermitCode?: string;
    dischargePermitBeginTime?: Date;
    dischargePermitEndTime?: Date;
    dischargePermitType?: string;
    dischargePermitAuthority?: string;
    safetyReportName?: string;
    safetyReportRecordTime?: Date;
    safetyReportAgency?: string;
    safetyReportAccessory?: string;
    environmentReportName?: string;
    environmentRecordTime?: Date;
    environmentReportAgency?: string;
    environmentReportAccessory?: string;
    dischargePermitAccessory?: string;
  }

  /*生产设备模型*/
  export interface ProductionDeviceListInfoModel {
    id: number;
    deviceNo: string;
    deviceName: string;
    deviceModel?: string;
    deviceFunction?: string;
  }


  // 企业环境信息模型
  export interface EnterpriseEnvironModel {
    id: number;
    envrType: number;
    envrName: string;
    envrDirection: number;
    miniDistance: number;
    buildStruct: number;
    adjacentBuildHeight: number;
    personNum: number;
    envrContacts: string;
    contactMoble: string;
  }

  export enum ProductEnum {
    RawMateriPro = 1, // 生产原料
    MidPro, // 中间产品
    FinalPro // 最终产品
  }

  // 企业产品信息模型
  export interface EnterpriseProductModel {
    id: number;
    entprId: number;
    productType: ProductEnum;
    productName: string;
    alias: string;
    casNo: string;
    annualConsumption: number;
    annualThroughput: number;
    maximumReserves: number;
  }

  export interface BasicInfoEntprSearchModel {
    entprName?: string;
  }

  export interface EntprSearch {
    entprId: number;
  }

  export interface EntprInfoSearch extends SearchCommonVO {
    entprName?: string;
    reviewStatus?: number;
  }

  export interface EntprPageSearchModel extends SearchCommonVO {
    entprId: number;
  }

  export interface EntprProductSearchModel extends EntprPageSearchModel {
    productType: ProductEnum;
  }

  export class BasicInfoServiceClass {
    constructor(private http: HttpUtilService) {
    }

    // 获取企业位置详情
    public getFactoryInfoDetail(param: EntprSearch): Promise<FactoryInfoModel> {
      return this.http.get('data/basic/enterprise/' + param.entprId).toPromise();
    }

    // 获取证照信息详情
    public getIdCardInfoDetail(param: EntprSearch): Promise<PageInfo<IdCardTabModel>> {
      return this.http.get('data/basic/document/', param).toPromise();
    }

    // 获取企业周边环境
    public getEnterpriseEnviron(param: EntprPageSearchModel): Promise<PageInfo<EnterpriseEnvironModel>> {
      return this.http.get('data/basic/enterprise/environments/', param).toPromise();
    }

    // 获取生产设备
    public getProductionDeviceList(param: EntprPageSearchModel): Promise<PageInfo<EnterpriseEnvironModel>> {
      return this.http.get('data/basic/enterprise/devices/', param).toPromise();
    }

    // 获取企业产品列表
    public getEnterProductList(param: EntprProductSearchModel): Promise<PageInfo<ProductionDeviceListInfoModel>> {
      return this.http.get('data/basic/enterprise/products/', param).toPromise();
    }

    // 获取企业列表
    public getFactoryList(param: SearchCommonVO & BasicInfoEntprSearchModel): Promise<PageInfo<FactoryInfoModel>> {
      return this.http.get('data/basic/enterprises', param).toPromise();
    }

    // 企业搜索接口
    public getFactoryInfoSearch(param: EntprInfoSearch): Promise<FactoryInfoModel> {
      return this.http.get('data/basic/enterprise/', param).toPromise();
    }

    // 删除接口
    /*   public delFactoryInfo(id: number): Promise<FactoryInfoModel> {
         return this.http.del('data/basic/enterprise/' + id).toPromise();
       }*/
  }
}

@Injectable({
  providedIn: 'root',
})
export class BasicInfoService extends BasicInfoServiceNs.BasicInfoServiceClass {

  constructor(http: HttpUtilService) {
    super(http);
  }

}
