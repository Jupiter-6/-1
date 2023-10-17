import { Injectable } from '@angular/core';
import { subMonths, subYears, format } from 'date-fns';
import * as moment from 'moment';
import { BiApiService } from '@shared/services/bi-api.service';
import {
  getLineOptions,
  getBarDiagramOptions,
} from '@shared/components/bi-echarts/echarts-options';

@Injectable({
  providedIn: 'root',
})
export class BusinessChartsResolverService {
  [key: string]: any;
  constructor(private apiService: BiApiService) { }

  /** 业务指标-业务-日环比 */
  private yewuTwoDayData(current: any[], sub: any[]) {
    const currentMap: { [key: string]: any } = {};
    const subMap: { [key: string]: any } = {};
    const setAttr = (mapObj: { [key: string]: any }, i: any) => {
      if (!mapObj[i.ri]) {
        mapObj[i.ri] = { date: i.ri, sls: 0, xzgcs: 0, xzjssl: 0 };
      }
      mapObj[i.ri].sls += i.sls;
      mapObj[i.ri].xzgcs += i.xzgcs;
      mapObj[i.ri].xzjssl += i.xzjssl;
    };

    current.map((i) => {
      setAttr(currentMap, i);
    });
    sub.map((i) => {
      setAttr(subMap, i);
    });

    const rateList: any[] = [];
    Object.values(currentMap).map((item) => {
      const subKey = moment(item.date).subtract(1, 'months').format('YYYYMMDD');
      item.date = moment(item.date).format('MM/DD');
      const subitem = subMap[subKey];
      if (subitem) {
        rateList.push({
          datatime: item.date,
          value: Math.round(((item.sls - subitem.sls) / subitem.sls) * 10000) / 100,
        });
      } else {
        rateList.push({
          datatime: item.date,
          value: null,
        });
      }
    });

    const jiesuanRate: any[] = [];
    Object.values(currentMap).map((item) => {
      jiesuanRate.push({
        datatime: item.date,
        value: Math.round((item.xzjssl / item.xzgcs) * 10000) / 100,
      });
    });

    return {
      dayRateList: rateList.sort((a, b) => +a.datatime - +b.datatime),
      jiesuanRate,
      daySummary1: Object.values(currentMap).map((item) => ({
        datatime: item.date,
        value: item.sls,
      })),
      daySummary2: Object.values(currentMap).map((item) => ({
        datatime: item.date,
        value: item.xzgcs,
      })),
      daySummary3: Object.values(currentMap).map((item) => ({
        datatime: item.date,
        value: item.xzjssl,
      })),
    };
  }
  /** 业务指标-业务-月环比 */
  private yewuTwoMonthData(current: any[], sub: any[]) {
    const currentMap: { [key: string]: any } = {};
    const subMap: { [key: string]: any } = {};
    const setAttr = (mapObj: { [key: string]: any }, i: any) => {
      if (!mapObj[i.yue]) {
        mapObj[i.yue] = { date: i.yue, sls: 0, xzgcs: 0, xzjssl: 0 };
      }
      mapObj[i.yue].sls += i.sls;
      mapObj[i.yue].xzgcs += i.xzgcs;
      mapObj[i.yue].xzjssl += i.xzjssl;
    };
    current.map((i) => {
      setAttr(currentMap, i);
    });
    sub.map((i) => {
      setAttr(subMap, i);
    });

    const rateList: any[] = [];
    Object.values(currentMap).map((item) => {
      const subKey = moment(item.date).subtract(1, 'years').format('YYYYMM');
      item.date = moment(item.date).format('YYYY/MM');
      const subitem = subMap[subKey];
      if (subitem) {
        rateList.push({
          datatime: item.date,
          value: Math.round(((item.sls - subitem.sls) / subitem.sls) * 10000) / 100,
        });
      } else {
        rateList.push({
          datatime: item.date,
          value: null,
        });
      }
    });

    const jiesuanRate: any[] = [];
    Object.values(currentMap).map((item) => {
      jiesuanRate.push({
        datatime: item.date,
        value: Math.round((item.xzjssl / item.xzgcs) * 10000) / 100,
      });
    });

    return {
      dayRateList: rateList.sort((a, b) => +a.datatime - +b.datatime),
      jiesuanRate,
      daySummary1: Object.values(currentMap).map((item) => ({
        datatime: item.date,
        value: item.sls,
      })),
      daySummary2: Object.values(currentMap).map((item) => ({
        datatime: item.date,
        value: item.xzgcs,
      })),
      daySummary3: Object.values(currentMap).map((item) => ({
        datatime: item.date,
        value: item.xzjssl,
      })),
    };
  }
  /** 业务指标-业务-年环比 */
  private yewuOneYearData(current: any[]) {
    const currentMap: { [key: string]: any } = {};
    const setAttr = (mapObj: { [key: string]: any }, i: any) => {
      if (!mapObj[i.year_]) {
        mapObj[i.year_] = { date: i.year_, sls: 0, xzgcs: 0, xzjssl: 0 };
      }
      mapObj[i.year_].sls += i.sls;
      mapObj[i.year_].xzgcs += i.xzgcs;
      mapObj[i.year_].xzjssl += i.xzjssl;
    };
    current.map((i) => {
      setAttr(currentMap, i);
    });

    const jiesuanRate: any[] = [];
    Object.values(currentMap).map((item) => {
      jiesuanRate.push({
        datatime: item.date,
        value: Math.round((item.xzjssl / item.xzgcs) * 10000) / 100,
      });
    });

    return {
      jiesuanRate,
      daySummary1: Object.values(currentMap).map((item) => ({
        datatime: item.date,
        value: item.sls,
      })),
      daySummary2: Object.values(currentMap).map((item) => ({
        datatime: item.date,
        value: item.xzgcs,
      })),
      daySummary3: Object.values(currentMap).map((item) => ({
        datatime: item.date,
        value: item.xzjssl,
      })),
    };
  }

