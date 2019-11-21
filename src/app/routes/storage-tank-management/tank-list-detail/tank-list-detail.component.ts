import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { tap } from 'rxjs/operators';
import { STColumn } from '@delon/abc';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { TankListInfoService, TankListServiceNs } from '@core/biz-services/storage-tank-management/tank-list.service';
import TankListInfoModel = TankListServiceNs.TankListInfoModel;
import { PositionPickerService } from '../../../widget/position-picker/position-picker.service';


@Component({
  selector: 'app-storage-tank-management-tank-list-detail',
  templateUrl: './tank-list-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StorageTankManagementTankListDetailComponent implements OnInit {
  @Output() returnBack: EventEmitter<any>;
  @Input() id: number;
  @Input() currentPageNum: number;
  dataInfo: TankListInfoModel;


  basicNum = 0;
  amountNum = 0;
  goods = this.http.get('/profile/goods').pipe(
    tap((list: any[]) => {
      list.forEach(item => {
        this.basicNum += Number(item.num);
        this.amountNum += Number(item.amount);
      });
    }),
  );
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
  progress = this.http.get('/profile/progress');
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

  constructor(private http: _HttpClient, private msg: NzMessageService,
              private dataService: TankListInfoService, private cdr: ChangeDetectorRef,
              private positionPickerService: PositionPickerService) {
    this.returnBack = new EventEmitter<any>();

    this.dataInfo = {
      id: -1,
      tankNo: '',
      tankType: -1,
      tankForm: -1,
      tankStructure: -1,
      longitude: -1,
      latitude: -1,
      tankMate: -1,
      tankCapacity: -1,
      productionDate: new Date(),
      locFactory: '',
      majorHazardMaterialInsertDTOS: [],
      majorHazardMaterials: [],
    };
  }

  returnToList() {
    this.returnBack.emit({ refesh: false, pageNo: this.currentPageNum });
  }

  showMap() {
    this.positionPickerService.show({
      isRemoteImage: true,
      longitude: this.dataInfo.longitude,
      latitude: this.dataInfo.latitude,
    }).then().catch(e => e);
  }

  async getDetailInfo() {
    this.dataInfo = await this.dataService.getTankInfoDetail(this.id);
    this.cdr.markForCheck();
  }

  ngOnInit(): void {
    this.getDetailInfo();
  }
}
