import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'industry-dynamics-detail',
  templateUrl: './industry-dynamics-detail.component.html',
  styleUrls: ['./industry-dynamics-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndustryDynamicsDetailComponent implements OnInit {
  text = `<p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 10px 0px; color: #ffffff; font-size: 17px; line-height: 1.75em; font-family: 微软雅黑; white-space: normal; text-align: justify; text-indent: 2em;"><span style="box-sizing: border-box; font-size: 16px;">根据原国家安全监管总局《对安全生产领域失信行为开展联合惩戒的实施办法》（安监总办〔2017〕49号）规定和国务院批复江苏响水天嘉宜化工有限公司“3•21”特别重大爆炸事故调查报告，经研究，拟将事故的直接责任企业和在相关安评中介服务中负有责任的中介机构作为安全生产领域联合惩戒对象推送国家应急管理部，现公示如下：<br/></span></p><p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 10px 0px; color: rgb(51, 51, 51); font-size: 17px; line-height: 1.75em; font-family: 微软雅黑; white-space: normal; text-align: justify; text-indent: 2em;"><span style="box-sizing: border-box; font-size: 16px;">1.江苏响水天嘉宜化工有限公司</span></p><p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 10px 0px; color: rgb(51, 51, 51); font-size: 17px; line-height: 1.75em; font-family: 微软雅黑; white-space: normal; text-align: justify; text-indent: 2em;"><span style="box-sizing: border-box; font-size: 16px;">2.江苏天工大成安全技术有限公司</span></p><p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 10px 0px; color: rgb(51, 51, 51); font-size: 17px; line-height: 1.75em; font-family: 微软雅黑; white-space: normal; text-align: justify; text-indent: 2em;"><span style="box-sizing: border-box; font-size: 16px;">公示时间为5个工作日，从2019年11月19日至2019年11月26日。公示期间，对以上联合惩戒对象的有关意见，可通过来信、来电、来访的形式向省应急厅调查评估和统计处反映。接待电话：025－83332394。</span></p><p><br/></p>`;

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