  private gongchengData(current: any[]) {
    const currentMap: { [key: string]: any } = {};
    const setAttr = (mapObj: { [key: string]: any }, i: any) => {
      if (!mapObj[i.bzyw]) {
        mapObj[i.bzyw] = { date: i.bzyw, sls: 0, wcs: 0 };
      }
      mapObj[i.bzyw].sls += i.sls;
      mapObj[i.bzyw].wcs += i.wcs;
    };
    current.map((i) => {
      setAttr(currentMap, i);
    });

    const wanchenglv: any[] = [];
    Object.values(currentMap).map((item) => {
      if (item.wcs === item.sls) {
        item.wcs = 1;
        item.sls = 1;
      }
      wanchenglv.push({
        datatime: item.date,
        value: {
          value: Math.round((item.wcs / item.sls) * 10000) / 100,
          wcs: item.wcs
        },
      });
    });
    return {
      wanchenglv: wanchenglv.sort((a, b) => +a.value.value - +b.value.value),
    };
  }

  /** 业务指标-工程-日 */
  public business_gc_day(date: string[]) {
    const dateNow = date.map((i) => format(new Date(i), 'yyyyMMdd'));
    return Promise.all([this.apiService.business_gc_day(dateNow)]).then(
      ([current]) => {
        const data = this.gongchengData(current);
        const echartsList = [
          {
            option: getBarDiagramOptions({
              data: data.wanchenglv,
              unit: '%',
              name: '完成率',
              theme: 'theme3',
              formatter: function (params: any) {
                var result = '<div>' + params[0].name + '</div>';
                params.forEach(function (item: any) {
                  result += item.marker + " 完成数 : <b>" + item.data.wcs + '</b></br>';
                  result += item.marker + " 完成率 : <b>" + item.value + "%</b>";
                });
                return result;
              }
            }),
            name: '业务完成率',
            icon: './assets/icons/company.png',
            height: 400,
          },
        ];
        return echartsList;
      }
    );
  }
  /** 业务指标-工程-月 */
  public business_gc_month(date: string[]) {
    const dateNow = date.map((i) => format(new Date(i), 'yyyyMM'));
    return Promise.all([this.apiService.business_gc_month(dateNow)]).then(
      ([current]) => {
        const data = this.gongchengData(current);
        const echartsList = [
          {
            option: getBarDiagramOptions({
              data: data.wanchenglv,
              unit: '%',
              theme: 'theme3',
              formatter: function (params: any) {
                var result = '<div>' + params[0].name + '</div>';
                params.forEach(function (item: any) {
                  result += item.marker + " 完成数 : <b>" + item.data.wcs + '</b></br>';
                  result += item.marker + " 完成率 : <b>" + item.value + "%</b>";
                });
                return result;
              }
            }),
            name: '业务完成率',
            icon: './assets/icons/company.png',
            height: 400,
          },
        ];
        return echartsList;
      }
    );
  }
  /** 业务指标-工程-年 */
  public business_gc_year(date: string[]) {
    const dateNow = date.map((i) => format(new Date(i), 'yyyy'));
    return Promise.all([this.apiService.business_gc_year(dateNow)]).then(
      ([current]) => {
        const data = this.gongchengData(current);
        const echartsList = [
          {
            option: getBarDiagramOptions({
              data: data.wanchenglv,
              unit: '%',
              theme: 'theme3',
              formatter: function (params: any) {
                var result = '<div>' + params[0].name + '</div>';
                params.forEach(function (item: any) {
                  result += item.marker + " 完成数 : <b>" + item.data.wcs + '</b></br>';
                  result += item.marker + " 完成率 : <b>" + item.value + "%</b>";
                });
                return result;
              }
            }),
            name: '业务完成率',
            icon: './assets/icons/company.png',
            height: 400,
          },
        ];
        return echartsList;
      }
    );
  }

