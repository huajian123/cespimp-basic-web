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

export class SearchCommonVO {
  pageNum: number;
  pageSize: number;
}
