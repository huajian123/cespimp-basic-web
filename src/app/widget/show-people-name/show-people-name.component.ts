import {Component, OnInit} from '@angular/core';
import {BaseConfirmModal} from '../base-confirm-modal';

/*

const params = {
  dataArray: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17'],
  lineCount: 4
};
this.mapService.show(params).then(res => {
  console.log(res);
}), catchError((e) => e);


*/

@Component({
  selector: 'app-show-people-name',
  templateUrl: './show-people-name.component.html',
  styleUrls: ['./show-people-name.component.scss']
})
export class ShowPeopleNameComponent extends BaseConfirmModal.BasicConfirmModalComponent<any> implements OnInit {

  dataList: string[];
  totalLines = 0; // 总共行数
  lineCount = 6; // 一行多少个

  temp = [];

  constructor() {
    super();

  }

  // 初始化数据数组
  initDataArray() {

    // this.dataList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
    // console.log(this.dataList.length % this.lineCount);
    if (this.dataList.length % this.lineCount > 0) {
      if (this.dataList.length > this.lineCount) {
        // tslint:disable-next-line:no-bitwise
        this.totalLines = (this.dataList.length / this.lineCount + 1) | 0;
      } else {
        this.totalLines = 1;
      }
    } else {
      this.totalLines = this.dataList.length / this.lineCount;
    }

    this.temp = [];
    for (let i = 0; i < this.totalLines; i++) {
      const oneLineArray = [...this.dataList.splice(0, this.lineCount)];
      this.temp.push(oneLineArray);
    }
  }

  ngOnInit() {
    this.dataList = this.params.dataArray;
    this.lineCount = this.params.lineCount;
    this.initDataArray();
  }

  protected getCurrentValue(): any {
  }

}
