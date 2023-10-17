import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MonitoringService } from '../monitoring.service';

@Component({
  selector: 'im-house-runing',
  templateUrl: './house-runing.component.html',
  styleUrls: ['./house-runing.component.scss']
})
export class HouseRuningComponent implements OnInit {

  /** 页面标题 */
  title = '';

  /** 加载中 */
  loading = false;
  /** 本页是否有数据 */
  hasdata = false;
  /** 泵房id */
  houseid = '';
  /** 泵房信息 */
  house: any;
  /** 进水压力 */
  JSGDYL = '';
  /** 进水流量 */
  JSGDSSLL = '';
  /** 供水流量 */
  FMSSLL = '';
  /**  */
  // WTVOL: string;
  /** 水箱液位 */
  SXYW = '';
  /** 水箱容量 */
  curEffcapacity = '';

  /** 泵房信息集合 */
  itemList: any = [];
  constructor(
    public service: MonitoringService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.loading = true;
    this.houseid = this.activatedRoute.snapshot.params.houseid;
    this.queryeffcapacity();
    this.readHouseAndPareas();
  }

  /** 查询水箱容量 */
  queryeffcapacity(): void {
    const params = {
      criteria: [
        { name: 'houseid', value1: this.houseid },
      ]
    };
    this.service.queryeffcapacity(params).then((data) => {
      // console.log(data);
      this.curEffcapacity = data;
    });
  }

  /** 查询该泵房的名称、下属泵区名称以及sensorno信息 */
  readHouseAndPareas(): void {
    const params = {
      item: { id: this.houseid }
    };
    this.service.readHouseAndPareas(params).then((res) => {
      // console.log('res.house = ', res.house);
      this.loading = false;
      this.house = res.house;
      this.service.house = res.house;
      this.JSGDYL = this.house.JSGDYL?.value;
      this.FMSSLL = this.house.FMSSLL?.value;
      this.JSGDSSLL = this.house.JSGDSSLL?.value;
      this.SXYW = this.house.SXYW?.value;
      res.pareaData.forEach((data: any) => {
        data.JSGDYL = this.house.JSGDYL;
      });
      this.title = res.house?.name;
    });
    const params1 = {
      criteria: [
        { name: 'houseid', value1: this.houseid },
        { name: 'showfields', value1: 'JSGDYL,JSGDSSLL,BFYCJT,YLBYL,FMSSLL,YLBSDYL,SXYW,BJYXPL,BJYXZT' },
        { name: 'pareacls', value1: 0 },
        { name: 'running', value1: 0 },
      ]
    };
    this.service.queryList(params1).then(() => {
      this.itemList = [];
      const data = this.service.tableData;
      console.log('data = ', data);
      this.itemList = data;
      this.hasdata = this.itemList.length > 0;
    })
  }
}
