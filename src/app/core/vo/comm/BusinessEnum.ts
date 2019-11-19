export enum PageTypeEnum {
  List = 1,
  AddOrEdit,
  DetailOrExamine
}

export interface ListPageInfo {
  total: number;
  pi: number; // 当前页码
  ps: number; // 每页数量
}

export enum RoleEnum {
  SysAdmin = 1,
  Enterprise, // 企业
  ParkManage  // 园区
}

export class SearchCommonVO {
  pageNum: number;
  pageSize: number;
}

export interface LoginInfoModel {
  entprId: number;
  id: number;
  createBy: string;
  createTime: Date;
  delFlag: boolean;
  mobileTel: string;
  password: string;
  realName: string;
  role: number;
  updateBy: string;
  updateTime: Date;
  userName: string;
}
