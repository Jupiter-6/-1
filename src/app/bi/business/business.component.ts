import { Component, OnInit } from '@angular/core';
import { BiEchartsConfig } from '@shared/components/bi-echarts/echarts-options';
import { BiApiService } from '@shared/services/bi-api.service';
import { BusinessChartsResolverService } from '@shared/services/bi/business-charts-resolver.service';
import { dateFormat, tableDateFormat } from '@shared/utils/dateFormat';
import * as moment from 'moment';
import { tableHeadKeyMap } from './business-table-head';

@Component({
  selector: 'im-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss'],
})
export class BusinessComponent implements OnInit {
  echartsList: BiEchartsConfig[] = [];
  now = new Date();
  tabValue = 'yw';
  date: any[];
  tabs = [
    {
      name: '业务',
      value: 'yw',
    },
    {
      name: '工程',
      value: 'gc',
    },
  ];
  // 图表配置
  tableConfig = {
    theadList: [
      { name: '日期', type: 'date', key: 'dateText' },
      { name: '工程数', type: 'string', key: 'sls' },
      { name: '新装工程', type: 'string', key: 'xzgcs' },
      { name: '新装已结算工程', type: 'string', key: 'xzjssl' },
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
    private businessChartsResolverService: BusinessChartsResolverService
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

  formatSearchData(dateType: string) {
    let endDate = dateFormat(this.now);
    let startDate;
    if (dateType == 'day') {
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
    this.getData(this.screenConfig.dateType);
  }

  dateTypeChange(dateType: string) {
    this.screenConfig.dateType = dateType;
    this.formatSearchData(dateType);
    this.setTableHead(this.tabValue);
  }

  async business_yw_day() {
    let res = await this.biApiService.business_yw_day(this.serchData.date);
    this.setData(res);
  }
  async business_yw_month() {
    let res = await this.biApiService.business_yw_month(this.serchData.date);
    this.setData(res);
  }

  async business_yw_year() {
    let res = await this.biApiService.business_yw_year(this.serchData.date);
    this.setData(res);
  }

  async business_gc_day() {
    let res = await this.biApiService.business_gc_day(this.serchData.date);
    this.setData(res);
  }
  async business_gc_month() {
    let res = await this.biApiService.business_gc_month(this.serchData.date);
    this.setData(res);
  }

  async business_gc_year() {
    let res = await this.biApiService.business_gc_year(this.serchData.date);
    this.setData(res);
  }

  async getData(type: string) {
    let funName = 'this.business_' + this.tabValue + '_' + type;
    console.log(funName);
    eval(funName).call(this);
  }

  setData(list: any[]) {
    if (list.length > 0) {
      if (this.tabValue == 'yw') {
        this.tableConfig.tableData = [
          ...this.setNewTabeData(list, 'stationtype', 'ydl', 'ri'),
        ];
      } else {
        list.forEach((item) => {
          item.dateText = tableDateFormat(item, this.screenConfig.dateType);
        });
        this.tableConfig.tableData = list;
      }
      this.rendererChart(list);
    } else {
      this.tableConfig.tableData = [];
    }
  }

  setNewTabeData(list: any[], key: string, value: string, day = 'vdate') {
    let newList: any[] = [];
    list.forEach((item: any, index) => {
      if (index == 0) {
        newList.push(item);
      } else {
        let lastItem = newList[newList.length - 1];
        if (
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
          lastItem['sls'] = lastItem['sls'] + item.sls;
          lastItem['xzgcs'] = lastItem['xzgcs'] + item.xzgcs;
          lastItem['xzjssl'] = lastItem['xzjssl'] + item.xzjssl;
          // (lastItem[item[key]] ? lastItem[item[key]] : 0) + item[value];
        } else {
          newList.push(item);
        }
      }
    });
    newList.forEach((i) => {
      i.dateText = tableDateFormat(i, this.screenConfig.dateType);
    });
    return newList;
  }

  async rendererChart(list: any[]) {
    this.echartsList = [];
    const fnName: any = `business_${this.tabValue}_${this.screenConfig.dateType}`;
    const data = await this.businessChartsResolverService[fnName](
      this.serchData.date.map((i) => moment(i))
    );
    this.echartsList = data;
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
