import { Injectable } from '@angular/core';
import { subDays, subMonths, subYears, format } from 'date-fns';
import * as moment from 'moment';
import { BiApiService } from '@shared/services/bi-api.service';
import {
  getLineOptions,
  getBarDiagramOptions,
  getRadarOptions,
} from '@shared/components/bi-echarts/echarts-options';

@Injectable({
  providedIn: 'root',
})
export class SwsChartsResolverService {
  [key: string]: any;
  constructor(private apiService: BiApiService) { }
  /** 泵房分布 */
  sws_zl_bffb() {
    return Promise.all([this.apiService.sws_zl_bffb()]).then(([current]) => {
      const data = current
        .map((i) => ({ value: i.value, datatime: i.name }))
        .sort((a, b) => a.value - b.value);
      const echartsList = [
        {
          option: getRadarOptions({ data, name: '泵房分布', shape: 'circle' }),
          name: '泵房分布',
          icon: './assets/icons/company.png',
          height: 220,
        },
      ];
      return echartsList;
    });
  }
  /** 供水模式 */
  sws_zl_gsms() {
    return Promise.all([this.apiService.sws_zl_gsms()]).then(([current]) => {
      const data = current
        .map((i) => ({ value: i.value, datatime: i.name }))
        .sort((a, b) => a.value - b.value);
      const echartsList = [
        {
          option: getBarDiagramOptions({ data, unit: '个', theme: 'theme2' }),
          name: '供水模式',
          icon: './assets/icons/company.png',
          height: data.length * 34 + 24,
        },
      ];
      return echartsList;
    });
  }
  sws_sz_day(date: string[], itemno: string) {
    const dateNow = date.map((i) => format(new Date(i), 'yyyyMMdd'));
    return Promise.all([this.apiService.sws_shuizhi_day(dateNow, itemno)]).then(
      ([current]) => {
        const data = current.sort((a, b) => a.ri - b.ri);
        data.map((item) => {
          item.ri = moment(item.ri).format('MM/DD');
        });
        const echartsList = [
          {
            option: getLineOptions([
              {
                unit: itemno === 'NTU' && 'NTU' || 'mg/L',
                type: 'line',
                data: data.map((i) => ({ datatime: i.ri, value: i.max_value })),
                name: '最大值',
                theme: 'theme1',
              },
              {
                unit: '',
                type: 'line',
                data: data.map((i) => ({ datatime: i.ri, value: i.avgvalue })),
                name: '平均值',
                theme: 'theme2',
              },
              {
                unit: '',
                type: 'line',
                data: data.map((i) => ({ datatime: i.ri, value: i.min_value })),
                name: '最小值',
                theme: 'theme3',
              },
            ]),
            name: '水质',
            icon: './assets/icons/company.png',
          },
        ];
        return echartsList;
      }
    );
  }
  sws_sz_month(date: string[], itemno: string) {
    const dateNow = date.map((i) => format(new Date(i), 'yyyyMM'));
    return Promise.all([
      this.apiService.sws_shuizhi_month(dateNow, itemno),
    ]).then(([current]) => {
      const data = current.sort((a, b) => a.yue - b.yue);
      data.map((item) => {
        item.yue = moment(item.yue).format('YYYY/MM');
      });
      const echartsList = [
        {
          option: getLineOptions([
            {
              unit: itemno === 'NTU' && 'NTU' || 'mg/L',
              type: 'line',
              data: data.map((i) => ({ datatime: i.yue, value: i.max_value })),
              name: '最大值',
              theme: 'theme1',
            },
            {
              unit: '',
              type: 'line',
              data: data.map((i) => ({ datatime: i.yue, value: i.avgvalue })),
              name: '平均值',
              theme: 'theme2',
            },
            {
              unit: '',
              type: 'line',
              data: data.map((i) => ({ datatime: i.yue, value: i.min_value })),
              name: '最小值',
              theme: 'theme3',
            },
          ]),
          name: '水质',
          icon: './assets/icons/company.png',
        },
      ];
      return echartsList;
    });
  }
  sws_sz_year(date: string[], itemno: string) {
    const dateNow = date.map((i) => format(new Date(i), 'yyyy'));
    return Promise.all([
      this.apiService.sws_shuizhi_year(dateNow, itemno),
    ]).then(([current]) => {
      const data = current.sort((a, b) => a.year_ - b.year_);
      const echartsList = [
        {
          option: getLineOptions([
            {
              unit: itemno === 'NTU' && 'NTU' || 'mg/L',
              type: 'line',
              data: data.map((i) => ({
                datatime: i.year_,
                value: i.max_value,
              })),
              name: '最大值',
              theme: 'theme1',
            },
            {
              unit: '',
              type: 'line',
              data: data.map((i) => ({ datatime: i.year_, value: i.avgvalue })),
              name: '平均值',
              theme: 'theme2',
            },
            {
              unit: '',
              type: 'line',
              data: data.map((i) => ({
                datatime: i.year_,
                value: i.min_value,
              })),
              name: '最小值',
              theme: 'theme3',
            },
          ]),
          name: '水质',
          icon: './assets/icons/company.png',
        },
      ];
      return echartsList;
    });
  }

