import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InspectionRecordsService } from './inspection-records.service';
import { MonitoringService } from '../monitoring.service';
@Component({
  selector: 'im-inspection-records',
  templateUrl: './inspection-records.component.html',
  styleUrls: ['./inspection-records.component.scss']
})
export class InspectionRecordsComponent implements OnInit {
  houseid: any;
  /** 加载中 */
  loading = false;
  /** 本页是否有数据 */
  hasdata = false;

  /** 选择的数据类型 */
  selectedtype = 1;

  /** 分页 */
  pager = {
    pageNumber: 1,
    pageSize: 50,
  };

  /** 表头 */
  keyTitle: any;

  /** 表头1-全部 */
  title1 = {
    date: '日期',
    type: '类型',
    person: '经办人',
    status: '状态'
  };

  /** 表头2-泵房巡检 */
  title2 = {
    date: '巡检时间',
    person: '巡检人',
  };

  /** 表头3-水质快检 */
  title3 = {
    date: '检测时间',
    ylValue: '余氯值',
    zdValue: '浊度值',
    person: '快检人'
  };

  /** 表头4-水质详检 */
  title4 = {
    date: '时间',
    HYL: '耗氧量',
    JLZS: '菌落总数',
    zhuodu: '浊度',
    yulv: '余氯'
  };

  /** 表头5-水箱清洗 */
  title5 = {
    date: '时间',
    person: '清洗人',
  };

  /** 表头6-维护保养 */
  title6 = {
    date: '时间',
    person: '保养人',
  };

  /** 表头7-维修历史 */
  title7 = {
    date: '日期',
    failclass: '故障类型',
    person: '维修人',
    status: '状态'
  };

  /** 表格数据 */
  dataList: [] = [];

  constructor(
    private service: InspectionRecordsService,
    public monitoringService: MonitoringService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.houseid = this.activatedRoute.snapshot.params.houseid;
    this.typeChange(this.selectedtype);
  }

  typeChange(type: number): void {
    this.selectedtype = type;
    this.requestData(this.selectedtype);
  }

  /**
   * 查询表格数据
   * @param type 数据类型
   */
  async requestData(type: number): Promise<void> {
    this.dataList = [];
    this.keyTitle = {};
    this.loading = true;
    let params = {};
    switch (type) {
      case 1:
        this.keyTitle = this.title1;
        params = {
          criteria: [{
            name: 'houseid',
            value1: this.houseid,
          }],
          pager: this.pager,
        };
        await this.service.queryall(params).then((datas) => {
          this.dataList = datas;
        });
        break;
      case 2:
        this.keyTitle = this.title2;
        params = {
          criteria: [
            { name: 'houseid', value1: this.houseid, },
            { name: 'itemno', value1: 'XJ15' }],
          pager: this.pager,
        };
        await this.service.queryBFXJ(params).then((datas) => {
          this.dataList = datas;
        });
        break;
      case 3:
        this.keyTitle = this.title3;
        params = {
          criteria: [
            { name: 'houseid', value1: this.houseid, },
            { name: 'itemno', value1: 'NTU,YUL' }],
          pager: this.pager,
        };
        await this.service.querySZKJ(params).then((datas) => {
          this.dataList = datas;
        });
        break;
      case 4:
        this.keyTitle = this.title4;
        params = {
          criteria: [
            { name: 'houseid', value1: this.houseid, },
            { name: 'pdclassno', value1: 'BDDR' }],
          pager: this.pager,
        };
        await this.service.querySZKJ(params).then((datas) => {
          this.dataList = datas;
        });
        break;
      case 5:
        this.keyTitle = this.title5;
        params = {
          criteria: [
            { name: 'houseid', value1: this.houseid, },
            { name: 'pdclassno', value1: 'sxqx' }],
          pager: this.pager,
        };
        await this.service.querySXQX(params).then((datas) => {
          this.dataList = datas;
        });
        break;
      case 6:
        this.keyTitle = this.title6;
        params = {
          criteria: [
            { name: 'houseid', value1: this.houseid, },
            { name: 'pdclassno', value1: 'WHBY' }],
          pager: this.pager,
        };
        await this.service.querySXQX(params).then((datas) => {
          this.dataList = datas;
        });
        break;
      case 7:
        this.keyTitle = this.title7;
        params = {
          criteria: [
            { name: 'houseid', value1: this.houseid, }],
          pager: this.pager,
        };
        await this.service.queryWXLS(params).then((datas) => {
          this.dataList = datas;
        });
        break;
    }
    this.loading = false;
    this.hasdata = this.dataList.length > 0;
    // console.log(this.dataList);
  }

}
