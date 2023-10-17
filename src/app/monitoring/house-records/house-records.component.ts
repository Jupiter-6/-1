import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '@env/environment';
import { format } from 'date-fns';
import { HouseRecordsService } from './house-records.service';
@Component({
  selector: 'im-house-records',
  templateUrl: './house-records.component.html',
  styleUrls: ['./house-records.component.scss']
})
export class HouseRecordsComponent implements OnInit {
  houseid: any;

  /** svg图标 */
  svgSrc = environment.assets_prefix + '/assets/icons/house.svg';

  /** 泵房标签内信息 */
  item: any = {};

  /** 泵房名称 */
  title = '';

  /** 建设年份 */
  estatedate = '';

  /** 户表数量 */
  meters = '';

  key_head: object = {
    code: '泵房编码',
    name: '泵房名称',
    fullname: '泵房全称',
    houseaddr: '泵房位置',
    date: '投运日期',
    status: '运行状态',
    addr: '小区地址',
    company: '物业公司',
    person: '物业联系人',
    meternum: '小区户表数',
    buildingnum: '小区楼栋数',
    info: '分区信息',
  };

  /** 泵区信息 */
  devices: any = [];

  constructor(
    private service: HouseRecordsService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.houseid = this.activatedRoute.snapshot.params.houseid;
    this.houseRead();
  }

  /** 获取泵房信息 */
  async houseRead(): Promise<void> {
    const params = {
      item: { id: this.houseid }
  };
    await this.service.houseRead(params).then((house) => {
      this.item = house;
      this.title = house.name || '';
      this.estatedate = house && house.estatedate ? format(house.estatedate, 'yyyy') : '';
      this.meters = house.meters || '';
    });
    this.queryParea();
  }

  /** 获取泵房下面的泵组列表 */
  async queryParea(): Promise<void> {
    const params = {
      criteria: [
        { name: 'houseid', value1: this.houseid },
        { name: 'enabled', value1: 1 },
        { name: 'pareacls', value1: 0 },
      ]
    };
    await this.service.queryParea(params).then((devices) => {
      this.devices = devices;
    });
  }

}
