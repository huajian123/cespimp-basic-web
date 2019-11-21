import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';

enum PageEnum {
  List,
  Detail
}


@Component({
  selector: 'industry-dynamics-list',
  templateUrl: './industry-dynamics-list.component.html',
  styleUrls: ['./industry-dynamics-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndustryDynamicsListComponent implements OnInit {
  pageEnum = PageEnum;
  currentPageNum: number;
  @Output() returnBackToMainPage: EventEmitter<any>;

  constructor() {
    this.returnBackToMainPage = new EventEmitter<any>();
    this.currentPageNum = this.pageEnum.List;
  }

  goList() {

    this.currentPageNum = this.pageEnum.List;
  }

  goMainList(){
    this.returnBackToMainPage.emit();
  }

  goDetail() {
    this.currentPageNum = this.pageEnum.Detail;
  }


  ngOnInit() {
  }

}
