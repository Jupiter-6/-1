import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment.prod';
import {
  BiEchartsConfig,
  getLineOptions,
} from '@shared/components/bi-echarts/echarts-options';
import { Tab } from '@shared/components/tabs/tabs.type';
import { BiApiService } from '@shared/services/bi-api.service';
import { ProductionChartsResolverService } from '@shared/services/bi/production-charts-resolver.service';
import { dateFormat, tableDateFormat } from '@shared/utils/dateFormat';
import * as moment from 'moment';
import { tableHeadKeyMap } from './production-table-head';

@Component({
  selector: 'im-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.scss'],
})
export class ProductionComponent implements OnInit {
  echartsList: BiEchartsConfig[] = [];
  now = new Date();
  tabValue = 'yl';
  date: any[];
  tabs = [
    {
      name: '压力',
      value: 'yl',
    },
    {
      name: '浊度',
      value: 'zd',
    },
    {
      name: '余氯',
      value: 'yul',
    },
    {
      name: 'PH',
      value: 'ph',
    },
  ];
  // 图表配置
  tableConfig = {
    theadList: [
      { name: '日期', type: 'date', key: 'dateText' },
      { name: '最高', type: 'double', key: 'zgccsyl' },
      { name: '最低', type: 'double', key: 'zdccsyl' },
      { name: '平均', type: 'double', key: 'ccsyl' },
    ],
    tableData: [{}],
  };

  // 日期类型，时间，表格或者图形 筛选框
  screenConfig: any;
  serchData = {
    date: ['', ''],
    factory: '西郊水厂',
  };
  constructor(
    private biApiService: BiApiService,
    private productionChartsResolverService: ProductionChartsResolverService
  ) {
    this.date = [this.now, this.now];
    this.screenConfig = {
      isTable: true,
      date: [],
      dateType: 'day',
      dateTypeList: [],
      factory: '西郊水厂',
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
        new Date(moment().subtract(10, 'years').calendar())
      );
      startDate = startDate.substring(0, 4);
      endDate = endDate.substring(0, 4);
    }

    this.serchData = {
      date: [startDate, endDate],
      factory: this.serchData.factory,
    };
    console.log(this.serchData);
    //时间类型切换，查询数据
    this.screenConfig.dateType = dateType;
    this.setTableHead(this.tabValue);
    this.getData(this.screenConfig.dateType);
  }

  // async production_yl_day() {
  //   let res = await this.biApiService.production_yl_day(
  //     this.serchData.date,
  //     this.screenConfig.factory
  //   );
  //   this.setData(res);
  // }
  // async production_yl_month() {
  //   let res = await this.biApiService.production_yl_month(
  //     this.serchData.date,
  //     this.screenConfig.factory
  //   );
  //   this.setData(res);
  // }

  // async production_yl_year() {
  //   let res = await this.biApiService.production_yl_year(
  //     this.serchData.date,
  //     this.screenConfig.factory
  //   );
  //   this.setData(res);
  // }

  setData(list: any[]) {
    if (list.length > 0) {
      console.log(list);
      list.forEach((item) => {
        item.dateText = tableDateFormat(item, this.screenConfig.dateType);
      });
      this.tableConfig.tableData = list;
      this.rendererChart(list);
    } else {
      this.tableConfig.tableData = [];
    }
  }

  async rendererChart(list: any[]) {
    this.echartsList = [];
    const fnName: any = `production_${this.tabValue}_${this.screenConfig.dateType}`;
    this.echartsList = await this.productionChartsResolverService[fnName](
      this.serchData.date.map((i) => moment(i)),
      this.serchData.factory
    );
  }

  async getData(type: string) {
    let funName = `production_${this.tabValue}_${type}`;
    let res = await this.biApiService[funName](
      this.serchData.date,
      this.screenConfig.factory
    );
    this.setData(res);
    // switch (type) {
    //   case 'day':
    //     this.production_yl_day();
    //     break;
    //   case 'month':
    //     this.production_yl_month();
    //     break;
    //   case 'year':
    //     this.production_yl_year();
    //     break;
    // }
  }

  setTableHead(type: string) {
    let dateMap = tableHeadKeyMap[type as keyof typeof tableHeadKeyMap];
    this.tableConfig.theadList =
      dateMap[this.screenConfig.dateType as keyof typeof dateMap];
    console.log(this.tableConfig.theadList);
  }

  ngOnInit(): void {
    //  默认起势时间30天前到今天
    let startDate = dateFormat(
      new Date(moment().subtract(30, 'days').calendar())
    );
    let endDate = dateFormat(this.date[1]);
    this.serchData = {
      date: [startDate, endDate],
      factory: this.serchData.factory,
    };
    this.getData(this.screenConfig.dateType);
  }

  factoryToggle(factory: string) {
    this.serchData.factory = factory;
    this.getData(this.screenConfig.dateType);
  }

  onSelect(tab: any) {
    this.tabValue = tab.value;
    this.getData(this.screenConfig.dateType);
    this.setTableHead(tab.value);
  }
}
