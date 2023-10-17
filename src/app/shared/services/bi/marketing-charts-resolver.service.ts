import { Injectable } from '@angular/core';
import { subMonths, subYears, format } from 'date-fns';
import * as moment from 'moment';
import { BiApiService } from '@shared/services/bi-api.service';
import { getLineOptions } from '@shared/components/bi-echarts/echarts-options';

@Injectable({
  providedIn: 'root',
})
export class MarketingChartsResolverService {
  [key: string]: any;
  constructor(private apiService: BiApiService) {}

  marketing_hb_day(date: string[]) {
    const dateNow = date.map((i) => format(new Date(i), 'yyyyMMdd'));
    return Promise.all([this.apiService.marketing_hb_day(dateNow)]).then(
      ([current]) => {
        const hubiao = current.sort((a, b) => a.ri - b.ri);
        const jumin = hubiao.filter((data) => data.priceno === '居民');
        const feijumin = hubiao.filter((data) => data.priceno !== '居民');
        const feijuminMap: { [key: string]: any } = {};
        const allMap: { [key: string]: any } = {};
        const setAttr = (mapObj: { [key: string]: any }, i: any) => {
          if (!mapObj[i.ri]) {
            mapObj[i.ri] = { date: i.ri, xzyhs: 0 };
          }
          mapObj[i.ri].xzyhs += i.xzyhs || 0;
        };
        hubiao.map((i) => {
          i.ri = moment(i.ri).format('MM/DD');
          setAttr(allMap, i);
        });
        feijumin.map((i) => {
          setAttr(feijuminMap, i);
        });
        const echartsList = [
          {
            option: getLineOptions([
              {
                unit: '个',
                type: 'bar',
                data: Object.values(allMap).map((i) => ({
                  datatime: i.date,
                  value: i.xzyhs,
                })),
                name: '新增合计',
                theme: 'theme1',
              },
            ]),
            name: '新增合计',
            icon: './assets/icons/company.png',
          },
          {
            option: getLineOptions([
              {
                unit: '个',
                type: 'bar',
                data: jumin.map((i) => ({ datatime: i.ri, value: i.xzyhs })),
                name: '新增居民户表',
                theme: 'theme2',
              },
            ]),
            name: '新增居民户表',
            icon: './assets/icons/factory.png',
          },
          {
            option: getLineOptions([
              {
                unit: '个',
                type: 'bar',
                data: Object.values(feijuminMap).map((i) => ({
                  datatime: i.date,
                  value: i.xzyhs,
                })),
                name: '新增非居民户表',
                theme: 'theme2',
              },
            ]),
            name: '新增非居民户表',
            icon: './assets/icons/factory.png',
          },
        ];
        return echartsList;
      }
    );
  }
  marketing_hb_month(date: string[]) {
    const dateNow = date.map((i) => format(new Date(i), 'yyyyMM'));
    return Promise.all([this.apiService.marketing_hb_month(dateNow)]).then(
      ([current]) => {
        const hubiao = current.sort((a, b) => a.yue - b.yue);
        const jumin = hubiao.filter((data) => data.priceno === '居民');
        const feijumin = hubiao.filter((data) => data.priceno !== '居民');
        const feijuminMap: { [key: string]: any } = {};
        const allMap: { [key: string]: any } = {};
        const setAttr = (mapObj: { [key: string]: any }, i: any) => {
          if (!mapObj[i.yue]) {
            mapObj[i.yue] = { date: moment(i.yue).format('YYYY/MM'), xzyhs: 0 };
          }
          mapObj[i.yue].xzyhs += i.xzyhs || 1;
        };
        hubiao.map((i) => {
          setAttr(allMap, i);
        });
        feijumin.map((i) => {
          setAttr(feijuminMap, i);
        });

        const echartsList = [
          {
            option: getLineOptions([
              {
                unit: '个',
                type: 'bar',
                data: Object.values(allMap).map((i) => ({
                  datatime: i.date,
                  value: i.xzyhs,
                })),
                name: '新增合计',
                theme: 'theme1',
              },
            ]),
            name: '新增合计',
            icon: './assets/icons/company.png',
          },
          {
            option: getLineOptions([
              {
                unit: '个',
                type: 'bar',
                data: jumin.map((i) => ({
                  datatime: moment(i.yue).format('YYYY/MM'),
                  value: i.xzyhs,
                })),
                name: '新增居民户表',
                theme: 'theme2',
              },
            ]),
            name: '新增居民户表',
            icon: './assets/icons/factory.png',
          },
          {
            option: getLineOptions([
              {
                unit: '个',
                type: 'bar',
                data: Object.values(feijuminMap).map((i) => ({
                  datatime: i.date,
                  value: i.xzyhs,
                })),
                name: '新增非居民户表',
                theme: 'theme2',
              },
            ]),
            name: '新增非居民户表',
            icon: './assets/icons/factory.png',
          },
        ];
        return echartsList;
      }
    );
  }
  marketing_hb_year(date: string[]) {
    const dateNow = date.map((i) => format(new Date(i), 'yyyy'));
    return Promise.all([this.apiService.marketing_hb_year(dateNow)]).then(
      ([current]) => {
        const hubiao = current.sort((a, b) => a.year_ - b.year_);
        const jumin = hubiao.filter((data) => data.priceno === '居民');
        const feijumin = hubiao.filter((data) => data.priceno !== '居民');

        const feijuminMap: { [key: string]: any } = {};
        const allMap: { [key: string]: any } = {};
        const setAttr = (mapObj: { [key: string]: any }, i: any) => {
          if (!mapObj[i.year_]) {
            mapObj[i.year_] = { date: i.year_, xzyhs: 0 };
          }
          mapObj[i.year_].xzyhs += i.xzyhs || 1;
        };
        hubiao.map((i) => {
          setAttr(allMap, i);
        });
        feijumin.map((i) => {
          setAttr(feijuminMap, i);
        });

        const echartsList = [
          {
            option: getLineOptions([
              {
                unit: '个',
                type: 'bar',
                data: Object.values(allMap).map((i) => ({
                  datatime: i.date,
                  value: i.xzyhs,
                })),
                name: '新增合计',
                theme: 'theme1',
              },
            ]),
            name: '新增合计',
            icon: './assets/icons/company.png',
          },
          {
            option: getLineOptions([
              {
                unit: '个',
                type: 'bar',
                data: jumin.map((i) => ({ datatime: i.year_, value: i.xzyhs })),
                name: '新增居民户表',
                theme: 'theme2',
              },
            ]),
            name: '新增居民户表',
            icon: './assets/icons/factory.png',
          },
          {
            option: getLineOptions([
              {
                unit: '个',
                type: 'bar',
                data: Object.values(feijuminMap).map((i) => ({
                  datatime: i.date,
                  value: i.xzyhs,
                })),
                name: '新增非居民户表',
                theme: 'theme2',
              },
            ]),
            name: '新增非居民户表',
            icon: './assets/icons/factory.png',
          },
        ];
        return echartsList;
      }
    );
  }
  marketing_sf_day(date: string[]) {
    const dateNow = date.map((i) => format(new Date(i), 'yyyyMMdd'));
    return Promise.all([this.apiService.marketing_sf_day(dateNow)]).then(
      ([current]) => {
        const shuifei = current.sort((a, b) => a.ri - b.ri);
        shuifei.map((i) => {
          i.ri = moment(i.ri).format('MM/DD');
        });
        const echartsList = [
          {
            option: getLineOptions([
              {
                unit: '元',
                type: 'bar',
                data: shuifei.map((i) => ({ datatime: i.ri, value: i.yssf })),
                name: '应收水费',
                theme: 'theme2',
                legend: true,
              },
              {
                unit: '',
                type: 'bar',
                data: shuifei.map((i) => ({ datatime: i.ri, value: i.sssf })),
                name: '实收水费',
                theme: 'theme1',
              },
            ]),
            name: '水费',
            icon: './assets/icons/company.png',
          },
          {
            option: getLineOptions([
              {
                unit: '%',
                type: 'line',
                data: shuifei.map((i) => ({
                  datatime: i.ri,
                  value: (
                    Math.round((i.sssf / i.yssf) * 10000) / 100
                  ).toString(),
                })),
                name: '回收率',
                theme: 'theme1',
              },
            ]),
            name: '回收率',
            icon: './assets/icons/factory.png',
          },
        ];
        return echartsList;
      }
    );
  }
  marketing_sf_month(date: string[]) {
    const dateNow = date.map((i) => format(new Date(i), 'yyyyMM'));
    return Promise.all([this.apiService.marketing_sf_month(dateNow)]).then(
      ([current]) => {
        const shuifei = current.sort((a, b) => a.yue - b.yue);
        shuifei.map((i) => {
          i.yue = moment(i.yue).format('YYYY/MM');
        });
        const echartsList = [
          {
            option: getLineOptions([
              {
                unit: '元',
                type: 'bar',
                data: shuifei.map((i) => ({ datatime: i.yue, value: i.yssf })),
                name: '应收水费',
                theme: 'theme2',
                legend: true,
              },
              {
                unit: '',
                type: 'bar',
                data: shuifei.map((i) => ({ datatime: i.yue, value: i.sssf })),
                name: '实收水费',
                theme: 'theme1',
              },
            ]),
            name: '水费',
            icon: './assets/icons/company.png',
          },
          {
            option: getLineOptions([
              {
                unit: '%',
                type: 'line',
                data: shuifei.map((i) => ({
                  datatime: i.yue,
                  value: (
                    Math.round((i.sssf / i.yssf) * 10000) / 100
                  ).toString(),
                })),
                name: '回收率',
                theme: 'theme1',
              },
            ]),
            name: '回收率',
            icon: './assets/icons/factory.png',
          },
        ];
        return echartsList;
      }
    );
  }
  marketing_sf_year(date: string[]) {
    const dateNow = date.map((i) => format(new Date(i), 'yyyy'));
    return Promise.all([this.apiService.marketing_sf_year(dateNow)]).then(
      ([current]) => {
        const shuifei = current.sort((a, b) => a.year_ - b.year_);
        const echartsList = [
          {
            option: getLineOptions([
              {
                unit: '元',
                type: 'bar',
                data: shuifei.map((i) => ({
                  datatime: i.year_,
                  value: i.yssf,
                })),
                name: '应收水费',
                theme: 'theme2',
                legend: true,
              },
              {
                unit: '',
                type: 'bar',
                data: shuifei.map((i) => ({
                  datatime: i.year_,
                  value: i.sssf,
                })),
                name: '实收水费',
                theme: 'theme1',
              },
            ]),
            name: '水费',
            icon: './assets/icons/company.png',
          },
          {
            option: getLineOptions([
              {
                unit: '%',
                type: 'line',
                data: shuifei.map((i) => ({
                  datatime: i.year_,
                  value: (
                    Math.round((i.sssf / i.yssf) * 10000) / 100
                  ).toString(),
                })),
                name: '回收率',
                theme: 'theme1',
              },
            ]),
            name: '回收率',
            icon: './assets/icons/factory.png',
          },
        ];
        return echartsList;
      }
    );
  }
  marketing_qf_day(date: string[]) {
    const dateNow = date.map((i) => format(new Date(i), 'yyyyMMdd'));
    return Promise.all([this.apiService.marketing_qf_day(dateNow)]).then(
      ([current]) => {
        const qianfei = current.sort((a, b) => a.ri - b.ri);
        qianfei.map((i) => {
          i.ri = moment(i.ri).format('MM/DD');
        });
        const echartsList = [
          {
            option: getLineOptions([
              {
                unit: '元',
                type: 'bar',
                data: qianfei.map((i) => ({ datatime: i.ri, value: i.qfje })),
                name: '欠费金额',
                theme: 'theme1',
              },
            ]),
            name: '欠费金额',
            icon: './assets/icons/company.png',
          },
          {
            option: getLineOptions([
              {
                unit: '笔',
                type: 'bar',
                data: qianfei.map((i) => ({ datatime: i.ri, value: i.qfbs })),
                name: '欠费笔数',
                theme: 'theme2',
              },
            ]),
            name: '欠费笔数',
            icon: './assets/icons/factory.png',
          },
          {
            option: getLineOptions([
              {
                unit: 'm³',
                type: 'bar',
                data: qianfei.map((i) => ({ datatime: i.ri, value: i.qfsl })),
                name: '欠费水量',
                theme: 'theme2',
              },
            ]),
            name: '欠费水量',
            icon: './assets/icons/factory.png',
          },
        ];
        return echartsList;
      }
    );
  }
  marketing_qf_month(date: string[]) {
    const dateNow = date.map((i) => format(new Date(i), 'yyyyMM'));
    return Promise.all([this.apiService.marketing_qf_month(dateNow)]).then(
      ([current]) => {
        const qianfei = current.sort((a, b) => a.yue - b.yue);
        qianfei.map((i) => {
          i.yue = moment(i.yue).format('YYYY/MM');
        });
        const echartsList = [
          {
            option: getLineOptions([
              {
                unit: '元',
                type: 'bar',
                data: qianfei.map((i) => ({ datatime: i.yue, value: i.qfje })),
                name: '欠费金额',
                theme: 'theme1',
              },
            ]),
            name: '欠费金额',
            icon: './assets/icons/company.png',
          },
          {
            option: getLineOptions([
              {
                unit: '笔',
                type: 'bar',
                data: qianfei.map((i) => ({ datatime: i.yue, value: i.qfbs })),
                name: '欠费笔数',
                theme: 'theme2',
              },
            ]),
            name: '欠费笔数',
            icon: './assets/icons/factory.png',
          },
          {
            option: getLineOptions([
              {
                unit: 'm³',
                type: 'bar',
                data: qianfei.map((i) => ({ datatime: i.yue, value: i.qfsl })),
                name: '欠费水量',
                theme: 'theme2',
              },
            ]),
            name: '欠费水量',
            icon: './assets/icons/factory.png',
          },
        ];
        return echartsList;
      }
    );
  }
  marketing_qf_year(date: string[]) {
    const dateNow = date.map((i) => format(new Date(i), 'yyyy'));
    return Promise.all([this.apiService.marketing_qf_year(dateNow)]).then(
      ([current]) => {
        const qianfei = current.sort((a, b) => a.year_ - b.year_);
        const echartsList = [
          {
            option: getLineOptions([
              {
                unit: '元',
                type: 'bar',
                data: qianfei.map((i) => ({
                  datatime: i.year_,
                  value: i.qfje,
                })),
                name: '欠费金额',
                theme: 'theme1',
              },
            ]),
            name: '欠费金额',
            icon: './assets/icons/company.png',
          },
          {
            option: getLineOptions([
              {
                unit: '笔',
                type: 'bar',
                data: qianfei.map((i) => ({
                  datatime: i.year_,
                  value: i.qfbs,
                })),
                name: '欠费笔数',
                theme: 'theme2',
              },
            ]),
            name: '欠费笔数',
            icon: './assets/icons/factory.png',
          },
          {
            option: getLineOptions([
              {
                unit: 'm³',
                type: 'bar',
                data: qianfei.map((i) => ({
                  datatime: i.year_,
                  value: i.qfsl,
                })),
                name: '欠费水量',
                theme: 'theme2',
              },
            ]),
            name: '欠费水量',
            icon: './assets/icons/factory.png',
          },
        ];
        return echartsList;
      }
    );
  }
  marketing_cb_day(date: string[]) {
    const dateNow = date.map((i) => format(new Date(i), 'yyyyMMdd'));
    return Promise.all([this.apiService.marketing_cb_day(dateNow)]).then(
      ([current]) => {
        const chaobiao = current.sort((a, b) => a.ri - b.ri);
        chaobiao.map((i) => {
          i.ri = moment(i.ri).format('MM/DD');
        });

        const echartsList = [
          {
            option: getLineOptions([
              {
                unit: '个',
                type: 'bar',
                data: chaobiao.map((i) => ({ datatime: i.ri, value: i.cbs })),
                name: '计划数',
                theme: 'theme2',
                legend: true,
              },
              {
                unit: '',
                type: 'bar',
                data: chaobiao.map((i) => ({ datatime: i.ri, value: i.zccbs })),
                name: '完成数',
                theme: 'theme1',
              },
            ]),
            name: '抄表',
            icon: './assets/icons/company.png',
          },
          {
            option: getLineOptions([
              {
                unit: '%',
                type: 'line',
                data: chaobiao.map((i) => ({
                  datatime: i.ri,
                  value: (
                    Math.round((i.zccbs / i.cbs) * 10000) / 100
                  ).toString(),
                })),
                name: '抄表率',
                theme: 'theme1',
              },
            ]),
            name: '抄表率',
            icon: './assets/icons/factory.png',
          },
        ];
        return echartsList;
      }
    );
  }
  marketing_cb_month(date: string[]) {
    const dateNow = date.map((i) => format(new Date(i), 'yyyyMM'));
    return Promise.all([this.apiService.marketing_cb_month(dateNow)]).then(
      ([current]) => {
        const chaobiao = current.sort((a, b) => a.yue - b.yue);
        chaobiao.map((i) => {
          i.yue = moment(i.yue).format('YYYY/MM');
        });

        const echartsList = [
          {
            option: getLineOptions([
              {
                unit: '个',
                type: 'bar',
                data: chaobiao.map((i) => ({ datatime: i.yue, value: i.cbs })),
                name: '计划数',
                theme: 'theme2',
                legend: true,
              },
              {
                unit: '',
                type: 'bar',
                data: chaobiao.map((i) => ({
                  datatime: i.yue,
                  value: i.zccbs,
                })),
                name: '完成数',
                theme: 'theme1',
              },
            ]),
            name: '抄表',
            icon: './assets/icons/company.png',
          },
          {
            option: getLineOptions([
              {
                unit: '%',
                type: 'line',
                data: chaobiao.map((i) => ({
                  datatime: i.yue,
                  value: (
                    Math.round((i.zccbs / i.cbs) * 10000) / 100
                  ).toString(),
                })),
                name: '抄表率',
                theme: 'theme1',
              },
            ]),
            name: '抄表率',
            icon: './assets/icons/factory.png',
          },
        ];
        return echartsList;
      }
    );
  }
  marketing_cb_year(date: string[]) {
    const dateNow = date.map((i) => format(new Date(i), 'yyyy'));
    return Promise.all([this.apiService.marketing_cb_year(dateNow)]).then(
      ([current]) => {
        const chaobiao = current.sort((a, b) => a.year_ - b.year_);
        const echartsList = [
          {
            option: getLineOptions([
              {
                unit: '个',
                type: 'bar',
                data: chaobiao.map((i) => ({
                  datatime: i.year_,
                  value: i.cbs,
                })),
                name: '计划数',
                theme: 'theme2',
                legend: true,
              },
              {
                unit: '',
                type: 'bar',
                data: chaobiao.map((i) => ({
                  datatime: i.year_,
                  value: i.zccbs,
                })),
                name: '完成数',
                theme: 'theme1',
              },
            ]),
            name: '抄表',
            icon: './assets/icons/company.png',
          },
          {
            option: getLineOptions([
              {
                unit: '%',
                type: 'line',
                data: chaobiao.map((i) => ({
                  datatime: i.year_,
                  value: (
                    Math.round((i.zccbs / i.cbs) * 10000) / 100
                  ).toString(),
                })),
                name: '抄表率',
                theme: 'theme1',
              },
            ]),
            name: '抄表率',
            icon: './assets/icons/factory.png',
          },
        ];
        return echartsList;
      }
    );
  }
  marketing_sl_day(date: string[]) {
    const dateNow = date.map((i) => format(new Date(i), 'yyyyMMdd'));
    return Promise.all([this.apiService.marketing_sl_day(dateNow)]).then(
      ([current]) => {
        const shuiliang = current.sort((a, b) => a.ri - b.ri);
        shuiliang.map((i) => {
          i.ri = moment(i.ri).format('MM/DD');
        });

        const echartsList = [
          {
            option: getLineOptions([
              {
                unit: 'm³',
                type: 'bar',
                data: shuiliang.map((i) => ({
                  datatime: i.ri,
                  value: i.jmssl + i.fjmssl,
                })),
                name: '合计售水量',
                theme: 'theme1',
              },
            ]),
            name: '合计售水量',
            icon: './assets/icons/factory.png',
          },
          {
            option: getLineOptions([
              {
                unit: 'm³',
                type: 'bar',
                data: shuiliang.map((i) => ({
                  datatime: i.ri,
                  value: i.jmssl,
                })),
                name: '居民售水量',
                theme: 'theme2',
              },
            ]),
            name: '居民售水量',
            icon: './assets/icons/company.png',
          },
          {
            option: getLineOptions([
              {
                unit: 'm³',
                type: 'bar',
                data: shuiliang.map((i) => ({
                  datatime: i.ri,
                  value: i.fjmssl,
                })),
                name: '非居民售水量',
                theme: 'theme2',
              },
            ]),
            name: '非居民售水量',
            icon: './assets/icons/factory.png',
          },
        ];
        return echartsList;
      }
    );
  }
  marketing_sl_month(date: string[]) {
    const dateNow = date.map((i) => format(new Date(i), 'yyyyMM'));
    return Promise.all([this.apiService.marketing_sl_month(dateNow)]).then(
      ([current]) => {
        const shuiliang = current.sort((a, b) => a.yue - b.yue);
        shuiliang.map((i) => {
          i.yue = moment(i.yue).format('YYYY/MM');
        });

        const echartsList = [
          {
            option: getLineOptions([
              {
                unit: 'm³',
                type: 'bar',
                data: shuiliang.map((i) => ({
                  datatime: i.yue,
                  value: i.jmssl + i.fjmssl,
                })),
                name: '合计售水量',
                theme: 'theme1',
              },
            ]),
            name: '合计售水量',
            icon: './assets/icons/factory.png',
          },
          {
            option: getLineOptions([
              {
                unit: 'm³',
                type: 'bar',
                data: shuiliang.map((i) => ({
                  datatime: i.yue,
                  value: i.jmssl,
                })),
                name: '居民售水量',
                theme: 'theme2',
              },
            ]),
            name: '居民售水量',
            icon: './assets/icons/company.png',
          },
          {
            option: getLineOptions([
              {
                unit: 'm³',
                type: 'bar',
                data: shuiliang.map((i) => ({
                  datatime: i.yue,
                  value: i.fjmssl,
                })),
                name: '非居民售水量',
                theme: 'theme2',
              },
            ]),
            name: '非居民售水量',
            icon: './assets/icons/factory.png',
          },
        ];
        return echartsList;
      }
    );
  }
  marketing_sl_year(date: string[]) {
    const dateNow = date.map((i) => format(new Date(i), 'yyyy'));
    return Promise.all([this.apiService.marketing_sl_year(dateNow)]).then(
      ([current]) => {
        const shuiliang = current.sort((a, b) => a.year_ - b.year_);
        const echartsList = [
          {
            option: getLineOptions([
              {
                unit: 'm³',
                type: 'bar',
                data: shuiliang.map((i) => ({
                  datatime: i.year_,
                  value: i.jmssl + i.fjmssl,
                })),
                name: '合计售水量',
                theme: 'theme1',
              },
            ]),
            name: '合计售水量',
            icon: './assets/icons/factory.png',
          },
          {
            option: getLineOptions([
              {
                unit: 'm³',
                type: 'bar',
                data: shuiliang.map((i) => ({
                  datatime: i.year_,
                  value: i.jmssl,
                })),
                name: '居民售水量',
                theme: 'theme2',
              },
            ]),
            name: '居民售水量',
            icon: './assets/icons/company.png',
          },
          {
            option: getLineOptions([
              {
                unit: 'm³',
                type: 'bar',
                data: shuiliang.map((i) => ({
                  datatime: i.year_,
                  value: i.fjmssl,
                })),
                name: '非居民售水量',
                theme: 'theme2',
              },
            ]),
            name: '非居民售水量',
            icon: './assets/icons/factory.png',
          },
        ];
        return echartsList;
      }
    );
  }
}
