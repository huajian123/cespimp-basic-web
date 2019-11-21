import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'industry-dynamics-detail',
  templateUrl: './industry-dynamics-detail.component.html',
  styleUrls: ['./industry-dynamics-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndustryDynamicsDetailComponent implements OnInit {
  @Input() dataInfo;

  @Output() returnToNoticeList: EventEmitter<any>;

  constructor() {
    this.returnToNoticeList = new EventEmitter<any>();
  }

  goNoticeList() {
    this.returnToNoticeList.emit();
  }

  ngOnInit() {
  }

}
