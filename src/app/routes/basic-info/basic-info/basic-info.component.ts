import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { NzMessageService } from 'ng-zorro-antd';
import { tap } from 'rxjs/operators';
import { BasicInfoService } from '@core/biz-services/basic-info/basic-info.service';

@Component({
  selector: 'app-basic-info-basic-info',
  templateUrl: './basic-info.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicInfoBasicInfoComponent implements OnInit {
  /* basicNum = 0;
   amountNum = 0;
   goods = this.http.get('/profile/goods').pipe(
     tap((list: any[]) => {
       list.forEach(item => {
         this.basicNum += Number(item.num);
         this.amountNum += Number(item.amount);
       });
     }),
   );*/
  goodsColumns: STColumn[] = [
    {
      title: '商品编号',
      index: 'id',
      type: 'link',
      click: (item: any) => this.msg.success(`show ${item.id}`),
    },
    { title: '商品名称', index: 'name' },
    { title: '商品条码', index: 'barcode' },
    { title: '单价', index: 'price', type: 'currency' },
    { title: '数量（件）', index: 'num', className: 'text-right' },
    { title: '金额', index: 'amount', type: 'currency' },
  ];
  progress = '';
  progressColumns: STColumn[] = [
    { title: '时间', index: 'time' },
    { title: '当前进度', index: 'rate' },
    {
      title: '状态',
      index: 'status',
      type: 'badge',
      badge: {
        success: { text: '成功', color: 'success' },
        processing: { text: '进行中', color: 'processing' },
      },
    },
    { title: '操作员ID', index: 'operator' },
    { title: '耗时', index: 'cost' },
  ];

  constructor(private dataService: BasicInfoService, private msg: NzMessageService) {
  }

  async getDataList() {
    const dataList = await this.dataService.getUserInfo();
    console.log(dataList);
  }

  ngOnInit(): void {
   this.getDataList();
  }
}
