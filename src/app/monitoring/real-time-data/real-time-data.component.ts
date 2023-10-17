import { Component, Input, OnInit } from '@angular/core';
import { RealTimeDataService } from './real-time-data.service';
import { EChartsCoreOption, EChartsOption } from 'echarts';
import { format } from 'date-fns';
import { MonitoringService } from '../monitoring.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'im-real-time-data',
  templateUrl: './real-time-data.component.html',
  styleUrls: ['./real-time-data.component.scss']
})
export class RealTimeDataComponent implements OnInit {

  house: any;

  itemList: any;

  /** 泵房id */
  houseid = '';
  today = format(new Date(), 'yyyy-MM-dd');

  /** 加载中 */
  loading = false;
  /** 本页是否有数据 */
  hasdata = false;

  options: any = [];

  /** 类型下拉数据 */
  typeOption = [
    { value: '压力', lable: '压力' },
    { value: '液位', lable: '液位' },
    { value: '频率', lable: '频率' },
    { value: '流量', lable: '流量' },
    { value: '水质', lable: '水质' },
  ];

  /** 选中的类型 */
  selectedType = '压力';

  constructor(
    private service: RealTimeDataService,
    public monitoringService: MonitoringService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.houseid = this.activatedRoute.snapshot.params.houseid;
    this.readHouseAndPareas();
  }
  /** 查询该泵房的名称、下属泵区名称以及sensorno信息 */
  readHouseAndPareas(): void {
    const params = {
      item: { id: this.houseid }
    };
    this.monitoringService.readHouseAndPareas(params).then((res) => {
      this.loading = false;
      this.house = res.house;
      // console.log(res);
      this.itemList = res.pareaData;
      this.typeChange();
    });
  }
  /** 数据类型改变事件 */
  async typeChange(): Promise<void> {
    setTimeout(() => {
      this.loading = true;
      this.options = [];
      console.log(this.selectedType);
      this.service.queryenabled(this.selectedType, this.house, this.itemList).then((datas) => {
        this.loading = false;
        this.hasdata = datas?.length > 0;
        if (this.hasdata) {
          // 查询表格数据
          const pareaparam = {
            criteria: [
              { name: 'houseid', value1: this.houseid },
              { name: 'pareacls', value1: 0 },
              { name: 'showfields', value1: 'YLBYL,YLBOFFSET,YLBSDYL' },
            ]
          };
          const houseparam = {
            criteria: [
              { name: 'houseid', value1: this.houseid },
              { name: 'supplyprocess', value1: '1,2,3,4' },
              { name: 'showfields', value1: 'JSGDYL' },
            ]
          };
          Promise.all([
            this.service.queryHouseLastvalues(houseparam),
            this.service.queryPareaLastvalues(pareaparam)
          ]).then(([houseItems, pareaItems]) => {
            datas.forEach((data: any) => {
              const option = this.echartOption(data);
              let item = null;
              if (data.pareano) {
                item = pareaItems.find((i: any) => i.pareano === data.pareano);
              } else {
                item = houseItems.length ? houseItems[0] : null;
              }
              option.lastvalueItem = item;
              // 计算最大偏移量
              option.lastvalueItem = this.getoffset(option.lastvalueItem);
              this.options.push(option);
            });
            console.log(this.options)
          });
        }
      });
    }, 10);
  }

  /** 计算最大偏移量 */
  getoffset(item: any): any {
    let max = 0;
    let min = 0;
    const sd = item.YLBSDYL?.valueItem?.lastvalue;
    if (item.YLBYL?.valueItem?.maxvalue) {
      max = Math.abs(item.YLBYL?.valueItem?.maxvalue - sd);
    }
    if (item.YLBYL?.valueItem?.minvalue) {
      min = Math.abs(item.YLBYL?.valueItem?.minvalue - sd);
    }
    const value = Math.max(max, min);
    item.offset = value;
    return item;
  }

  echartOption(item: any): any {
    const option = {
      title: { text: item.title, textStyle: { color: '#212121', fontSize: '16' } },
      grid: { left: 40, bottom: 40 },
      tooltip: {
        trigger: 'axis',
        renderMode: 'richText',
        axisPointer: { type: 'line', snap: true }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        splitLine: { show: false }, // 去除网格线
        axisLine: { lineStyle: { color: '#BDBDBD' } },
        splitNumber: 3,
      },
      yAxis: {
        name: item.yName,
        nameTextStyle: { color: '#BDBDBD' },
        axisLine: { show: false, lineStyle: { color: '#BDBDBD' } },
        axisLabel: { color: '#BDBDBD' },
        splitLine: { lineStyle: { color: '#BDBDBD', type: 'dotted' } },
      },
      series: [
        {
          data: item.yData,
          type: 'line',
          showSymbol: false,
          lineStyle: { color: '#4E56EE', width: 0.5 },
          itemStyle: { color: 'blue' },
          areaStyle: { color: '#4E56EE', opacity: 0.1 }
        },
      ]
    };
    return option;
  }

  getVisiable(option: any, str: string) {
    const bool = option.title.text.includes(str);
    return bool;
  }

}