  sws_rw_day(date: string[], pdclassno: string) {
    const dateNow = date.map((i) => format(new Date(i), 'yyyyMM'));
    return Promise.all([
      this.apiService.sws_task_week(dateNow, pdclassno),
    ]).then(([current]) => {
      const data = current;
      const echartsList = [
        {
          option: getLineOptions([
            {
              unit: '个',
              type: 'bar',
              data: data.map((i) => ({
                datatime: `第${i.date}周`,
                value: i.plan,
              })),
              name: '计划数',
              theme: 'theme1',
            },
            {
              unit: '',
              type: 'bar',
              data: data.map((i) => ({
                datatime: `第${i.date}周`,
                value: i.complete,
              })),
              name: '完成数',
              theme: 'theme2',
            },
          ]),
          name: '泵房',
          icon: './assets/icons/company.png',
        },
        {
          option: getLineOptions([
            {
              unit: '个',
              type: 'bar',
              data: data.map((i) => ({
                datatime: `第${i.date}周`,
                value: i.plan,
              })),
              name: '计划数',
              theme: 'theme1',
            },
            {
              unit: '',
              type: 'bar',
              data: data.map((i) => ({
                datatime: `第${i.date}周`,
                value: i.complete,
              })),
              name: '完成数',
              theme: 'theme2',
            },
          ]),
          name: '项目',
          icon: './assets/icons/company.png',
        },
      ];
      return echartsList;
    });
  }
  sws_rw_month(date: string[], pdclassno: string) {
    const dateNow = date.map((i) => format(new Date(i), 'yyyyMMdd'));
    return Promise.all([
      this.apiService.sws_task_month(dateNow, pdclassno),
    ]).then(([current]) => {
      const data = current;
      data.map((item) => {
        item.date = moment(item.date).format('YYYY/MM');
      });
      const echartsList = [
        {
          option: getLineOptions([
            {
              unit: '个',
              type: 'bar',
              data: data.map((i) => ({ datatime: i.date, value: i.houseplan })),
              name: '计划数',
              theme: 'theme2',
            },
            {
              unit: '',
              type: 'bar',
              data: data.map((i) => ({
                datatime: i.date,
                value: i.housecomplete,
              })),
              name: '完成数',
              theme: 'theme1',
            },
          ]),
          name: '泵房',
          icon: './assets/icons/company.png',
        },
        {
          option: getLineOptions([
            {
              unit: '个',
              type: 'bar',
              data: data.map((i) => ({ datatime: i.date, value: i.itemplan })),
              name: '计划数',
              theme: 'theme2',
            },
            {
              unit: '',
              type: 'bar',
              data: data.map((i) => ({
                datatime: i.date,
                value: i.itemcomplete,
              })),
              name: '完成数',
              theme: 'theme1',
            },
          ]),
          name: '项目',
          icon: './assets/icons/company.png',
        },
      ];
      return echartsList;
    });
  }
  sws_rw_year(date: string[], pdclassno: string) {
    const dateNow = date.map((i) => format(new Date(i), 'yyyyMMdd'));
    return Promise.all([
      this.apiService.sws_task_year(dateNow, pdclassno),
    ]).then(([current]) => {
      const data = current;
      const echartsList = [
        {
          option: getLineOptions([
            {
              unit: '个',
              type: 'bar',
              data: data.map((i) => ({ datatime: i.date, value: i.houseplan })),
              name: '计划数',
              theme: 'theme2',
            },
            {
              unit: '',
              type: 'bar',
              data: data.map((i) => ({
                datatime: i.date,
                value: i.housecomplete,
              })),
              name: '完成数',
              theme: 'theme1',
            },
          ]),
          name: '泵房',
          icon: './assets/icons/company.png',
        },
        {
          option: getLineOptions([
            {
              unit: '个',
              type: 'bar',
              data: data.map((i) => ({ datatime: i.date, value: i.itemplan })),
              name: '计划数',
              theme: 'theme2',
            },
            {
              unit: '',
              type: 'bar',
              data: data.map((i) => ({
                datatime: i.date,
                value: i.itemcomplete,
              })),
              name: '完成数',
              theme: 'theme1',
            },
          ]),
          name: '项目',
          icon: './assets/icons/company.png',
        },
      ];
      return echartsList;
    });
  }
}
