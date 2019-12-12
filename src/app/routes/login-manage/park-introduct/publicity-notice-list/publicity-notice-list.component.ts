import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';

enum PageEnum {
  List,
  Detail
}


@Component({
  selector: 'publicity-notice-list',
  templateUrl: './publicity-notice-list.component.html',
  styleUrls: ['./publicity-notice-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicityNoticeListComponent implements OnInit {
  pageEnum = PageEnum;
  currentPageNum: number;
  @Output() returnBackToMainPage: EventEmitter<any>;
  publicityNoticeDetail: any;

  constructor() {
    this.returnBackToMainPage = new EventEmitter<any>();
    this.currentPageNum = this.pageEnum.List;
  }

  goList() {

    this.currentPageNum = this.pageEnum.List;
  }

  goMainList() {
    this.returnBackToMainPage.emit();
  }

  goDetail(index) {
    if (index === 1) {
      this.publicityNoticeDetail = `<p style="text-align:center"><span style="color:#ffffff"><span style="font-size:10.5pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:22.0pt"><span style="font-family:宋体">告</span></span> <span style="font-size:22.0pt"><span style="font-family:宋体">示</span></span></span></span></span></p>

<p style="text-align:center">&nbsp;</p>

<p style="text-align:left"><span style="color:#ffffff"><span style="font-size:10.5pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:16.0pt"><span style="font-family:宋体">&nbsp; 根据上级要求，吴中化工园区于</span></span><span style="font-size:16.0pt">2019</span><span style="font-size:16.0pt"><span style="font-family:宋体">年</span></span><span style="font-size:16.0pt">12</span><span style="font-size:16.0pt"><span style="font-family:宋体">月</span></span><span style="font-size:16.0pt">1</span><span style="font-size:16.0pt"><span style="font-family:宋体">日起实行封闭化管理试运行。所有进出园区的企业车辆请通过封闭化管理平台企业端软件进行车牌申报登记以免造成通行不便。危险品运输车辆请按相关要求在封闭化管理平台企业端软件做好入园登记、申报等工作，并按规定卡口、规定线路行驶。</span></span></span></span></span></p>

<p style="text-align:left"><span style="color:#ffffff"><span style="font-size:10.5pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:16.0pt"><span style="font-family:宋体">&nbsp; 特此告知。</span></span></span></span></span></p>

<p style="text-align:left">&nbsp;</p>

<p style="text-align:left">&nbsp;</p>

<p style="text-align:left"><span style="color:#ffffff"><span style="font-size:10.5pt"><span style="font-family:Calibri,sans-serif">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp;   &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;<span style="font-size:16.0pt"><span style="font-family:宋体">吴中化工园区管理委员会（筹）</span></span></span></span></span></p>
`;
    }
    if (index === 2) {
      this.publicityNoticeDetail = `<p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 10px 0px; color: rgb(51, 51, 51); font-size: 17px; line-height: 1.75em; font-family: 微软雅黑; text-indent: 0em; white-space: normal; text-align: justify;"><span style="box-sizing: border-box; font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(255, 255, 255);">徐州、连云港、淮安、盐城、宿迁市应急管理局：</span></p><p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 10px 0px; color: rgb(51, 51, 51); font-size: 17px; line-height: 1.75em; font-family: 微软雅黑; white-space: normal; text-indent: 2em; text-align: justify;"><span style="box-sizing: border-box; font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(255, 255, 255);">为贯彻落实《省安委办关于中央企业结对帮扶提升徐州等五市危化品安全生产能力的通知》（安委办〔2019〕39号）要求，加快推进中央企业结对帮扶提升徐州等五市危化品安全生产能力工作，经研究，决定于11月中旬在南京召开中央企业结对帮扶提升徐州等五市危化品安全生产能力会议。</span></p><p><br/></p>`;
    }
    if (index === 3) {
      this.publicityNoticeDetail = `<p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 10px 0px; color: rgb(51, 51, 51); font-size: 17px; line-height: 1.75em; font-family: 微软雅黑; text-indent: 0em; white-space: normal; text-align: justify;"><span style="box-sizing: border-box; font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(255, 255, 255);">各设区市应急管理局：</span></p><p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 10px 0px; color: rgb(51, 51, 51); font-size: 17px; line-height: 1.75em; font-family: 微软雅黑; white-space: normal; text-align: justify; text-indent: 2em;"><span style="box-sizing: border-box; font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(255, 255, 255);">为认真总结分析今年以来全省安全生产调查统计和诚信体系建设工作情况，研究当前工作中存在的问题和难题，筹划部署明年工作，经研究，决定于2019年11月26日至27日在南京召开全省安全生产调查统计和诚信体系建设工作会议。</span></p><p><br/></p>`;
    }
    if (index === 4) {
      this.publicityNoticeDetail = `<p><span style="font-size: 16px; text-indent: 2em; color: rgb(255, 255, 255);">截止2019年10月31日，全省共有江苏华扬液碳有限责任公司等176家危险化学品生产企业（见附件）的《危险化学品生产企业安全生产许可证》不在有效期内，或者在有效期内不再从事危险化学品生产活动的，一并注销安全生产许可证，现予以公告。</span></p>`;
    }
    if (index === 5) {
      this.publicityNoticeDetail = `<p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 10px 0px; color: rgb(51, 51, 51); font-size: 17px; line-height: 1.75em; font-family: 微软雅黑; text-indent: 0em; white-space: normal; text-align: justify;"><span style="box-sizing: border-box; font-size: 16px; color: rgb(255, 255, 255);">各设区市应急管理局：</span></p><p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 10px 0px; color: rgb(51, 51, 51); font-size: 17px; line-height: 1.75em; font-family: 微软雅黑; white-space: normal; text-align: justify; text-indent: 2em;"><span style="box-sizing: border-box; font-size: 16px; color: rgb(255, 255, 255);">为认真贯彻落实省委省政府关于做好停产化工企业安全生产工作的要求，采取有力措施，切实加强停产停业、复工复产、关闭退出化工企业安全生产工作，防范化解重大安全风险，遏制各类生产安全事故发生，现提出如下工作措施。</span></p><p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 10px 0px; color: rgb(51, 51, 51); font-size: 17px; line-height: 1.75em; font-family: 微软雅黑; white-space: normal; text-align: justify; text-indent: 2em;"><span style="font-size: 16px; text-indent: 2em; color: rgb(255, 255, 255);">一、强化停产停业企业安全风险管控</span></p><p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 10px 0px; color: rgb(51, 51, 51); font-size: 17px; line-height: 1.75em; font-family: 微软雅黑; white-space: normal; text-align: justify; text-indent: 2em;"><span style="font-size: 16px; text-indent: 2em; color: rgb(255, 255, 255);">二、强化复工复产企业安全措施落实</span></p><p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 10px 0px; color: rgb(51, 51, 51); font-size: 17px; line-height: 1.75em; font-family: 微软雅黑; white-space: normal; text-align: justify; text-indent: 2em;"><span style="font-size: 16px; text-indent: 2em; color: rgb(255, 255, 255);">三、强化关闭退出企业现场安全管理</span></p><p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 10px 0px; color: rgb(51, 51, 51); font-size: 17px; line-height: 1.75em; font-family: 微软雅黑; white-space: normal; text-align: justify; text-indent: 2em;"><span style="font-size: 16px; text-indent: 2em; color: rgb(255, 255, 255);">四、强化安全监管执法</span></p><p><br/></p>`;
    }
    if (index === 6) {
      this.publicityNoticeDetail = `<p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 10px 0px; color: rgb(51, 51, 51); font-size: 17px; line-height: 1.75em; font-family: 微软雅黑; text-indent: 0em; white-space: normal; text-align: justify;"><span style="box-sizing: border-box; font-size: 16px; color: rgb(255, 255, 255);">各设市区应急管理局：</span></p><p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 10px 0px; color: rgb(51, 51, 51); font-size: 17px; line-height: 1.75em; font-family: 微软雅黑; white-space: normal; text-indent: 2em; text-align: justify;"><span style="box-sizing: border-box; font-size: 16px; color: rgb(255, 255, 255);">为认真落实《江苏省化工企业安全生产信息化管理平台建设基本要求（试行）》，充分发挥省级试点企业的示范作用，提升化工企业安全生产信息化管理平台建设水平，经研究，决定召开全省化工企业安全生产信息化管理平台建设现场会。现将有关事项通知如下。</span></p><p><br/></p>`;
    }
    if (index === 7) {
      this.publicityNoticeDetail = `<p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 10px 0px; color: rgb(51, 51, 51); font-size: 17px; line-height: 1.75em; font-family: 微软雅黑; text-indent: 0em; white-space: normal; text-align: justify;"><span style="box-sizing: border-box; font-size: 16px; color: rgb(255, 255, 255);">各设区市应急管理局：</span></p><p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 10px 0px; color: rgb(51, 51, 51); font-size: 17px; line-height: 1.75em; font-family: 微软雅黑; white-space: normal; text-align: justify; text-indent: 2em;"><span style="box-sizing: border-box; font-size: 16px; color: rgb(255, 255, 255);">为贯彻落实《省委办公厅省政府办公厅关于印发〈江苏省化工产业安全环保整治提升方案〉的通知》（苏办〔2019〕96号），统筹推进全省化工企业安全生产信息化管理平台建设，确保《江苏省化工企业安全生产信息化管理平台建设基本要求》落到实处。现将《江苏省化工企业安全风险分区分级指南（试行）》印发给你们，请结合本地实际，指导辖区内化工企业认真开展安全风险分区分级工作。</span></p><p><br/></p>`;
    }
    this.currentPageNum = this.pageEnum.Detail;
  }

  ngOnInit() {
    this.publicityNoticeDetail = '';
  }

}
