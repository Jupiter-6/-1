import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment.prod';
import {
  BiEchartsConfig,
  getLineOptions,
} from '@shared/components/bi-echarts/echarts-options';
import { BiApiService } from '@shared/services/bi-api.service';
import { SwsChartsResolverService } from '@shared/services/bi/sws-charts-resolver.service';
import { dateFormat, tableDateFormat } from '@shared/utils/dateFormat';
import * as moment from 'moment';
import { tableHeadKeyMap } from './sws-table-head';

@Component({
  selector: 'im-sws',
  templateUrl: './sws.component.html',
  styleUrls: ['./sws.component.scss'],
})
export class SwsComponent implements OnInit {
  echartsList: BiEchartsConfig[] = [];
  zonglanEchartsList: BiEchartsConfig[] = [];
  now = new Date();
  tabValue = 'zl';
  date: any[];
  tabs = [
    {
      name: '总览',
      value: 'zl',
    },
    {
      name: '任务',
      value: 'rw',
    },
    {
      name: '水质',
      value: 'sz',
    },
  ];

  cardList: any[] = [
    {
      name: '泵站数量(个)',
      topData: 0,
      className: 'card-data',
    },
    {
      name: '小区数量(个)',
      topData: 0,
      className: 'card-data-center',
    },
    {
      name: '机组数量(套)',
      topData: 0,
      className: 'card-data-last',
    },
  ];
  cardListTwo: any[] = [
    {
      name: '水箱数量(只)',
      topData: 0,
      className: 'card-data',
    },
    {
      name: '用户表数(户)',
      topData: 0,
      className: 'card-data-center',
    },
    {
      name: '人员数量(个)',
      topData: 0,
      className: 'card-data-last',
    },
  ];
  // 图表配置
  tableConfig = {
    theadList: [
      { name: '日期', type: 'date', key: 'vdate' },
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
    factory: '',
  };
  classNoList: any[];
  pdclassno: any;
  constructor(
    private biApiService: BiApiService,
    private swsChartsResolverService: SwsChartsResolverService
  ) {
    this.date = [this.now, this.now];
    this.classNoList = [];
    this.screenConfig = {
      isTable: true,
      date: [],
      dateType: 'day',
      dateTypeList: [],
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

  async sws_task_day() {
    let res = await this.biApiService.sws_task_day(
      this.serchData.date,
      this.pdclassno
    );
    this.setData(res);
  }
  async sws_task_month() {
    let res = await this.biApiService.sws_task_month(
      this.serchData.date.map(i=>moment(i).format('YYYY-MM-DD')),
      this.pdclassno
    );
    this.setData(res);
  }

  async sws_task_year() {
    let res = await this.biApiService.sws_task_year(
      this.serchData.date.map(i => i+'-01-01'),
      this.pdclassno
    );
    this.setData(res);
  }

  async sws_shuizhi_day() {
    let res = await this.biApiService.sws_shuizhi_day(
      this.serchData.date,
      this.pdclassno
    );
    this.setData(res);
  }
  async sws_shuizhi_month() {
    let res = await this.biApiService.sws_shuizhi_month(
      this.serchData.date,
      this.pdclassno
    );
    this.setData(res);
  }

  async sws_shuizhi_year() {
    let res = await this.biApiService.sws_shuizhi_year(
      this.serchData.date,
      this.pdclassno
    );
    this.setData(res);
  }

  setData(list: any[]) {
    if (list.length > 0) {
      console.log(list);
      list.forEach((item) => {
        item.dateText = tableDateFormat(item, this.screenConfig.dateType);
        if (this.tabValue == 'sz') {
          item.hgl = item.hgl + '%';
        }
      });
      this.tableConfig.tableData = list;
      this.rendererChart(list);
    } else {
      this.tableConfig.tableData = [];
      this.echartsList = [null as any];
    }
  }

  async rendererChart(list: any[]) {
    this.echartsList = [];
    const fnName: any = `sws_${this.tabValue}_${this.screenConfig.dateType}`;
    if (this.swsChartsResolverService[fnName]) { 
      this.echartsList = await this.swsChartsResolverService[fnName](
        this.serchData.date.map((i) => moment(i)),
        this.pdclassno
      );
    }
  }

  async getData(type: string) {
    if (this.tabValue != 'sz') {
      switch (type) {
        case 'day':
          this.sws_task_day();
          break;
        case 'month':
          this.sws_task_month();
          break;
        case 'year':
          this.sws_task_year();
          break;
      }
    } else {
      switch (type) {
        case 'day':
          this.sws_shuizhi_day();
          break;
        case 'month':
          this.sws_shuizhi_month();
          break;
        case 'year':
          this.sws_shuizhi_year();
          break;
      }
    }
  }

  setTableHead(type: string) {
    if (type != 'zl') {
      let dateMap = tableHeadKeyMap[type as keyof typeof tableHeadKeyMap];
      this.tableConfig.theadList =
        dateMap[this.screenConfig.dateType as keyof typeof dateMap];
      console.log(this.tableConfig.theadList);
    }
  }

  async sws_zl_sssj() {
    let sssj = await this.biApiService.sws_zl_sssj();
    if (sssj && sssj[0]) {
      let obj = sssj[0];
      this.cardList[0].topData = Number(obj.bfsl).toFixed(0);
      this.cardList[1].topData = Number(obj.xqsl).toFixed(0);
      this.cardList[2].topData = Number(obj.bjsl).toFixed(0);
      this.cardListTwo[0].topData = Number(obj.sxsl).toFixed(0);
      this.cardListTwo[1].topData = Number(obj.bfhs).toFixed(0);
      this.cardListTwo[2].topData = Number(obj.rysl).toFixed(0);
    }
  }

  async sws_class_query() {
    let res = await this.biApiService.sws_class_query();
    if (res && res.length > 0) {
      res.forEach((item) => {
        item.value = item.pdclassno;
      });
      this.classNoList = res;
      this.screenConfig.classNoList = [...res];
      this.screenConfig.factory = this.classNoList[0].pdclassno;
      this.pdclassno = this.classNoList[0].pdclassno;
    } else {
      this.screenConfig.classNoList = [];
      this.classNoList = [];
    }
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

  ngOnInit(): void {
    this.sws_class_query();
    this.sws_zl_sssj();
    Promise.all([
      this.swsChartsResolverService.sws_zl_bffb(),
      this.swsChartsResolverService.sws_zl_gsms(),
    ]).then(([option1, option2]) => {
      this.zonglanEchartsList = option1.concat(option2);
    });
  }

  factoryToggle(pdclassno: string) {
    this.serchData.factory = pdclassno;
    this.pdclassno = pdclassno;
    this.getData(this.screenConfig.dateType);
  }

  onSelect(tab: any) {
    console.log(tab);
    this.tabValue = tab.value;
    if (this.tabValue == 'rw') {
      this.sws_class_query();
    } else if (this.tabValue == 'sz') {
      this.classNoList = [
        {
          name: '浊度',
          value: 'NTU',
        },
        {
          name: '余氯',
          value: 'YUL',
        },
      ];
      this.pdclassno = this.classNoList[0].value;
      this.screenConfig.factory = this.classNoList[0].value;
    }
    this.screenConfig.classNoList = [...this.classNoList];
    this.getData(this.screenConfig.dateType);
    this.setTableHead(tab.value);
  }
}
