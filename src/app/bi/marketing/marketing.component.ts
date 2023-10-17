import { Component, OnInit } from '@angular/core';
import { BiEchartsConfig } from '@shared/components/bi-echarts/echarts-options';
import { BiApiService } from '@shared/services/bi-api.service';
import { MarketingChartsResolverService } from '@shared/services/bi/marketing-charts-resolver.service';
import { dateFormat, tableDateFormat } from '@shared/utils/dateFormat';
import * as moment from 'moment';
import { CardsMap, tableHeadKeyMap } from './marketing-table-head';

@Component({
  selector: 'im-marketing',
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.scss'],
})
export class MarketingComponent implements OnInit {
  echartsList: BiEchartsConfig[] = [];
  now = new Date();
  tabValue = 'hb';
  date: any[];
  tabs = [
    {
      name: '户表',
      value: 'hb',
    },
    {
      name: '水费',
      value: 'sf',
    },
    {
      name: '欠费',
      value: 'qf',
    },
    {
      name: '抄表',
      value: 'cb',
    },
    {
      name: '水量',
      value: 'sl',
    },
  ];
  // 图表配置
  tableConfig = {
    theadList: [
      { name: '时间', type: 'date', key: 'dateText' },
      { name: '新增合计', type: 'double', key: 'xzyhs' },
      { name: '新增居民', type: 'double', key: 'xzshjm' },
      { name: '新增非居民', type: 'double', key: 'xzyfhs' },
    ],
    tableData: [{}],
  };

