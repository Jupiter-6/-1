import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'im-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {

  @Input() itemList: any = [];

  /** 表单中的字段 */
  key_head: object = {
    supplyprocess: '供水工艺',
    manufacturer: '成套品牌',
    devicespec: '设备型号',
    controlmode: '控制方式',
    pumpspec: '水泵型号',
    motorspec: '电机型号',
    ratedlift: '额定扬程',
    ratedflow: '额定流量',
    ratedpower: '额定功率',
    steadyflow: '稳流罐规格',
    steadypressure: '气压罐规格',
  };

  constructor() { }

  ngOnInit(): void {

  }

}
