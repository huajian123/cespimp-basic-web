import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'publicity-notice-detail',
  templateUrl: './publicity-notice-detail.component.html',
  styleUrls: ['./publicity-notice-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicityNoticeDetailComponent implements OnInit {
  @Input() dataInfo: any;

  @Output() returnToNoticeList: EventEmitter<any>;

  constructor() {
    this.returnToNoticeList = new EventEmitter<any>();
  }

  goNoticeList() {
    this.returnToNoticeList.emit();
  }

  ngOnInit() {
    console.log(this.dataInfo);
  }

}
