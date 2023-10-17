import { Component, OnInit } from '@angular/core';
import { BiEchartsConfig } from '@shared/components/bi-echarts/echarts-options';
import { BiApiService } from '@shared/services/bi-api.service';
import { OperationChartsResolverService } from '@shared/services/bi/operation-charts-resolver.service';
import { dateFormat, tableDateFormat } from '@shared/utils/dateFormat';
import * as moment from 'moment';
import { tableHeadKeyMap } from './operation-table-head';

@Component({
  selector: 'im-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.scss'],
})
export class OperationComponent implements OnInit {
  echartsList: BiEchartsConfig[] = [];
  now = new Date();
  tabValue = 'gsl';
  date: any[];
  tabs = [
    {
      name: '出水量',
      value: 'gsl',
    },
    {
      name: '用电量',
      value: 'ydl',
    },
    // {
    //   name: '能耗',
    //   value: 'power',
    // },
  ];
  // 图表配置
  tableConfig = {
    theadList: [{ name: '日期', type: 'date', key: 'dateText' }],
    tableData: [{}],
  };

  // 日期类型，时间，表格或者图形 筛选框
  screenConfig: any;
  serchData = {
    date: ['', ''],
  };
  constructor(
    private biApiService: BiApiService,
    private operationChartsResolverService: OperationChartsResolverService
  ) {
    this.date = [this.now, this.now];
    this.screenConfig = {
      isTable: true,
      date: [],
      dateType: 'day',
      dateTypeList: [
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
    this.serchData = {
      date: [startDate, endDate],
    };
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
    let funName = `operation_${this.tabValue}_${type}`;
    let res = await this.biApiService[funName](this.serchData.date);
    this.setData(res);
  }

  setPower(list: any[], key = 'ri') {
    console.log(key);
    const typeList = [
      '新城水库',
      '沣水水厂',
      '西郊水厂',
      '金岭水厂',
      '东风水厂',
      '张店水厂',
      '沣水水厂',
      '南定水厂',
      '新城净水厂',
      '湖田水厂',
      '石桥配水厂',
    ];
    const all = list.filter((i) => {
      return typeList.includes(i.type);
    });
    let map: any = {};
    all.forEach((item) => {
      if (!map[item.type]) {
        map[item.type] = [];
        map[item.type].push(item);
      } else {
        map[item.type].push(item);
      }
    });
    let allList: any = [];
    typeList.forEach((name) => {
      let list: any[] = Object.values(map[name]);
      allList = allList.concat(list);
    });

    let allMap: any = {};
    allList.forEach((item: any) => {
      if (!allMap[item[key]]) {
        if (item.type == '生产类') {
          item.shengchan = item.ydl ? item.ydl : 0;
        } else if (item.type == '二次供水') {
          item.ergong = item.ydl ? item.ydl : 0;
        } else if (item.type == '增管所') {
          item.zengguansuo = item.ydl ? item.ydl : 0;
        } else if (item.type == '办公用电') {
          item.bangong = item.ydl ? item.ydl : 0;
        }
        allMap[item[key]] = item;
      } else {
        if (item.type == '生产类') {
          allMap[item[key]].shengchan = item.ydl + allMap[item[key]].shengchan;
        } else if (item.type == '二次供水') {
          allMap[item[key]].ergong =
            item.ydl +
            (allMap[item[key]].ergong ? allMap[item[key]].ergong : 0);
        } else if (item.type == '增管所') {
          allMap[item[key]].zengguansuo =
            (allMap[item[key]].zengguansuo
              ? allMap[item[key]].zengguansuo
              : 0) + item.ydl;
          +item.ydl;
        } else if (item.type == '办公用电') {
          allMap[item[key]].bangong =
            item.ydl +
            (allMap[item[key]].bangong ? allMap[item[key]].bangong : 0);
        }
      }
    });
    let newlist = Object.values(allMap) as [];
    newlist.forEach((item: any) => {
      item.all =
        (item.shengchan ? item.shengchan : 0) +
        (item.ergong ? item.ergong : 0) +
        (item.bangong ? item.bangong : 0) +
        (item.zengguansuo ? item.zengguansuo : 0);
      item.shengchan = item.shengchan ? item.shengchan.toFixed(2) : 0;
      item.bangong = item.bangong ? item.bangong.toFixed(2) : 0;
      item.ergong = item.ergong ? item.ergong.toFixed(2) : 0;
      item.zengguansuo = item.zengguansuo ? item.zengguansuo.toFixed(2) : 0;
      item.all = item.all.toFixed(2);
      item.dateText = tableDateFormat(item, this.screenConfig.dateType);
    });
    this.tableConfig.tableData = [...(newlist.reverse() as any[])];
  }

  setData(list: any[]) {
    if (list.length > 0) {
      if (this.tabValue == 'gsl') {
        this.tableConfig.theadList = [...this.setNewHead(list, 'factory')];
        this.tableConfig.tableData = [
          ...this.setNewTabeData(list, 'factory', 'csl'),
        ];
      } else {
        if (this.tabValue == 'ydl') {
          this.tableConfig.theadList = [...this.setNewHead(list, 'factory')];
          this.tableConfig.tableData = [
            ...this.setNewTabeData(list, 'factory', 'ydl'),
          ];
        }
      }

      this.rendererChart(list);
    } else {
      this.tableConfig.tableData = [];
    }
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
    keyList.forEach((item, index) => {
      // const typeList = ['新城水库', '沣水水厂', '西郊水厂', '金岭水厂', '东风水厂', '张店水厂', '沣水水厂', '南定水厂', '新城净水厂', '湖田水厂', '石桥配水厂'];
      if (index === 0) {
        theadList.splice(1, 0, {
          name: '公司',
          key: 'gongsi',
          type: 'double',
        });
        theadList.push({
          name: item,
          key: item,
          type: 'double',
        });
      } else {
        theadList.push({
          name: item,
          key: item,
          type: 'double',
        });
      }
    });

    console.log('keyList', keyList);
    return theadList;
  }

  setNewTabeData(list: any[], key: string, value: string, day = 'vdate') {
    let fbList: any[] = [];
    list.forEach((item: any, index) => {
      if (index == 0) {
        item[item[key]] = item[value];
        fbList.push(item);
      } else {
        let lastItem = fbList[fbList.length - 1];
        if (
          (lastItem.xs == item.xs &&
            item.xs &&
            this.screenConfig.dateType == 'hour') ||
          (lastItem[day] == item[day] &&
            item[day] &&
            this.screenConfig.dateType == 'day') ||
          (lastItem.yue == item.yue &&
            item.yue &&
            this.screenConfig.dateType == 'month') ||
          (lastItem.year_ == item.year_ &&
            item.year_ &&
            this.screenConfig.dateType == 'year')
        ) {
          lastItem[item[key]] =
            (lastItem[item[key]] ? lastItem[item[key]] : 0) + item[value];
        } else {
          item[item[key]] = item[value];
          fbList.push(item);
        }
      }
    });

    fbList.forEach((i) => {
      console.log(i);
      i.gongsi = 0;
      this.tableConfig.theadList.forEach((item) => {
        i.gongsi += i[item.name] ? i[item.name] : 0;
      });
      i.dateText = tableDateFormat(i, this.screenConfig.dateType);
    });
    return fbList;
  }

  async rendererChart(list: any[]) {
    this.echartsList = [];
    const fnName: any = `operation_${this.tabValue}_${this.screenConfig.dateType}`;
    this.echartsList = await this.operationChartsResolverService[fnName](
      this.serchData.date.map((i) => moment(i))
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
