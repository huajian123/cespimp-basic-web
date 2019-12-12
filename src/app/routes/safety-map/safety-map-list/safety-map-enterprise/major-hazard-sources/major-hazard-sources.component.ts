import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListPageInfo, PageTypeEnum } from '@core/vo/comm/BusinessEnum';
import { STColumn, STData } from '@delon/abc';
import { MapPipe } from '@shared/directives/pipe/map.pipe';

enum TabChangeEnum {
  Unit = 1,
  Danger,
  Sensor,
  Camera
}

@Component({
  selector: 'major-hazard-sources',
  templateUrl: './major-hazard-sources.component.html',
  styleUrls: ['./major-hazard-sources.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MajorHazardSourcesComponent implements OnInit {
  validateForm: FormGroup;
  currentPage: number;
  pageTypeEnum = PageTypeEnum;
  itemId: number;
  listPageInfo: ListPageInfo;
  columns: STColumn[];
  @Input() showModel: boolean;
  @Output() showModelChange = new EventEmitter<boolean>();
  dataList: [];

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.columns = [
      { title: '单元类别', index: 'roomNo', width: 120 },
      { title: '单元名称', index: 'roomName', width: 100 },
      { title: '单元编号', index: 'roomArea', width: 120 },
      {
        title: '投用时间',
        index: 'roomForm',
        width: 100,
        format: (item: STData, _col: STColumn, index) => this.format(item[_col.indexKey], _col.indexKey),
      },
      { title: '在厂区的位置', index: 'locFactory', width: 100 },
      {
        title: '操作',
        fixed: 'right',
        width: '60px',
        buttons: [
          {
            text: '查看',
            icon: 'eye',
            click: this.goDetailPage.bind(this),
          },
        ],
      },
    ];
    this.listPageInfo = {
      total: 0,
      ps: 10,// 每页数量
      pi: 1,// 当前页码
    };
  }

  initForm() {
    this.validateForm = this.fb.group({
      roomForm: [null, []],
    });
  }

  goDetailPage(item, modal) {
    this.itemId = item.id;
    this.currentPage = this.pageTypeEnum.DetailOrExamine;
  }

  format(toBeFormat, arg) {
    return new MapPipe().transform(toBeFormat, arg);
  }

  SelectChanged(e): void {
    switch (e.index) {
      case TabChangeEnum.Unit: {
        this.columns = [
          { title: '单元类别', index: 'roomNo', width: 120 },
          { title: '单元名称', index: 'roomName', width: 100 },
          { title: '单元编号', index: 'roomArea', width: 120 },
          {
            title: '投用时间',
            index: 'roomForm',
            width: 100,
            format: (item: STData, _col: STColumn, index) => this.format(item[_col.indexKey], _col.indexKey),
          },
          { title: '在厂区的位置', index: 'locFactory', width: 100 },
          {
            title: '操作',
            fixed: 'right',
            width: '60px',
            buttons: [
              {
                text: '查看',
                icon: 'eye',
                click: this.goDetailPage.bind(this),
              },
            ],
          },
        ];
        break;
      }
      case TabChangeEnum.Danger: {
        this.columns = [
          { title: '品名', index: 'roomNo', width: 120 },
          { title: 'CAS号', index: 'roomName', width: 100 },
          { title: '临界量（吨）', index: 'roomArea', width: 120 },
          {
            title: '设计储存最大量（吨）',
            index: 'roomForm',
            width: 100,
            format: (item: STData, _col: STColumn, index) => this.format(item[_col.indexKey], _col.indexKey),
          },
        ];
        break;
      }
      case TabChangeEnum.Sensor: {
        this.columns = [
          { title: '传感器名称', index: 'roomNo', width: 120 },
          { title: '传感器编号', index: 'roomName', width: 100 },
          { title: '传感器类型', index: 'roomArea', width: 120 },
          {
            title: '在厂区位置',
            index: 'roomForm',
            width: 100,
            format: (item: STData, _col: STColumn, index) => this.format(item[_col.indexKey], _col.indexKey),
          },
          {
            title: '操作',
            fixed: 'right',
            width: '60px',
            buttons: [
              {
                text: '查看',
                icon: 'eye',
                click: this.goDetailPage.bind(this),
              },
            ],
          },
        ];
        break;
      }
      case TabChangeEnum.Camera: {
        this.columns = [
          { title: '摄像头名称', index: 'roomNo', width: 120 },
          { title: '摄像头编号', index: 'roomName', width: 100 },
          { title: '在厂区位置', index: 'roomArea', width: 120 },
          {
            title: '操作',
            fixed: 'right',
            width: '60px',
            buttons: [
              {
                text: '查看',
                icon: 'eye',
                click: this.goDetailPage.bind(this),
              },
            ],
          },
        ];
        break;
      }
    }
    //console.log(e.index);
  }

  initTable() {
  }

  close() {
    this.showModel = false;
    this.showModelChange.emit(false);
  }

  ngOnInit() {
    this.initForm();
  }

}
