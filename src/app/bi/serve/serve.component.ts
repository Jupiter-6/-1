import { Component, OnInit } from '@angular/core';
import { BiEchartsConfig } from '@shared/components/bi-echarts/echarts-options';
import { BiApiService } from '@shared/services/bi-api.service';
import { ServeChartsResolverService } from '@shared/services/bi/serve-charts-resolver.service';
import { dateFormat, tableDateFormat } from '@shared/utils/dateFormat';
import * as moment from 'moment';
import { tableHeadKeyMap } from './serve-table-head';

@Component({
  selector: 'im-serve',
  templateUrl: './serve.component.html',
  styleUrls: ['./serve.component.scss'],
})
export class ServeComponent implements OnInit {
  echartsList: BiEchartsConfig[] = [];
  now = new Date();
  tabValue = 'hw';
  date: any[];
  tabs = [
    {
      name: '话务',
      value: 'hw',
    },
    {
      name: '工单',
      value: 'gd',
    },
    {
      name: '服务',
      value: 'fw',
    },
    {
      name: '分布',
      value: 'fb',
    },
    {
      name: '类别',
      value: 'lb',
    },
  ];
  // 图表配置
  tableConfig = {
    theadList: [
      { name: '时间', type: 'date', key: 'dateText' },
      { name: '话务量', type: 'string', key: 'rxhwl' },
      { name: '拨入数', type: 'string', key: 'rxbrs' },
      { name: '拨出数', type: 'string', key: 'hfbcs' },
      { name: '丢失数', type: 'double', key: 'rxdss' },
    ],
    tableData: [{}],
  };

  // 日期类型，时间，表格或者图形 筛选框
  screenConfig: any;
  serchData = {
    date: ['', ''],
  };
  constructor(
    private biApiService: BiApiService,
    private serveChartsResolverService: ServeChartsResolverService
  ) {
    this.date = [this.now, this.now];
    this.screenConfig = {
      isTable: true,
      date: [],
      dateType: 'day',
      dateTypeList: [
        {
          name: '小时',
          value: 'hour',
        },
        {
          name: '日报',
          value: 'day',
        },
        {
          name: '月报',
          value: 'month',
        },
        {
          name: '年报',
          value: 'year',
        },
      ],
      factory: '',
    };
  }

  tableToggle(isTable: boolean) {
    this.screenConfig.isTable = isTable;
  }

  dateChange(date: any) {
    // 时间切换，去查询数据
    this.date = date;
    let startDate;
    let endDate = '';
    if (this.screenConfig.dateType == 'hour') {
      startDate = dateFormat(new Date(new Date(date[0]).getTime())) + '00';
      endDate = dateFormat(new Date(new Date(date[1]).getTime())) + '23';
    } else if (this.screenConfig.dateType == 'month') {
      startDate = dateFormat(this.date[0]).substring(0, 6);
      endDate = dateFormat(this.date[1]).substring(0, 6);
    } else if (this.screenConfig.dateType == 'year') {
      startDate = dateFormat(this.date[0]).substring(0, 4);
      endDate = dateFormat(this.date[1]).substring(0, 4);
    } else {
      startDate = dateFormat(this.date[0]);
      endDate = dateFormat(this.date[1]);
    }
    this.serchData.date = [startDate, endDate];
    this.getData(this.screenConfig.dateType);
  }

  dateTypeChange(dateType: string) {
    this.screenConfig.dateType = dateType;
    let endDate = dateFormat(this.now);
    let startDate;
    if (dateType == 'hour') {
      startDate =
        dateFormat(new Date(new Date().getTime() - 24 * 60 * 60 * 1000)) + '00';
      endDate += '23';
    } else if (dateType == 'day') {
      startDate = dateFormat(
        new Date(moment().subtract(30, 'days').calendar())
      );
    } else if (dateType == 'month') {
      startDate = dateFormat(
        new Date(moment().subtract(12, 'months').calendar())
      );
      startDate = startDate.substring(0, 6);
      endDate = endDate.substring(0, 6);
    } else if (dateType == 'year') {
      startDate = dateFormat(
        new Date(moment().subtract(5, 'years').calendar())
      );
      startDate = startDate.substring(0, 4);
      endDate = endDate.substring(0, 4);
    }

    this.serchData = {
      date: [startDate, endDate],
    };
    console.log(this.serchData);
    //时间类型切换，查询数据
    this.screenConfig.dateType = dateType;
    this.setTableHead(this.tabValue);
    this.getData(this.screenConfig.dateType);
  }
  async getData(type: string) {
    let funName = `serve_${this.tabValue}_${type}`;
    let res = await this.biApiService[funName](this.serchData.date);
    this.setData(res);
  }

  setGdList(list: any, key = 'ri') {
    let map: any = {};
    list.forEach((item: any) => {
      item.dateText = tableDateFormat(item, this.screenConfig.dateType);
      if (!map[item[key]]) {
        map[item[key]] = item;
      } else {
        map[item[key]].gdsl += item.gdsl | 0;
      }
    });
    let newList = Object.values(map).reverse();
    console.log(newList);
    return newList;
  }

