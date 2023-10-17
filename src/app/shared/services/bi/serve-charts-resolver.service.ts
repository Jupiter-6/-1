import { Injectable } from '@angular/core';
import { subDays, subMonths, subYears, format } from 'date-fns';
import * as moment from 'moment';
import { BiApiService } from '@shared/services/bi-api.service';
import { getLineOptions, getBarDiagramOptions, getRadarOptions } from '@shared/components/bi-echarts/echarts-options';

@Injectable({
  providedIn: 'root'
})
export class ServeChartsResolverService {
  [key: string]: any;
  constructor(
    private apiService: BiApiService
  ) { }

  serve_hw_hour(date: string[]) {
    const dateNow = date.map(i => format(new Date(i), 'yyyyMMddHH'));
    const dateSubDays = date.map(i => format(subDays(new Date(i), 1), 'yyyyMMddHH'));
    return Promise.all([
      this.apiService.serve_hw_hour(dateNow),
      this.apiService.serve_hw_hour(dateSubDays)
    ]).then(([current, sub]) => {
      const data = this.serve_hw_hour_paser(current, sub);
      const echartsList = [
        {
          option: getLineOptions([
            {
              unit: '个',
              type: 'bar',
              data: data.daySummary1,
              name: '话务量',
              theme: 'theme2',
            },
            {
              unit: '%',
              type: 'line',
              data: data.dayRateList,
              name: '小时环比',
              yAxisIndex: 1
            },
          ]),
          name: '话务量',
          icon: './assets/icons/company.png',
        },
        {
          option: getLineOptions([
            {
              unit: '个',
              type: 'line',
              data: data.daySummary2,
              name: '拨入量',
              theme: 'theme2',
            },
            {
              unit: '',
              type: 'line',
              data: data.daySummary3,
              name: '拨出量',
            },
          ]),
          name: '拨入拨出',
          icon: './assets/icons/company.png',
        },
        {
          option: getLineOptions([
            {
              unit: '个',
              type: 'bar',
              data: data.daySummary4,
              name: '丢失量',
              theme: 'theme2',
            },
            {
              unit: '%',
              type: 'line',
              data: data.diushilv,
              name: '丢失率',
              yAxisIndex: 1
            },
          ]),
          name: '丢失率',
          icon: './assets/icons/company.png',
        },
      ];
      return echartsList;
    })
  }
  serve_hw_day(date: string[]) {
    const dateNow = date.map(i => format(new Date(i), 'yyyyMMdd'));
    const dateSubMonths = date.map(i => format(subMonths(new Date(i), 1), 'yyyyMMdd'));
    return Promise.all([
      this.apiService.serve_hw_day(dateNow),
      this.apiService.serve_hw_day(dateSubMonths)
    ]).then(([current, sub]) => {
      const data = this.serve_hw_day_paser(current, sub);
      const echartsList = [
        {
          option: getLineOptions([
            {
              unit: '个',
              type: 'bar',
              data: data.daySummary1,
              name: '话务量',
              theme: 'theme2',
            },
            {
              unit: '%',
              type: 'line',
              data: data.dayRateList,
              name: '日环比',
              yAxisIndex: 1
            },
          ]),
          name: '话务量',
          icon: './assets/icons/company.png',
        },
        {
          option: getLineOptions([
            {
              unit: '个',
              type: 'line',
              data: data.daySummary2,
              name: '拨入量',
              theme: 'theme2',
            },
            {
              unit: '',
              type: 'line',
              data: data.daySummary3,
              name: '拨出量',
            },
          ]),
          name: '拨入拨出',
          icon: './assets/icons/company.png',
        },
        {
          option: getLineOptions([
            {
              unit: '个',
              type: 'bar',
              data: data.daySummary4,
              name: '丢失量',
              theme: 'theme2',
            },
            {
              unit: '%',
              type: 'line',
              data: data.diushilv,
              name: '丢失率',
              yAxisIndex: 1
            },
          ]),
          name: '丢失率',
          icon: './assets/icons/company.png',
        },
      ];
      return echartsList;

    })
  }
  serve_hw_month(date: string[]) {
    const dateNow = date.map(i => format(new Date(i), 'yyyyMM'));
    const dateSubYears = date.map(i => format(subYears(new Date(i), 1), 'yyyyMMdd'));
    return Promise.all([
      this.apiService.serve_hw_month(dateNow),
      this.apiService.serve_hw_month(dateSubYears)
    ]).then(([current, sub]) => {
      const data = this.serve_hw_month_paser(current, sub);
      const echartsList = [
        {
          option: getLineOptions([
            {
              unit: '个',
              type: 'bar',
              data: data.daySummary1,
              name: '话务量',
              theme: 'theme2',
            },
            {
              unit: '%',
              type: 'line',
              data: data.dayRateList,
              name: '月环比',
              yAxisIndex: 1
            },
          ]),
          name: '话务量',
          icon: './assets/icons/company.png',
        },
        {
          option: getLineOptions([
            {
              unit: '个',
              type: 'line',
              data: data.daySummary2,
              name: '拨入量',
              theme: 'theme2',
            },
            {
              unit: '',
              type: 'line',
              data: data.daySummary3,
              name: '拨出量',
            },
          ]),
          name: '拨入拨出',
          icon: './assets/icons/company.png',
        },
        {
          option: getLineOptions([
            {
              unit: '个',
              type: 'bar',
              data: data.daySummary4,
              name: '丢失量',
              theme: 'theme2',
            },
            {
              unit: '%',
              type: 'line',
              data: data.diushilv,
              name: '丢失率',
              yAxisIndex: 1
            },
          ]),
          name: '丢失率',
          icon: './assets/icons/company.png',
        },
      ];
      return echartsList;
    })
  }
  serve_hw_year(date: string[]) {
    const dateNow = date.map(i => format(new Date(i), 'yyyy'));
    return Promise.all([
      this.apiService.serve_hw_year(dateNow),
    ]).then(([current]) => {
      const data = this.serve_hw_year_paser(current);
      const echartsList = [
        {
          option: getLineOptions([
            {
              unit: '个',
              type: 'bar',
              data: data.daySummary1,
              name: '话务量',
              theme: 'theme2',
            }
          ]),
          name: '话务量',
          icon: './assets/icons/company.png',
        },
        {
          option: getLineOptions([
            {
              unit: '个',
              type: 'line',
              data: data.daySummary2,
              name: '拨入量',
              theme: 'theme2',
            },
            {
              unit: '',
              type: 'line',
              data: data.daySummary3,
              name: '拨出量',
            },
          ]),
          name: '拨入拨出',
          icon: './assets/icons/company.png',
        },
        {
          option: getLineOptions([
            {
              unit: '个',
              type: 'bar',
              data: data.daySummary4,
              name: '丢失量',
              theme: 'theme2',
            },
            {
              unit: '%',
              type: 'line',
              data: data.diushilv,
              name: '丢失率',
              yAxisIndex: 1
            },
          ]),
          name: '丢失率',
          icon: './assets/icons/company.png',
        },
      ];
      return echartsList;
    })
  }
  serve_gd_hour(date: string[]) {
    const dateNow = date.map(i => format(new Date(i), 'yyyyMMddHH'));
    return Promise.all([
      this.apiService.serve_gd_hour(dateNow),
    ]).then(([current]) => {
      const data = this.serve_gd_hour_parser(current);
      const echartsList = [
        {
          option: getLineOptions([
            {
              unit: '个',
              type: 'line',
              data: data.daySummary1,
              name: '工单数',
              theme: 'theme1',
              legend: true,
            },
            {
              unit: '',
              type: 'line',
              data: data.daySummary2,
              name: '完成数',
              theme: 'theme2',
            },
            {
              unit: '',
              type: 'line',
              data: data.daySummary3,
              name: '及时完成数',
              theme: 'theme3',
            }
          ]),
          name: '工单',
          icon: './assets/icons/company.png',
        },
        {
          option: getLineOptions([
            {
              unit: '%',
              type: 'line',
              data: data.wanchenglv,
              name: '完成率',
              theme: 'theme2',
              legend: true,
            },
            {
              unit: '',
              type: 'line',
              data: data.jishilv,
              name: '及时完成率',
            },
          ]),
          name: '效率',
          icon: './assets/icons/company.png',
        },
      ];
      return echartsList;
    })
  }
  serve_gd_day(date: string[]) {
    const dateNow = date.map(i => format(new Date(i), 'yyyyMMdd'));
    return Promise.all([
      this.apiService.serve_gd_day(dateNow),
    ]).then(([current]) => {
      const data = this.serve_gd_day_parser(current);
      const echartsList = [
        {
          option: getLineOptions([
            {
              unit: '个',
              type: 'line',
              data: data.daySummary1,
              name: '工单数',
              theme: 'theme1',
              legend: true,
            },
            {
              unit: '',
              type: 'line',
              data: data.daySummary2,
              name: '完成数',
              theme: 'theme2',
            },
            {
              unit: '',
              type: 'line',
              data: data.daySummary3,
              name: '及时完成数',
              theme: 'theme3',
            }
          ]),
          name: '工单',
          icon: './assets/icons/company.png',
        },
        {
          option: getLineOptions([
            {
              unit: '%',
              type: 'line',
              data: data.wanchenglv,
              name: '完成率',
              theme: 'theme2',
              legend: true,
            },
            {
              unit: '',
              type: 'line',
              data: data.jishilv,
              name: '及时完成率',
            },
          ]),
          name: '效率',
          icon: './assets/icons/company.png',
        },
      ];
      return echartsList;

    })
  }
  serve_gd_month(date: string[]) {
    const dateNow = date.map(i => format(new Date(i), 'yyyyMM'));
    return Promise.all([
      this.apiService.serve_gd_month(dateNow),
    ]).then(([current]) => {
      const data = this.serve_gd_month_parser(current);
      const echartsList = [
        {
          option: getLineOptions([
            {
              unit: '个',
              type: 'line',
              data: data.daySummary1,
              name: '工单数',
              theme: 'theme1',
              legend: true,
            },
            {
              unit: '',
              type: 'line',
              data: data.daySummary2,
              name: '完成数',
              theme: 'theme2',
            },
            {
              unit: '',
              type: 'line',
              data: data.daySummary3,
              name: '及时完成数',
              theme: 'theme3',
            }
          ]),
          name: '工单',
          icon: './assets/icons/company.png',
        },
        {
          option: getLineOptions([
            {
              unit: '%',
              type: 'line',
              data: data.wanchenglv,
              name: '完成率',
              theme: 'theme2',
              legend: true,
            },
            {
              unit: '',
              type: 'line',
              data: data.jishilv,
              name: '及时完成率',
            },
          ]),
          name: '效率',
          icon: './assets/icons/company.png',
        },
      ];
      return echartsList;

    })
  }
  serve_gd_year(date: string[]) {
    const dateNow = date.map(i => format(new Date(i), 'yyyy'));
    return Promise.all([
      this.apiService.serve_gd_year(dateNow),
    ]).then(([current]) => {
      const data = this.serve_gd_year_parser(current);
      const echartsList = [
        {
          option: getLineOptions([
            {
              unit: '个',
              type: 'line',
              data: data.daySummary1,
              name: '工单数',
              theme: 'theme1',
              legend: true,
            },
            {
              unit: '',
              type: 'line',
              data: data.daySummary2,
              name: '完成数',
              theme: 'theme2',
            },
            {
              unit: '',
              type: 'line',
              data: data.daySummary3,
              name: '及时完成数',
              theme: 'theme3',
            }
          ]),
          name: '工单',
          icon: './assets/icons/company.png',
        },
        {
          option: getLineOptions([
            {
              unit: '%',
              type: 'line',
              data: data.wanchenglv,
              name: '完成率',
              theme: 'theme2',
              legend: true,
            },
            {
              unit: '',
              type: 'line',
              data: data.jishilv,
              name: '及时完成率',
            },
          ]),
          name: '效率',
          icon: './assets/icons/company.png',
        },
      ];
      return echartsList;

    })
  }
  serve_fw_hour(date: string[]) {
    const dateNow = date.map(i => format(new Date(i), 'yyyyMMddHH'));
    return Promise.all([
      this.apiService.serve_fw_hour(dateNow),
    ]).then(([current]) => {
      const data = current.sort((a, b) => a.xs - b.xs);
      data.map(item => {
        item.xs = item.xs.substr(0, 8) + ' ' + item.xs.substr(8, 10);
        item.xs = moment(item.xs).format('HH:00')
      })

      const echartsList = [
        {
          option: getLineOptions([
            {
              unit: '秒',
              type: 'line',
              data: data.map(i => ({ datatime: i.xs, value: Math.round(i.hwsc / i.hwl) })),
              name: '单均话务时长',
              theme: 'theme1',
            },
          ]),
          name: '单均话务时长',
          icon: './assets/icons/company.png',
        },
        {
          option: getLineOptions([
            {
              unit: '秒',
              type: 'line',
              data: data.map(i => ({ datatime: i.xs, value: i.zcddsj })),
              name: '最长等待时间',
              theme: 'theme2',
            },
          ]),
          name: '最长等待时间',
          icon: './assets/icons/company.png',
        },
        {
          option: getLineOptions([
            {
              unit: '%',
              type: 'line',
              data: data.map(i => ({
                datatime: i.xs,
                value: i.fwzs && (Math.round(i.fwzs / i.rxjts * 10000) / 100) || 100
              })),
              name: '服务水平',
              theme: 'theme3',
            },
          ]),
          name: '服务水平',
          icon: './assets/icons/company.png',
        }
      ];
      return echartsList;

    })
  }
  serve_fw_day(date: string[]) {
    const dateNow = date.map(i => format(new Date(i), 'yyyyMMdd'));
    return Promise.all([
      this.apiService.serve_fw_day(dateNow),
    ]).then(([current]) => {
      const data = current.sort((a, b) => a.ri - b.ri);
      data.map(item => { item.ri = moment(item.ri).format('MM/DD') });
      const echartsList = [
        {
          option: getLineOptions([
            {
              unit: '秒',
              type: 'line',
              data: data.map(i => ({ datatime: i.ri, value: Math.round(i.hwsc / i.rxhwl) })),
              name: '单均话务时长',
              theme: 'theme1',
            },
          ]),
          name: '单均话务时长',
          icon: './assets/icons/company.png',
        },
        {
          option: getLineOptions([
            {
              unit: '秒',
              type: 'line',
              data: data.map(i => ({ datatime: i.ri, value: i.zcddsj })),
              name: '最长等待时间',
              theme: 'theme2',
            },
          ]),
          name: '最长等待时间',
          icon: './assets/icons/company.png',
        },
        {
          option: getLineOptions([
            {
              unit: '%',
              type: 'line',
              data: data.map(i => ({
                datatime: i.ri,
                value: i.fwzs && Math.round(i.fwzs / i.rxjts * 100) || 100
              })),
              name: '服务水平',
              theme: 'theme3',
            },
          ]),
          name: '服务水平',
          icon: './assets/icons/company.png',
        }
      ];
      return echartsList;
    })
  }
  serve_fw_month(date: string[]) {
    const dateNow = date.map(i => format(new Date(i), 'yyyyMM'));
    return Promise.all([
      this.apiService.serve_fw_month(dateNow),
    ]).then(([current]) => {
      const data = current.sort((a, b) => a.yue - b.yue);
      data.map(item => { item.yue = moment(item.yue).format('YYYY/MM') });
      const echartsList = [
        {
          option: getLineOptions([
            {
              unit: '秒',
              type: 'line',
              data: data.map(i => ({ datatime: i.yue, value: Math.round(i.hwsc / i.rxhwl) })),
              name: '单均话务时长',
              theme: 'theme1',
            },
          ]),
          name: '单均话务时长',
          icon: './assets/icons/company.png',
        },
        {
          option: getLineOptions([
            {
              unit: '秒',
              type: 'line',
              data: data.map(i => ({ datatime: i.yue, value: i.zcddsj })),
              name: '最长等待时间',
              theme: 'theme2',
            },
          ]),
          name: '最长等待时间',
          icon: './assets/icons/company.png',
        },
        {
          option: getLineOptions([
            {
              unit: '%',
              type: 'line',
              data: data.map(i => ({
                datatime: i.yue,
                value: i.fwzs && Math.round(i.fwzs / i.rxjts * 100) || 100
              })),
              name: '服务水平',
              theme: 'theme3',
            },
          ]),
          name: '服务水平',
          icon: './assets/icons/company.png',
        }
      ];
      return echartsList;
    })
  }
  serve_fw_year(date: string[]) {
    const dateNow = date.map(i => format(new Date(i), 'yyyy'));
    return Promise.all([
      this.apiService.serve_fw_year(dateNow),
    ]).then(([current]) => {
      const data = current.sort((a, b) => a.year_ - b.year_);
      const echartsList = [
        {
          option: getLineOptions([
            {
              unit: '秒',
              type: 'line',
              data: data.map(i => ({ datatime: i.year_, value: Math.round(i.hwsc / i.rxhwl) })),
              name: '单均话务时长',
              theme: 'theme1',
            },
          ]),
          name: '单均话务时长',
          icon: './assets/icons/company.png',
        },
        {
          option: getLineOptions([
            {
              unit: '秒',
              type: 'line',
              data: data.map(i => ({ datatime: i.year_, value: i.zcddsj })),
              name: '最长等待时间',
              theme: 'theme2',
            },
          ]),
          name: '最长等待时间',
          icon: './assets/icons/company.png',
        },
        {
          option: getLineOptions([
            {
              unit: '%',
              type: 'line',
              data: data.map(i => ({
                datatime: i.year_,
                value: i.fwzs && Math.round(i.fwzs / i.rxjts * 100) || 100
              })),
              name: '服务水平',
              theme: 'theme3',
            },
          ]),
          name: '服务水平',
          icon: './assets/icons/company.png',
        }
      ];
      return echartsList;
    })
  }
  serve_fb_hour(date: string[]) {
    const dateNow = date.map(i => format(new Date(i), 'yyyyMMddHH'));
    return Promise.all([
      this.apiService.serve_fb_hour(dateNow),
    ]).then(([current]) => {
      const currentMap: { [key: string]: any } = {};
      const setAttr = (mapObj: { [key: string]: any }, i: any) => {
        if (!mapObj[i.qy]) { mapObj[i.qy] = { datatime: i.qy, value: 0 }; };
        mapObj[i.qy].value += i.rxsl;
      }
      current.map(i => { setAttr(currentMap, i) });

      const data = Object.values(currentMap).sort((a, b) => a.value - b.value);
      const echartsList = [{
        option: getRadarOptions({ data, name: '区域分布', theme: 'theme3', shape: 'circle' }),
        name: '热线区域分布',
        icon: './assets/icons/company.png'
      }]
      return echartsList;
    })
  }
  serve_fb_day(date: string[]) {
    const dateNow = date.map(i => format(new Date(i), 'yyyyMMdd'));
    return Promise.all([
      this.apiService.serve_fb_day(dateNow),
    ]).then(([current]) => {
      const currentMap: { [key: string]: any } = {};
      const setAttr = (mapObj: { [key: string]: any }, i: any) => {
        if (!mapObj[i.qy]) { mapObj[i.qy] = { datatime: i.qy, value: 0 }; };
        mapObj[i.qy].value += i.rxsl;
      }
      current.map(i => { setAttr(currentMap, i) });

      const data = Object.values(currentMap).sort((a, b) => a.value - b.value);
      const echartsList = [{
        option: getRadarOptions({ data, name: '区域分布', theme: 'theme3', shape: 'circle' }),
        name: '热线区域分布',
        icon: './assets/icons/company.png'
      }]
      return echartsList;
    })
  }
  serve_fb_month(date: string[]) {
    const dateNow = date.map(i => format(new Date(i), 'yyyyMM'));
    return Promise.all([
      this.apiService.serve_fb_month(dateNow),
    ]).then(([current]) => {
      const currentMap: { [key: string]: any } = {};
      const setAttr = (mapObj: { [key: string]: any }, i: any) => {
        if (!mapObj[i.qy]) { mapObj[i.qy] = { datatime: i.qy, value: 0 }; };
        mapObj[i.qy].value += i.rxsl;
      }
      current.map(i => { setAttr(currentMap, i) });

      const data = Object.values(currentMap).sort((a, b) => a.value - b.value);
      const echartsList = [{
        option: getRadarOptions({ data, name: '区域分布', theme: 'theme3', shape: 'circle' }),
        name: '热线区域分布',
        icon: './assets/icons/company.png'
      }]
      return echartsList;
    })
  }
  serve_fb_year(date: string[]) {
    const dateNow = date.map(i => format(new Date(i), 'yyyy'));
    return Promise.all([
      this.apiService.serve_fb_year(dateNow),
    ]).then(([current]) => {
      const currentMap: { [key: string]: any } = {};
      const setAttr = (mapObj: { [key: string]: any }, i: any) => {
        if (!mapObj[i.qy]) { mapObj[i.qy] = { datatime: i.qy, value: 0 }; };
        mapObj[i.qy].value += i.rxsl;
      }
      current.map(i => { setAttr(currentMap, i) });

      const data = Object.values(currentMap).sort((a, b) => a.value - b.value);
      const echartsList = [{
        option: getRadarOptions({ data, name: '区域分布', theme: 'theme3', shape: 'circle' }),
        name: '热线区域分布',
        icon: './assets/icons/company.png'
      }]
      return echartsList;
    })
  }
  serve_lb_hour(date: string[]) {
    const dateNow = date.map(i => format(new Date(i), 'yyyyMMddHH'));
    return Promise.all([
      this.apiService.serve_lb_hour(dateNow),
    ]).then(([current]) => {
      const currentMap: { [key: string]: any } = {};
      const setAttr = (mapObj: { [key: string]: any }, i: any) => {
        if (!mapObj[i.gdzl]) { mapObj[i.gdzl] = { datatime: i.gdzl || '未分类', value: 0 }; };
        mapObj[i.gdzl].value += i.gdsl;
      }
      current.map(i => { setAttr(currentMap, i) });
      const data = Object.values(currentMap).sort((a, b) => a.value - b.value);
      const echartsList = [{
        option: getRadarOptions({ data, name: '热线类别', theme: 'theme1' }),
        name: '热线类别',
        icon: './assets/icons/company.png',
        height: data.length * 34 + 24
      }]
      return echartsList;
    })
  }
  serve_lb_day(date: string[]) {
    const dateNow = date.map(i => format(new Date(i), 'yyyyMMdd'));
    return Promise.all([
      this.apiService.serve_lb_day(dateNow),
    ]).then(([current]) => {
      const currentMap: { [key: string]: any } = {};
      const setAttr = (mapObj: { [key: string]: any }, i: any) => {
        if (!mapObj[i.gdzl]) { mapObj[i.gdzl] = { datatime: i.gdzl || '未分类', value: 0 }; };
        mapObj[i.gdzl].value += i.gdsl;
      }
      current.map(i => { setAttr(currentMap, i) });
      const data = Object.values(currentMap).sort((a, b) => a.value - b.value);
      const echartsList = [{
        option: getRadarOptions({ data, name: '热线类别', theme: 'theme1' }),
        name: '热线类别',
        icon: './assets/icons/company.png',
        height: data.length * 34 + 24
      }]
      return echartsList;
    })
  }
  serve_lb_month(date: string[]) {
    const dateNow = date.map(i => format(new Date(i), 'yyyyMM'));
    return Promise.all([
      this.apiService.serve_lb_month(dateNow),
    ]).then(([current]) => {
      const currentMap: { [key: string]: any } = {};
      const setAttr = (mapObj: { [key: string]: any }, i: any) => {
        if (!mapObj[i.gdzl]) { mapObj[i.gdzl] = { datatime: i.gdzl || '未分类', value: 0 }; };
        mapObj[i.gdzl].value += i.gdsl;
      }
      current.map(i => { setAttr(currentMap, i) });
      const data = Object.values(currentMap).sort((a, b) => a.value - b.value);
      const echartsList = [{
        option: getRadarOptions({ data, name: '热线类别', theme: 'theme1' }),
        name: '热线类别',
        icon: './assets/icons/company.png',
        height: data.length * 34 + 24
      }]
      return echartsList;
    })
  }
  serve_lb_year(date: string[]) {
    const dateNow = date.map(i => format(new Date(i), 'yyyy'));
    return Promise.all([
      this.apiService.serve_lb_year(dateNow),
    ]).then(([current]) => {
      const currentMap: { [key: string]: any } = {};
      const setAttr = (mapObj: { [key: string]: any }, i: any) => {
        if (!mapObj[i.gdzl]) { mapObj[i.gdzl] = { datatime: i.gdzl || '未分类', value: 0 }; };
        mapObj[i.gdzl].value += i.gdsl;
      }
      current.map(i => { setAttr(currentMap, i) });
      const data = Object.values(currentMap).sort((a, b) => a.value - b.value);
      const echartsList = [{
        option: getRadarOptions({ data, name: '热线类别', theme: 'theme1' }),
        name: '热线类别',
        icon: './assets/icons/company.png',
        height: data.length * 34 + 24
      }]
      return echartsList;
    })
  }
  private serve_hw_hour_paser(current: any[], sub: any[]) {
    const currentMap: { [key: string]: any } = {};
    const subMap: { [key: string]: any } = {};
    const setAttr = (mapObj: { [key: string]: any }, i: any) => {
      if (!mapObj[i.xs]) {
        mapObj[i.xs] = { date: i.xs, hwl: 0, brdhs: 0, bcdhs: 0, brdss: 0 };
      };
      mapObj[i.xs].hwl += i.hwl;
      mapObj[i.xs].brdhs += i.brdhs;
      mapObj[i.xs].bcdhs += i.bcdhs;
      mapObj[i.xs].brdss += i.brdss;
    }

    current.map(i => { setAttr(currentMap, i) });
    sub.map(i => { setAttr(subMap, i) });
    const rateList: any[] = [];
    Object.values(currentMap).map(item => {
      item.date = item.date.substr(0, 8) + ' ' + item.date.substr(8, 10);
      const subKey = moment(item.date).subtract(1, 'days').format('YYYYMMDDHH');
      item.date = moment(item.date).format('HH:00')
      const subitem = subMap[subKey];
      if (subitem) {
        rateList.push({
          datatime: item.date,
          value: Math.round((item.hwl - subitem.hwl) / subitem.hwl * 10000) / 100
        })
      } else {
        rateList.push({
          datatime: item.date,
          value: null
        })
      }
    })

    const diushilv: any[] = [];
    Object.values(currentMap).map(item => {
      diushilv.push({
        datatime: item.date,
        value: Math.round(item.brdss / item.brdhs * 10000) / 100
      })
    })

    return {
      dayRateList: rateList.sort((a, b) => +a.datatime - +b.datatime),
      diushilv,
      daySummary1: Object.values(currentMap).map(item => ({ datatime: item.date, value: item.hwl })),
      daySummary2: Object.values(currentMap).map(item => ({ datatime: item.date, value: item.brdhs })),
      daySummary3: Object.values(currentMap).map(item => ({ datatime: item.date, value: item.bcdhs })),
      daySummary4: Object.values(currentMap).map(item => ({ datatime: item.date, value: item.brdss })),
    }
  }
  private serve_hw_day_paser(current: any[], sub: any[]) {
    const currentMap: { [key: string]: any } = {};
    const subMap: { [key: string]: any } = {};
    const setAttr = (mapObj: { [key: string]: any }, i: any) => {
      if (!mapObj[i.ri]) {
        mapObj[i.ri] = { date: i.ri, rxhwl: 0, rxbrs: 0, hfbcs: 0, rxdss: 0 };
      };
      mapObj[i.ri].rxhwl += i.rxhwl;
      mapObj[i.ri].rxbrs += i.rxbrs;
      mapObj[i.ri].hfbcs += i.hfbcs;
      mapObj[i.ri].rxdss += i.rxdss;
    }

    current.map(i => { setAttr(currentMap, i) });
    sub.map(i => { setAttr(subMap, i) });
    const rateList: any[] = [];
    Object.values(currentMap).map(item => {
      const subKey = moment(item.date).subtract(1, 'months').format('YYYYMMDD');
      item.date = moment(item.date).format('MM/DD');
      const subitem = subMap[subKey];
      if (subitem) {
        rateList.push({
          datatime: item.date,
          value: Math.round((item.rxhwl - subitem.rxhwl) / subitem.rxhwl * 10000) / 100
        })
      } else {
        rateList.push({
          datatime: item.date,
          value: null
        })
      }
    })

    const diushilv: any[] = [];
    Object.values(currentMap).map(item => {
      diushilv.push({
        datatime: item.date,
        value: Math.round(item.rxdss / item.rxbrs * 10000) / 100
      })
    })

    return {
      dayRateList: rateList.sort((a, b) => +a.datatime - +b.datatime),
      diushilv,
      daySummary1: Object.values(currentMap).map(item => ({ datatime: item.date, value: item.rxhwl })),
      daySummary2: Object.values(currentMap).map(item => ({ datatime: item.date, value: item.rxbrs })),
      daySummary3: Object.values(currentMap).map(item => ({ datatime: item.date, value: item.hfbcs })),
      daySummary4: Object.values(currentMap).map(item => ({ datatime: item.date, value: item.rxdss })),
    }
  }
  private serve_hw_month_paser(current: any[], sub: any[]) {
    const currentMap: { [key: string]: any } = {};
    const subMap: { [key: string]: any } = {};
    const setAttr = (mapObj: { [key: string]: any }, i: any) => {
      if (!mapObj[i.yue]) {
        mapObj[i.yue] = { date: i.yue, rxhwl: 0, rxbrs: 0, hfbcs: 0, rxdss: 0 };
      };
      mapObj[i.yue].rxhwl += i.rxhwl;
      mapObj[i.yue].rxbrs += i.rxbrs;
      mapObj[i.yue].hfbcs += i.hfbcs;
      mapObj[i.yue].rxdss += i.rxdss;
    }

    current.map(i => { setAttr(currentMap, i) });
    sub.map(i => { setAttr(subMap, i) });
    const rateList: any[] = [];
    Object.values(currentMap).map(item => {
      const subKey = moment(item.date).subtract(1, 'years').format('YYYYMM');
      item.date = moment(item.date).format('YYYY/MM');
      const subitem = subMap[subKey];
      if (subitem) {
        rateList.push({
          datatime: item.date,
          value: Math.round((item.rxhwl - subitem.rxhwl) / subitem.rxhwl * 10000) / 100
        })
      } else {
        rateList.push({
          datatime: item.date,
          value: null
        })
      }
    })

    const diushilv: any[] = [];
    Object.values(currentMap).map(item => {
      diushilv.push({
        datatime: item.date,
        value: Math.round(item.rxdss / item.rxbrs * 10000) / 100
      })
    })

    return {
      dayRateList: rateList.sort((a, b) => +a.datatime - +b.datatime),
      diushilv,
      daySummary1: Object.values(currentMap).map(item => ({ datatime: item.date, value: item.rxhwl })),
      daySummary2: Object.values(currentMap).map(item => ({ datatime: item.date, value: item.rxbrs })),
      daySummary3: Object.values(currentMap).map(item => ({ datatime: item.date, value: item.hfbcs })),
      daySummary4: Object.values(currentMap).map(item => ({ datatime: item.date, value: item.rxdss })),
    }
  }
  private serve_hw_year_paser(current: any[]) {
    const currentMap: { [key: string]: any } = {};
    const setAttr = (mapObj: { [key: string]: any }, i: any) => {
      if (!mapObj[i.year_]) {
        mapObj[i.year_] = { date: i.year_, rxhwl: 0, rxbrs: 0, hfbcs: 0, rxdss: 0 };
      };
      mapObj[i.year_].rxhwl += i.rxhwl;
      mapObj[i.year_].rxbrs += i.rxbrs;
      mapObj[i.year_].hfbcs += i.hfbcs;
      mapObj[i.year_].rxdss += i.rxdss;
    }

    current.map(i => { setAttr(currentMap, i) });

    const diushilv: any[] = [];
    Object.values(currentMap).map(item => {
      diushilv.push({
        datatime: item.date,
        value: Math.round(item.rxdss / item.rxbrs * 10000) / 100
      })
    })

    return {
      diushilv,
      daySummary1: Object.values(currentMap).map(item => ({ datatime: item.date, value: item.rxhwl })),
      daySummary2: Object.values(currentMap).map(item => ({ datatime: item.date, value: item.rxbrs })),
      daySummary3: Object.values(currentMap).map(item => ({ datatime: item.date, value: item.hfbcs })),
      daySummary4: Object.values(currentMap).map(item => ({ datatime: item.date, value: item.rxdss })),
    }
  }
  serve_gd_hour_parser(current: any[]) {
    const currentMap: { [key: string]: any } = {};
    const setAttr = (mapObj: { [key: string]: any }, i: any) => {
      if (!mapObj[i.xs]) {
        mapObj[i.xs] = { date: i.xs, gdsl: 0, gdwcs: 0, jswc: 0, wwc: 0 };
      };
      mapObj[i.xs].gdsl += i.gdsl;
      mapObj[i.xs].gdwcs += i.gdwcs;
      mapObj[i.xs].jswc += i.jswc;
      mapObj[i.xs].wwc += i.wwc;
    }
    current.map(i => { setAttr(currentMap, i) });
    const wanchenglv: any[] = [];
    const jishilv: any[] = [];
    Object.values(currentMap).map(item => {
      item.date = item.date.substr(0, 8) + ' ' + item.date.substr(8, 10);
      item.date = moment(item.date).format('HH:00')

      wanchenglv.push({
        datatime: item.date,
        value: Math.round(item.gdwcs / item.gdsl * 10000) / 100
      })
      jishilv.push({
        datatime: item.date,
        value: Math.round(item.jswc / item.gdsl * 10000) / 100
      })
    })

    return {
      wanchenglv, jishilv,
      daySummary1: Object.values(currentMap).map(item => ({ datatime: item.date, value: item.gdsl })),
      daySummary2: Object.values(currentMap).map(item => ({ datatime: item.date, value: item.gdwcs })),
      daySummary3: Object.values(currentMap).map(item => ({ datatime: item.date, value: item.jswc })),
      daySummary4: Object.values(currentMap).map(item => ({ datatime: item.date, value: item.wwc })),
    }
  }
  serve_gd_day_parser(current: any[]) {
    const currentMap: { [key: string]: any } = {};
    const setAttr = (mapObj: { [key: string]: any }, i: any) => {
      if (!mapObj[i.ri]) {
        mapObj[i.ri] = { date: i.ri, gdsl: 0, gdwcs: 0, jswc: 0, wwc: 0 };
      };
      mapObj[i.ri].gdsl += i.gdsl;
      mapObj[i.ri].gdwcs += i.gdwcs;
      mapObj[i.ri].jswc += i.jswc;
      mapObj[i.ri].wwc += i.wwc;
    }
    current.map(i => { setAttr(currentMap, i) });
    const wanchenglv: any[] = [];
    const jishilv: any[] = [];
    Object.values(currentMap).map(item => {
      item.date = moment(item.date).format('MM/DD');
      wanchenglv.push({
        datatime: item.date,
        value: Math.round(item.gdwcs / item.gdsl * 10000) / 100
      })
      jishilv.push({
        datatime: item.date,
        value: Math.round(item.jswc / item.gdsl * 10000) / 100
      })
    })

    return {
      wanchenglv, jishilv,
      daySummary1: Object.values(currentMap).map(item => ({ datatime: item.date, value: item.gdsl })),
      daySummary2: Object.values(currentMap).map(item => ({ datatime: item.date, value: item.gdwcs })),
      daySummary3: Object.values(currentMap).map(item => ({ datatime: item.date, value: item.jswc })),
      daySummary4: Object.values(currentMap).map(item => ({ datatime: item.date, value: item.wwc })),
    }
  }
  serve_gd_month_parser(current: any[]) {
    const currentMap: { [key: string]: any } = {};
    const setAttr = (mapObj: { [key: string]: any }, i: any) => {
      if (!mapObj[i.yue]) {
        mapObj[i.yue] = { date: i.yue, gdsl: 0, gdwcs: 0, jswc: 0, wwc: 0 };
      };
      mapObj[i.yue].gdsl += i.gdsl;
      mapObj[i.yue].gdwcs += i.gdwcs;
      mapObj[i.yue].jswc += i.jswc;
      mapObj[i.yue].wwc += i.wwc;
    }
    current.map(i => { setAttr(currentMap, i) });
    const wanchenglv: any[] = [];
    const jishilv: any[] = [];
    Object.values(currentMap).map(item => {
      item.date = moment(item.date).format('YYYY/MM');

      wanchenglv.push({
        datatime: item.date,
        value: Math.round(item.gdwcs / item.gdsl * 10000) / 100
      })
      jishilv.push({
        datatime: item.date,
        value: Math.round(item.jswc / item.gdsl * 10000) / 100
      })
    })

    return {
      wanchenglv, jishilv,
      daySummary1: Object.values(currentMap).map(item => ({ datatime: item.date, value: item.gdsl })),
      daySummary2: Object.values(currentMap).map(item => ({ datatime: item.date, value: item.gdwcs })),
      daySummary3: Object.values(currentMap).map(item => ({ datatime: item.date, value: item.jswc })),
      daySummary4: Object.values(currentMap).map(item => ({ datatime: item.date, value: item.wwc })),
    }
  }
  serve_gd_year_parser(current: any[]) {
    const currentMap: { [key: string]: any } = {};
    const setAttr = (mapObj: { [key: string]: any }, i: any) => {
      if (!mapObj[i.year_]) {
        mapObj[i.year_] = { date: i.year_, gdsl: 0, gdwcs: 0, jswc: 0, wwc: 0 };
      };
      mapObj[i.year_].gdsl += i.gdsl;
      mapObj[i.year_].gdwcs += i.gdwcs;
      mapObj[i.year_].jswc += i.jswc;
      mapObj[i.year_].wwc += i.wwc;
    }
    current.map(i => { setAttr(currentMap, i) });
    const wanchenglv: any[] = [];
    const jishilv: any[] = [];
    Object.values(currentMap).map(item => {
      wanchenglv.push({
        datatime: item.date,
        value: Math.round(item.gdwcs / item.gdsl * 10000) / 100
      })
      jishilv.push({
        datatime: item.date,
        value: Math.round(item.jswc / item.gdsl * 10000) / 100
      })
    })

    return {
      wanchenglv, jishilv,
      daySummary1: Object.values(currentMap).map(item => ({ datatime: item.date, value: item.gdsl })),
      daySummary2: Object.values(currentMap).map(item => ({ datatime: item.date, value: item.gdwcs })),
      daySummary3: Object.values(currentMap).map(item => ({ datatime: item.date, value: item.jswc })),
      daySummary4: Object.values(currentMap).map(item => ({ datatime: item.date, value: item.wwc })),
    }
  }
}