  /** 获取并渲染日图表数据 */
  public business_yw_day(date: string[]) {
    const dateNow = date.map((i) => format(new Date(i), 'yyyyMMdd'));
    const dateSubMonths = date.map((i) =>
      format(subMonths(new Date(i), 1), 'yyyyMMdd')
    );
    return Promise.all([
      this.apiService.business_yw_day(dateNow),
      this.apiService.business_yw_day(dateSubMonths),
    ]).then(([current, sub]) => {
      const data = this.yewuTwoDayData(current, sub);
      const echartsList = [
        {
          option: getLineOptions([
            {
              unit: '个',
              type: 'bar',
              data: data.daySummary1,
              name: '业务数量',
              theme: 'theme2',
            },
            {
              unit: '%',
              type: 'line',
              data: data.dayRateList,
              name: '日环比',
              yAxisIndex: 1,
            },
          ]),
          name: '业务数量',
          icon: './assets/icons/company.png',
        },
        {
          option: getLineOptions([
            {
              unit: '个',
              type: 'bar',
              data: data.daySummary2,
              name: '新装',
              theme: 'theme1',
              legend: true,
            },
            {
              unit: '',
              type: 'bar',
              data: data.daySummary3,
              name: '已结算',
              theme: 'theme2',
            },
            {
              unit: '%',
              type: 'line',
              data: data.jiesuanRate,
              name: '结算率',
              theme: 'theme2',
              yAxisIndex: 1,
            },
          ]),
          name: '新装数量',
          icon: './assets/icons/company.png',
        },
      ];
      return echartsList;
    });
  }
  /** 获取并渲染月图表数据 */
  public business_yw_month(date: string[]) {
    const dateNow = date.map((i) => format(new Date(i), 'yyyyMMdd'));
    const dateSubYears = date.map((i) =>
      format(subYears(new Date(i), 1), 'yyyyMMdd')
    );
    return Promise.all([
      this.apiService.business_yw_month(dateNow),
      this.apiService.business_yw_month(dateSubYears),
    ]).then(([current, sub]) => {
      const data = this.yewuTwoMonthData(current, sub);
      const echartsList = [
        {
          option: getLineOptions([
            {
              unit: '个',
              type: 'bar',
              data: data.daySummary1,
              name: '业务数量',
              theme: 'theme2',
            },
            {
              unit: '%',
              type: 'line',
              data: data.dayRateList,
              name: '月环比',
              yAxisIndex: 1,
            },
          ]),
          name: '业务数量',
          icon: './assets/icons/company.png',
        },
        {
          option: getLineOptions([
            {
              unit: '个',
              type: 'bar',
              data: data.daySummary2,
              name: '新装',
              theme: 'theme1',
              legend: true,
            },
            {
              unit: '',
              type: 'bar',
              data: data.daySummary3,
              name: '已结算',
              theme: 'theme2',
            },
            {
              unit: '%',
              type: 'line',
              data: data.jiesuanRate,
              name: '结算率',
              theme: 'theme2',
              yAxisIndex: 1,
            },
          ]),
          name: '新装数量',
          icon: './assets/icons/company.png',
        },
      ];
      return echartsList;
    });
  }
  /** 获取并渲染年图表数据 */
  public business_yw_year(date: string[]) {
    const dateNow = date.map((i) => format(new Date(i), 'yyyy'));
    return Promise.all([this.apiService.business_yw_year(dateNow)]).then(
      ([current]) => {
        const data = this.yewuOneYearData(current);
        const echartsList = [
          {
            option: getLineOptions([
              {
                unit: '个',
                type: 'bar',
                data: data.daySummary1,
                name: '业务数量',
                theme: 'theme2',
              },
            ]),
            name: '业务数量',
            icon: './assets/icons/company.png',
          },
          {
            option: getLineOptions([
              {
                unit: '个',
                type: 'bar',
                data: data.daySummary2,
                name: '新装',
                theme: 'theme1',
                legend: true,
              },
              {
                unit: '',
                type: 'bar',
                data: data.daySummary3,
                name: '已结算',
                theme: 'theme2',
              },
              {
                unit: '%',
                type: 'line',
                data: data.jiesuanRate,
                name: '结算率',
                theme: 'theme2',
                yAxisIndex: 1,
              },
            ]),
            name: '新装数量',
            icon: './assets/icons/company.png',
          },
        ];
        return echartsList;
      }
    );
  }
}