  // 日期类型，时间，表格或者图形 筛选框
  screenConfig: any;
  serchData = {
    date: ['', ''],
  };
  cardData = {
    date: ['', ''],
  };
  cardList: any;
  constructor(
    private biApiService: BiApiService,
    private marketingChartsResolverService: MarketingChartsResolverService
  ) {
    this.date = [this.now, this.now];
    this.cardList = CardsMap[this.tabValue as keyof typeof CardsMap];
    // this.setTableHead(this.tabValue)
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

  // 表头数据
  async marketing_hb_tags() {
    let res = await this.biApiService.marketing_hb_tags();
    // this.setData(res);
  }

  async getData(type: string) {
    let funName = `marketing_${this.tabValue}_${type}`;
    let res = await this.biApiService[funName](this.serchData.date);
    this.setData(res);
  }

  setData(list: any[]) {
    if (list.length > 0) {
      console.log(list);
      if (this.tabValue == 'hb') {
        if (this.screenConfig.dateType == 'day') {
          this.tableConfig.tableData = [...this.setNewTabeData(list, 'ri')];
        }

        if (this.screenConfig.dateType == 'month') {
          this.tableConfig.tableData = [...this.setNewTabeData(list, 'yue')];
        }

        if (this.screenConfig.dateType == 'year') {
          this.tableConfig.tableData = [...this.setNewTabeData(list, 'year_')];
        }
      } else if (this.tabValue == 'sf') {
        list.forEach((item) => {
          console.log(item)
          if (item.sssf != null && item.yssf != null) {
            if(item.yssf!=0){
              item.hsl = ((item.sssf / item.yssf) * 100).toFixed(2) + '%';
            }else{
              item.hsl = '-';
            }
          }
          item.dateText = tableDateFormat(item, this.screenConfig.dateType);
        });
        this.tableConfig.tableData = [...list];
      } else if (this.tabValue == 'cb') {
        list.forEach((item) => {
          if (item.zccbs != null && item.cbs != null) {
            item.cbl = ((item.zccbs / item.cbs) * 100).toFixed(2) + '%';
          }
            item.dateText = tableDateFormat(item, this.screenConfig.dateType);
        });
        this.tableConfig.tableData = [...list];
      } else if (this.tabValue == 'sl') {
        list.forEach((item) => {
          item.hjsl =
            (item.jmssl ? item.jmssl : 0) + (item.fjmssl ? item.fjmssl : 0);
          item.dateText = tableDateFormat(item, this.screenConfig.dateType);
        });
        this.tableConfig.tableData = [...list];
      } else {
        list.forEach((i) => {
          i.dateText = tableDateFormat(i, this.screenConfig.dateType);
        });
        this.tableConfig.tableData = [...list];
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
    keyList.forEach((item) => {
      theadList.push({
        name: item,
        key: item,
        type: 'string',
      });
    });
    return theadList;
  }

  setNewTabeData(list: any[], key = 'ri') {
    let map: any = {};
    list.forEach((item) => {
      if (!map[item[key]]) {
        if (item.priceno == '居民') {
          item.xzshjm = item.xzyhs | 0;
        }
        map[item[key]] = item;
      } else {
        if (item.priceno == '居民') {
          map[item[key]].xzshjm = item.xzyhs | 0;
        }
        map[item[key]].xzyhs =
          map[item[key]].xzyhs + (item.xzyhs ? item.xzyhs : 0);
      }
    });
    let hbList: any[] = Object.values(map).reverse();
    hbList.forEach((item) => {
      item.dateText = tableDateFormat(item, this.screenConfig.dateType);
      item.xzyfhs = item.xzyhs - item.xzshjm;
    });
    console.log(hbList);
    return hbList;
  }

  async rendererChart(list: any[]) {
    this.echartsList = [];
    const fnName: any = `marketing_${this.tabValue}_${this.screenConfig.dateType}`;
    this.echartsList = await this.marketingChartsResolverService[fnName](
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
    this.getCardData();
  }

  async getCardData() {
    let startDate: string;
    let endDate: string;
    const date = moment().startOf('days').format('YYYY-MM-DD');
    if (date.substring(date.length - 2, date.length) == '01') {
      startDate = moment()
        .month(moment().month() - 1)
        .startOf('month')
        .format('YYYY-MM-DD');
      endDate = moment()
        .month(moment().month() - 1)
        .endOf('month')
        .format('YYYY-MM-DD');
    } else {
      startDate = moment().startOf('month').format('YYYYMM');
      endDate = moment().endOf('month').format('YYYYMM');
    }

    this.cardData = {
      date: [startDate, endDate],
    };
    console.log(this.cardData);
    let funName = `marketing_${this.tabValue}_month`;
    let res = await this.biApiService[funName](this.cardData.date);
    console.log(res);
    this.setCardData(res);
  }

  setCardData(list: any[]) {
    if (this.tabValue == 'hb') {
      const hubiao = list.sort((a, b) => a.yue - b.yue);
      const jumin = hubiao.filter((data) => data.priceno === '居民');
      const feijumin = hubiao.filter((data) => data.priceno !== '居民');
      const allMap: { [key: string]: any } = {};
      jumin.map((i) => {
        allMap.jumin = i.yhs + (allMap.jumin ? allMap.jumin : 0);
      });
      feijumin.map((i) => {
        allMap.feijumin = i.yhs + (allMap.feijumin ? allMap.feijumin : 0);
      });
      allMap.gshj = allMap.jumin + allMap.feijumin;
      CardsMap[this.tabValue as keyof typeof CardsMap][0].topData = allMap.gshj;
      CardsMap[this.tabValue as keyof typeof CardsMap][0].bottomData = '100%';
      CardsMap[this.tabValue as keyof typeof CardsMap][1].topData =
        allMap.jumin;
      CardsMap[this.tabValue as keyof typeof CardsMap][1].bottomData =
        ((allMap.jumin / allMap.gshj) * 100).toFixed(2) + '%';
      CardsMap[this.tabValue as keyof typeof CardsMap][2].topData =
        allMap.feijumin;
      CardsMap[this.tabValue as keyof typeof CardsMap][2].bottomData =
        ((allMap.feijumin / allMap.gshj) * 100).toFixed(2) + '%';
    } else if (this.tabValue == 'sf') {
      let shuifei = list[0];
      CardsMap[this.tabValue as keyof typeof CardsMap][0].topData =
        shuifei.yssf;
      CardsMap[this.tabValue as keyof typeof CardsMap][1].topData =
        shuifei.sssf;
      CardsMap[this.tabValue as keyof typeof CardsMap][2].topData =
        ((shuifei.sssf / shuifei.yssf) * 100).toFixed(2) + '%';
    } else if (this.tabValue == 'qf') {
      CardsMap[this.tabValue as keyof typeof CardsMap][0].topData = list[0].qfje
        ? list[0].qfje
        : 0;
      CardsMap[this.tabValue as keyof typeof CardsMap][1].topData = list[0].qfbs
        ? list[0].qfbs
        : 0;
      CardsMap[this.tabValue as keyof typeof CardsMap][2].topData = list[0].qfsl
        ? list[0].qfsl
        : 0;
    } else if (this.tabValue == 'cb') {
      CardsMap[this.tabValue as keyof typeof CardsMap][0].topData = list[0].cbs
        ? list[0].cbs
        : 0;
      CardsMap[this.tabValue as keyof typeof CardsMap][1].topData = list[0]
        .zccbs
        ? list[0].zccbs
        : 0;
      CardsMap[this.tabValue as keyof typeof CardsMap][2].topData = list[0]
        .zccbs
        ? ((list[0].zccbs / list[0].cbs) * 100).toFixed(2) + '%'
        : '0';
    } else if (this.tabValue == 'sl') {
      let shuiliang = list[0];
      shuiliang.all = shuiliang.jmssl + shuiliang.fjmssl;
      CardsMap[this.tabValue as keyof typeof CardsMap][0].topData =
        shuiliang.all;
      CardsMap[this.tabValue as keyof typeof CardsMap][0].bottomData = '100%';
      CardsMap[this.tabValue as keyof typeof CardsMap][1].topData =
        shuiliang.jmssl;
      CardsMap[this.tabValue as keyof typeof CardsMap][1].bottomData =
        ((shuiliang.jmssl / shuiliang.all) * 100).toFixed(2) + '%';
      CardsMap[this.tabValue as keyof typeof CardsMap][2].topData =
        shuiliang.fjmssl;
      CardsMap[this.tabValue as keyof typeof CardsMap][2].bottomData =
        ((shuiliang.fjmssl / shuiliang.all) * 100).toFixed(2) + '%';
    }
  }

  onSelect(tab: any) {
    console.log(tab);
    this.tabValue = tab.value;
    this.getData(this.screenConfig.dateType);
    this.setTableHead(tab.value);
    this.cardList = CardsMap[this.tabValue as keyof typeof CardsMap];
    this.getCardData();
  }
}
