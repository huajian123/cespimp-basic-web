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
  dataInfo: any;

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
      this.dataInfo = `<p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 10px 0px; color: rgb(51, 51, 51); font-size: 17px; line-height: 1.75em; font-family: 微软雅黑; white-space: normal; text-align: justify; text-indent: 2em;"><span style="box-sizing: border-box; font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(255, 255, 255);">10月31日，省安全生产巡查工作领导小组会议在南京召开，研究审议第二批安全生产巡查报告并对下一步巡查工作作出部署安排。省委常委、常务副省长樊金龙出席会议并讲话，副省长费高云、刘旸出席会议。</span></p><p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 10px 0px; color: rgb(51, 51, 51); font-size: 17px; line-height: 1.75em; font-family: 微软雅黑; white-space: normal; text-align: justify; text-indent: 2em;"><span style="box-sizing: border-box; font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(255, 255, 255);">会议指出，全省第二批安全生产巡查紧紧围绕贯彻中央和省委省政府关于安全生产工作的决策部署，坚持问题导向，强化责任落实，取得明显成效。第二批巡查以南京市、省住房和城乡建设厅、省市场监管局为巡查对象，首次对行业主管部门进行巡查。要在前期巡查工作基础上，对照法律法规和部门“三定”方案进行全面体检，进一步查深查细查实，找准存在问题，督促整改到位，做到即知即改、立行立改。要持续跟进第一、第二批巡查对象整改落实情况，适时开展“回头看”，确保问题见底、措施到底、整治彻底，切实做好安全生产巡查“后半篇文章”。</span></p><p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 10px 0px; color: rgb(51, 51, 51); font-size: 17px; line-height: 1.75em; font-family: 微软雅黑; white-space: normal; text-align: justify; text-indent: 2em;"><span style="box-sizing: border-box; font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(255, 255, 255);">会议强调，安全生产巡查是落实省委省政府决策部署，推动安全生产责任落实、工作落实的有力抓手。要进一步完善巡查机制，紧盯问题台账，以信息化手段跟踪和推动问题整改，确保工作成链、整改闭环。要在巡查中梳理各地各部门安全生产工作建议，以巡查帮助基层解难题、办实事。要配强巡查工作力量，确保业务素质，提高巡查专业性、针对性、实效性。要实现安全生产巡查全覆盖，推动各设区市安全生产巡查11月份全部启动，县对乡镇（街道）巡查12月份全部启动，构建省市县乡四级巡查网络，并将巡查情况纳入年度安全生产考核，压紧夯实工作责任，全力促进全省安全生产形势平稳向好。</span></p><p><br/></p>`;
    }
    if (index === 2) {
      this.dataInfo = `<p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 10px 0px; color: rgb(51, 51, 51); font-size: 17px; line-height: 1.75em; font-family: 微软雅黑; white-space: normal; text-align: justify; text-indent: 2em;"><span style="box-sizing: border-box; font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(255, 255, 255);">10月25日-27日，2019中国安全及应急技术装备博览会在我省徐州市举办，副省长马秋林出席会议并致辞，应急管理部总工程师吴鑫，省应急管理厅厅长陈忠伟、副厅长沈仲一出席会议。<br/></span></p><p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 10px 0px; color: rgb(51, 51, 51); font-size: 17px; line-height: 1.75em; font-family: 微软雅黑; white-space: normal; text-align: justify; text-indent: 2em;"><span style="box-sizing: border-box; font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(255, 255, 255);">博览会以“汇聚产业精彩，赋能安全应急”为主题，由“一会一展两专题六论坛”和多个展演活动组成。博览会期间，组织了安全与应急技术装备展览，邀请参展企业200余家，展览面积约40000平方米；举办了特种机器人（安全应急类）和2019应急救援人员个体防护专题研讨会，以及危险化学品安全管理、矿山安全、安全应急技术装备等6个专题论坛，广泛交流业内最新技术成果和发展理念。开幕式上，《中国安全产业发展白皮书（2019年）》《中国煤炭行业技术装备成果》正式发布。博览会由工业和信息化部、应急管理部、省政府共同指导，省工信厅、省应急管理厅、徐州市政府联合主办。</span></p><p><br/></p>`;
    }
    if (index === 3) {
      this.dataInfo = `<p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 10px 0px; color: rgb(51, 51, 51); font-size: 17px; line-height: 1.75em; font-family: 微软雅黑; white-space: normal; text-indent: 2em; text-align: justify;"><span style="box-sizing: border-box; font-size: 16px; color: rgb(255, 255, 255);">10月7日，省安委会办公室下发通知，要求各地、各有关部门和单位坚决防止思想懈怠、工作松劲、事故反弹，防范遏制各类生产安全事故。<br/></span></p><p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 10px 0px; color: rgb(51, 51, 51); font-size: 17px; line-height: 1.75em; font-family: 微软雅黑; white-space: normal; text-indent: 2em; text-align: justify;"><span style="box-sizing: border-box; font-size: 16px; color: rgb(255, 255, 255);">省安委办强调，要强化安全责任落实，切实把思想和行动统一到习近平总书记关于安全生产的重要论述上来，统一到党中央、国务院关于安全生产的指示精神上来，统一到省委、省政府部署要求上来，克服盲目乐观思想、麻痹侥幸心理、消极厌战情绪，防止思想松懈、工作松劲、监管松弛，扛起抓安全除隐患保平安的政治责任。要严格管控复产复工，加强对企业复工复产的监管指导，持续开展安全隐患大排查大整治，狠抓问题隐患整改落实。要加大监管执法力度，通过强化事前执法、严格“四个一律”措施、公开曝光非法违法典型案例、实施联合惩戒和“黑名单”管理等手段，提高企业违法成本，倒逼企业落实主体责任。要突出当前防范重点，针对四季度特点，扎实推进道路交通、建筑施工、危险化学品、消防等重点行业领域安全专项整治，排查治理重大风险隐患。要切实加强应急值守，严格执行领导干部到岗带班和24小时值班值守制度，及时准确上报信息，强化应急救援准备，有力有效处置突发灾害事故。</span></p><p><br/></p>`;
    }
    if (index === 4) {
      this.dataInfo = `<p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 10px 0px; color: rgb(51, 51, 51); font-size: 17px; line-height: 1.75em; font-family: 微软雅黑; white-space: normal; text-indent: 2em;"><span style="box-sizing: border-box; font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(255, 255, 255);">7月25日上午，省应急厅陈忠伟厅长带领监管执法人员、化工安全专家直插企业、直奔现场，明查暗访远东联石化（扬州）有限公司安全生产工作，现场检查企业中控室领导带班、交接班记录，环氧乙烷储罐、空分装置安全设施运行以及危废仓库安全管理制度落实等情况，随机抽查动火作业审批、有限空间辨识管控等工作，听取了企业安全管理信息系统建设及应用情况汇报，要求企业全面落实主体责任，严格执行法律法规、标准规范，加强全链条、全过程、全方位的安全管理，不断提高本质安全水平，实现安全生产。<br/></span></p><p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 10px 0px; color: rgb(51, 51, 51); font-size: 17px; line-height: 1.75em; font-family: 微软雅黑; white-space: normal; text-indent: 2em;"><span style="box-sizing: border-box; font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(255, 255, 255);">下午，在扬州化学工业园区综合应急响应中心观看危化品重大危险源在线监控及预警报警系统演示，听取园区管委会危化品安全生产信息化建设情况汇报后，陈忠伟肯定了园区危化品安全生产信息化建设工作，进一步明确了全省危化品安全生产风险监测预警系统建设的技术路线、工作路线，要求把加快危化品安全风险监测预警系统建设作为当前重点，积极试点，加大统筹，加速推进，围绕危化品储罐区、仓库、生产装置等重大危险源以及关键部位等的安全风险，形成从企业、园区、到各级应急管理部门的分级管控和动态监测预警，提升危化品安全监管的信息化、网络化、智能化水平，精准防范、有效化解重大安全风险、遏制重特大事故。</span></p><p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 10px 0px; color: rgb(51, 51, 51); font-size: 17px; line-height: 1.75em; font-family: 微软雅黑; white-space: normal; text-indent: 2em;"><span style="box-sizing: border-box; font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(255, 255, 255);">厅危险化学品安全监管处、科技和信息化处负责同志参加活动。</span></p><p><br/></p>`;
    }
    if (index === 5) {
      this.dataInfo = `<p><span style="box-sizing: border-box; font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(255, 255, 255);">6月30日，全省“安全生产月”活动圆满收官。一个月来，全省各地区、各部门和单位按照国务院安委会办公室和省安委会办公室统一部署，结合“不忘初心、牢记使命”主题教育，紧扣“防风险、除隐患、遏事故”主题，以危险化学品安全为重点，深入基层、面向群众，集中开展了一系列既有声势又有实效的安全宣教活动，进一步树牢了安全发展理念，增强了全社会安全意识和防范能力。据统计，活动期间，共开展“安全生产大讲堂”和公开课8760场次，组织各类应急演练和体验活动1万余场次，“安全生产公众开放日”活动1036场次，组织各类咨询活动、文艺演出以及各类知识竞赛1.2万余场次，发放各类宣传资料800多万份，通过各类举报平台收集反馈线索609条。</span></p>`;
    }
    if (index === 6) {
      this.dataInfo = `<p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 10px 0px; color: rgb(51, 51, 51); font-size: 17px; line-height: 1.75em; font-family: 微软雅黑; white-space: normal; text-align: justify; text-indent: 2em;"><span style="box-sizing: border-box; font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(255, 255, 255);">5月28日，全省救援协调和预案管理工作会议在南京召开，省应急管理厅沈仲一副厅长出席会议并讲话。<br/></span></p><p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 10px 0px; color: rgb(51, 51, 51); font-size: 17px; line-height: 1.75em; font-family: 微软雅黑; white-space: normal; text-align: justify; text-indent: 2em;"><span style="box-sizing: border-box; font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(255, 255, 255);">会议传达学习了应急管理部救援协调和预案管理局2019年重点工作，分析了应急管理工作面临的新形势和新任务，部署安排了全省年度救援协调和预案管理工作。</span></p><p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 10px 0px; color: rgb(51, 51, 51); font-size: 17px; line-height: 1.75em; font-family: 微软雅黑; white-space: normal; text-align: justify; text-indent: 2em;"><span style="box-sizing: border-box; font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(255, 255, 255);">会议强调，各地要充分认识应急管理体制改革的重要意义，统一思想，牢记职责使命，把握发展机遇，抓好各项工作落实。一是理清工作思路。要提高政治站位，始终把以人民为中心作为根本准则，始终把预防为主作为重要法宝，始终把安全发展作为重中之重，始终把重心下移作为关键举措。二是抓住工作重点。要完善预案管理工作，不断提升现场处置能力，强化应急队伍建设，完善信息报告制度。三是加强能力建设。要立足边组建边完善，强化责任担当，不断加强学习，增强业务本领，勇于开拓创新，积极破解难题。</span></p><p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0px; padding: 10px 0px; color: rgb(51, 51, 51); font-size: 17px; line-height: 1.75em; font-family: 微软雅黑; white-space: normal; text-align: justify; text-indent: 2em;"><span style="box-sizing: border-box; font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(255, 255, 255);">会上，13个设区市应急管理局作了交流发言，各设区市应急管理局分管领导、救援协调和预案管理处主要负责人参加了会议。</span></p><p><br/></p>`;
    }
    this.currentPageNum = this.pageEnum.Detail;
  }


  ngOnInit() {
  }

}
