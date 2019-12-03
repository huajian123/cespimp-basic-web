import { Component, OnInit } from '@angular/core';
import { STColumn } from '@delon/abc';

@Component({
  selector: 'alarm-list',
  templateUrl: './alarm-list.component.html',
  styleUrls: ['./alarm-list.component.scss'],
})
export class AlarmListComponent implements OnInit {
  columns: STColumn[];
  dataList: any[];

  constructor() {
    this.dataList = [
      { productName: 'No234', title: '设备类型', casNo: '2018-01-12' },
      { productName: 'No234', title: '设备类型', casNo: '2018-01-12' },
      { productName: 'No234', title: '设备类型', casNo: '2018-01-12' },
      { productName: 'No234', title: '设备类型', casNo: '2018-01-12' },
      { productName: 'No234', title: '设备类型', casNo: '2018-01-12' },
      { productName: 'No234', title: '设备类型', casNo: '2018-01-12' },
      { productName: 'No234', title: '设备类型', casNo: '2018-01-12' },
      { productName: 'No234', title: '设备类型', casNo: '2018-01-12' },
      { productName: 'No234', title: '设备类型', casNo: '2018-01-12' },
      { productName: 'No234', title: '设备类型', casNo: '2018-01-12' },
      { productName: 'No234', title: '设备类型', casNo: '2018-01-12' },
      { productName: 'No234', title: '设备类型', casNo: '2018-01-12' },
      { productName: 'No234', title: '设备类型', casNo: '2018-01-12' },
      { productName: 'No234', title: '设备类型', casNo: '2018-01-12' },
      { productName: 'No234', title: '设备类型', casNo: '2018-01-12' },
      { productName: 'No234', title: '设备类型', casNo: '2018-01-12' },
      { productName: 'No234', title: '设备类型', casNo: '2018-01-12' },
    ];
  }

  private initTable(): void {
    this.columns = [
      { title: '设备编号', index: 'productName', width: 180 },
      { title: '报警类型', index: 'title', width: 180 },
      { title: '报警时间', index: 'casNo', width: 180 },
    ];
  }

  ngOnInit() {
    this.initTable();
  }

}
