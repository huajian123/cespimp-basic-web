export enum PageTypeEnum {
  List = 1,
  AddOrEdit,
  DetailOrExamine
}

export interface ListPageInfo {
  total: number;
  ps: number; // 当前页码
  pi: number; // 每页数量
}
