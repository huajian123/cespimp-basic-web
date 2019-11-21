import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'park-introduction-detail',
  templateUrl: './park-introduction-detail.component.html',
  styleUrls: ['./park-introduction-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParkIntroductionDetailComponent implements OnInit {
  @Output() returnToMainPage: EventEmitter<any>;
  constructor() {
    this.returnToMainPage = new EventEmitter<any>();
  }

  goNoticeList() {
    this.returnToMainPage.emit();
  }

  ngOnInit() {
  }

}