  setData(list: any[]) {
    if (list.length > 0) {
      if (this.tabValue == 'gd') {
        if (this.screenConfig.dateType == 'day') {
          this.tableConfig.tableData = [...(this.setGdList(list, 'ri') as [])];
        } else if (this.screenConfig.dateType == 'month') {
          this.tableConfig.tableData = [...(this.setGdList(list, 'yue') as [])];
        } else if (this.screenConfig.dateType == 'year') {
          this.tableConfig.tableData = [
            ...(this.setGdList(list, 'year_') as []),
          ];
        }
      } else if (this.tabValue == 'fb') {
        // 数据过来，表头从新过滤;
        this.tableConfig.theadList = [...this.setNewHead(list, 'qy')];
        this.tableConfig.tableData = [
          ...this.setNewTabeData(list, 'qy', 'rxsl'),
        ]; //换成数据的key 是rxsl
      } else if (this.tabValue == 'lb') {
        console.log(this.tableConfig.theadList);
        this.tableConfig.theadList = [...this.setNewHead(list, 'gdzl')];
        this.tableConfig.tableData = [
          ...this.setNewTabeData(list, 'gdzl', 'gdsl'),
        ];
      } else if (this.tabValue == 'fw') {
        list.forEach((item) => {
          // 服务水平= fwzs/( rxjts+ hfjts)*100%, fwzs为空或者为0的服务水平默认为100%
          // 单均话务时长= hwsc/ hwl
          console.log(item.hwsc, item.rxhwl);
          if (this.screenConfig.dateType == 'hour') {
            item.hwscText = Math.round(
              (item.hwsc ? item.hwsc : 0) / (item.hwl ? item.hwl : 0)
            );
          } else {
            item.hwscText = Math.round(
              (item.hwsc ? item.hwsc : 0) / (item.rxhwl ? item.rxhwl : 0)
            );
          }

          item.fwzs = ((item.fwzs / item.rxjts) * 100).toFixed(2) + '%';
          item.dateText = tableDateFormat(item, this.screenConfig.dateType);
        });
        this.tableConfig.tableData = [...list];
      } else {
        list.forEach((item) => {
          item.dateText = tableDateFormat(item, this.screenConfig.dateType);
        });
        this.tableConfig.tableData = [...list];
      }
    } else {
      this.tableConfig.tableData = [];
    }
    this.rendererChart(list);
  }

  setNewHead(list: any[], key: string) {
    let theadList = this.tableConfig.theadList.slice(0, 1);
    let obj: any = {};
    list.forEach((item: any, index) => {
      if (!obj[item[key]]) {
        obj[item[key]]++;
      }
    });
    let keyList = Object.keys(obj);
    keyList.forEach((item) => {
      theadList.push({
        name: item,
        key: item,
        type: 'string',
      });
    });
    return theadList;
  }

  setNewTabeData(list: any[], key: string, value: string) {
    let fbList: any[] = [];
    list.forEach((item: any, index) => {
      item.dateText = tableDateFormat(item, this.screenConfig.dateType);
      if (index == 0) {
        item[item[key]] = item[value];
        fbList.push(item);
      } else {
        let lastItem = fbList[fbList.length - 1];
        if (
          (lastItem.xs == item.xs &&
            item.xs &&
            this.screenConfig.dateType == 'hour') ||
          (lastItem.ri == item.ri &&
            item.ri &&
            this.screenConfig.dateType == 'day') ||
          (lastItem.yue == item.yue &&
            item.yue &&
            this.screenConfig.dateType == 'month') ||
          (lastItem.year_ == item.year_ &&
            item.year_ &&
            this.screenConfig.dateType == 'year')
        ) {
          lastItem[item[key]] = item[value];
        } else {
          item[item[key]] = item[value];
          //   item[item.qy] = item.rxsl;
          fbList.push(item);
        }
      }
    });
    return fbList;
  }

  async rendererChart(list: any[]) {
    this.echartsList = [];
    const fnName: any = `serve_${this.tabValue}_${this.screenConfig.dateType}`;
    this.echartsList = await this.serveChartsResolverService[fnName](
      this.serchData.date.map((i) => {
        if (this.screenConfig.dateType === 'hour') {
          return moment(i.substring(0, 8) + ' ' + i.substring(8, 10));
        } else {
          return moment(i);
        }
      })
    );
  }

  setTableHead(type: string) {
    let dateMap = tableHeadKeyMap[type as keyof typeof tableHeadKeyMap];
    this.tableConfig.theadList =
      dateMap[this.screenConfig.dateType as keyof typeof dateMap];
  }

  ngOnInit(): void {
    //  默认起势时间30天前到今天
    let startDate = dateFormat(
      new Date(moment().subtract(30, 'days').calendar())
    );
    let endDate = dateFormat(this.date[1]);
    this.serchData = {
      date: [startDate, endDate],
    };
    this.getData(this.screenConfig.dateType);
  }

  onSelect(tab: any) {
    console.log(tab);
    this.tabValue = tab.value;
    this.getData(this.screenConfig.dateType);
    this.setTableHead(tab.value);
  }
}
