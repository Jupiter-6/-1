import { Injectable } from '@angular/core';
import { subMonths, subYears, format } from 'date-fns';
import * as moment from 'moment';
import { BiApiService } from '@shared/services/bi-api.service';
import { getLineOptions } from '@shared/components/bi-echarts/echarts-options';

@Injectable({
  providedIn: 'root',
})
export class ProductionChartsResolverService {
  [key: string]: any;
  constructor(private apiService: BiApiService) { }

  production_yl_day(date: string[], factory: string) {
    const dateNow = date.map((i) => format(new Date(i), 'yyyyMMdd'));
    return Promise.all([
      this.apiService.production_yl_day(dateNow, factory),
    ]).then(([current]) => {
      const data = current.sort((a, b) => a.vdate - b.vdate);
      data.map((i) => {
        i.vdate = moment(i.vdate).format('MM/DD');
      });
      const echartsList = [
        {
          option: getLineOptions([
            {
              unit: 'Mpa',
              type: 'line',
              data: data.map((i) => ({ datatime: i.vdate, value: parseFloat(i.zgccsyl).toFixed(3) })),
              name: '最大值',
              theme: 'theme1',
            },
            {
              unit: '',
              type: 'line',
              data: data.map((i) => ({ datatime: i.vdate, value: parseFloat(i.ccsyl).toFixed(3) })),
              name: '平均值',
              theme: 'theme2',
            },
            {
              unit: '',
              type: 'line',
              data: data.map((i) => ({ datatime: i.vdate, value: parseFloat(i.zdccsyl).toFixed(3) })),
              name: '最低值',
              theme: 'theme3',
            },
          ]),
          name: factory,
          icon: './assets/icons/factory.png',
        },
      ];
      return echartsList;
    });
  }
  production_yl_month(date: string[], factory: string) {
    const dateNow = date.map((i) => format(new Date(i), 'yyyyMM'));
    return Promise.all([
      this.apiService.production_yl_month(dateNow, factory),
    ]).then(([current]) => {
      const data = current.sort((a, b) => a.yue - b.yue);
      data.map((i) => {
        i.yue = moment(i.yue).format('YYYY/MM');
      });
      const echartsList = [
        {
          option: getLineOptions([
            {
              unit: 'Mpa',
              type: 'line',
              data: data.map((i) => ({ datatime: i.yue, value: parseFloat(i.zgccsyl).toFixed(3) })),
              name: '最大值',
              theme: 'theme1',
            },
            {
              unit: '',
              type: 'line',
              data: data.map((i) => ({ datatime: i.yue, value: parseFloat(i.ccsyl).toFixed(3) })),
              name: '平均值',
              theme: 'theme2',
            },
            {
              unit: '',
              type: 'line',
              data: data.map((i) => ({ datatime: i.yue, value: parseFloat(i.zdccsyl).toFixed(3) })),
              name: '最低值',
              theme: 'theme3',
            },
          ]),
          name: factory,
          icon: './assets/icons/factory.png',
        },
      ];
      return echartsList;
    });
  }
  production_yl_year(date: string[], factory: string) {
    const dateNow = date.map((i) => format(new Date(i), 'yyyy'));
    return Promise.all([
      this.apiService.production_yl_year(dateNow, factory),
    ]).then(([current]) => {
      const data = current.sort((a, b) => a.year_ - b.year_);
      const echartsList = [
        {
          option: getLineOptions([
            {
              unit: 'Mpa',
              type: 'line',
              data: data.map((i) => ({ datatime: i.year_, value: parseFloat(i.zgccsyl).toFixed(3) })),
              name: '最大值',
              theme: 'theme1',
            },
            {
              unit: '',
              type: 'line',
              data: data.map((i) => ({ datatime: i.year_, value: parseFloat(i.ccsyl).toFixed(3) })),
              name: '平均值',
              theme: 'theme2',
            },
            {
              unit: '',
              type: 'line',
              data: data.map((i) => ({ datatime: i.year_, value: parseFloat(i.zdccsyl).toFixed(3) })),
              name: '最低值',
              theme: 'theme3',
            },
          ]),
          name: factory,
          icon: './assets/icons/factory.png',
        },
      ];
      return echartsList;
    });
  }
  production_zd_day(date: string[], factory: string) {
    const dateNow = date.map((i) => format(new Date(i), 'yyyyMMdd'));
    return Promise.all([
      this.apiService.production_zd_day(dateNow, factory),
    ]).then(([current]) => {
      const data = current.sort((a, b) => a.vdate - b.vdate);
      data.map((i) => {
        i.vdate = moment(i.vdate).format('MM/DD');
      });
      const echartsList = [
        {
          option: getLineOptions([
            {
              unit: 'NTU',
              type: 'line',
              data: data.map((i) => ({ datatime: i.vdate, value: parseFloat(i.zgccszd).toFixed(3) })),
              name: '最大值',
              theme: 'theme1',
            },
            {
              unit: '',
              type: 'line',
              data: data.map((i) => ({ datatime: i.vdate, value: parseFloat(i.ccszd).toFixed(3) })),
              name: '平均值',
              theme: 'theme2',
            },
            {
              unit: '',
              type: 'line',
              data: data.map((i) => ({ datatime: i.vdate, value: parseFloat(i.zdccszd).toFixed(3) })),
              name: '最小值',
              theme: 'theme3',
            },
          ]),
          name: factory,
          icon: './assets/icons/factory.png',
        },
      ];
      return echartsList;
    });
  }
  production_zd_month(date: string[], factory: string) {
    const dateNow = date.map((i) => format(new Date(i), 'yyyyMM'));
    return Promise.all([
      this.apiService.production_zd_month(dateNow, factory),
    ]).then(([current]) => {
      const data = current.sort((a, b) => a.yue - b.yue);
      data.map((i) => {
        i.yue = moment(i.yue).format('YYYY/MM');
      });
      const echartsList = [
        {
          option: getLineOptions([
            {
              unit: 'NTU',
              type: 'line',
              data: data.map((i) => ({ datatime: i.yue, value: parseFloat(i.zgccszd).toFixed(3) })),
              name: '最大值',
              theme: 'theme1',
            },
            {
              unit: '',
              type: 'line',
              data: data.map((i) => ({ datatime: i.yue, value: parseFloat(i.ccszd).toFixed(3) })),
              name: '平均值',
              theme: 'theme2',
            },
            {
              unit: '',
              type: 'line',
              data: data.map((i) => ({ datatime: i.yue, value: parseFloat(i.zdccszd).toFixed(3) })),
              name: '最小值',
              theme: 'theme3',
            },
          ]),
          name: factory,
          icon: './assets/icons/factory.png',
        },
      ];
      return echartsList;
    });
  }
  production_zd_year(date: string[], factory: string) {
    const dateNow = date.map((i) => format(new Date(i), 'yyyy'));
    return Promise.all([
      this.apiService.production_zd_year(dateNow, factory),
    ]).then(([current]) => {
      const data = current.sort((a, b) => a.year_ - b.year_);
      const echartsList = [
        {
          option: getLineOptions([
            {
              unit: 'NTU',
              type: 'line',
              data: data.map((i) => ({ datatime: i.year_, value: parseFloat(i.zgccszd).toFixed(3) })),
              name: '最大值',
              theme: 'theme1',
            },
            {
              unit: '',
              type: 'line',
              data: data.map((i) => ({ datatime: i.year_, value: parseFloat(i.ccszd).toFixed(3) })),
              name: '平均值',
              theme: 'theme2',
            },
            {
              unit: '',
              type: 'line',
              data: data.map((i) => ({ datatime: i.year_, value: parseFloat(i.zdccszd).toFixed(3) })),
              name: '最小值',
              theme: 'theme3',
            },
          ]),
          name: factory,
          icon: './assets/icons/factory.png',
        },
      ];
      return echartsList;
    });
  }
  production_yul_day(date: string[], factory: string) {
    const dateNow = date.map((i) => format(new Date(i), 'yyyyMMdd'));
    return Promise.all([
      this.apiService.production_yul_day(dateNow, factory),
    ]).then(([current]) => {
      const data = current.sort((a, b) => a.vdate - b.vdate);
      data.map((i) => {
        i.vdate = moment(i.vdate).format('MM/DD');
      });
      const echartsList = [
        {
          option: getLineOptions([
            {
              unit: 'mg/L',
              type: 'line',
              data: data.map((i) => ({ datatime: i.vdate, value: parseFloat(i.zgccsyul).toFixed(3) })),
              name: '最大值',
              theme: 'theme1',
            },
            {
              unit: '',
              type: 'line',
              data: data.map((i) => ({ datatime: i.vdate, value: parseFloat(i.ccsyul).toFixed(3) })),
              name: '平均值',
              theme: 'theme2',
            },
            {
              unit: '',
              type: 'line',
              data: data.map((i) => ({ datatime: i.vdate, value: parseFloat(i.zdccsyul).toFixed(3) })),
              name: '最小值',
              theme: 'theme3',
            },
          ]),
          name: factory,
          icon: './assets/icons/factory.png',
        },
      ];
      return echartsList;
    });
  }
  production_yul_month(date: string[], factory: string) {
    const dateNow = date.map((i) => format(new Date(i), 'yyyyMM'));
    return Promise.all([
      this.apiService.production_yul_month(dateNow, factory),
    ]).then(([current]) => {
      const data = current.sort((a, b) => a.yue - b.yue);
      data.map((i) => {
        i.yue = moment(i.yue).format('YYYY/MM');
      });
      const echartsList = [
        {
          option: getLineOptions([
            {
              unit: 'mg/L',
              type: 'line',
              data: data.map((i) => ({ datatime: i.yue, value: parseFloat(i.zgccsyul).toFixed(3) })),
              name: '最大值',
              theme: 'theme1',
            },
            {
              unit: '',
              type: 'line',
              data: data.map((i) => ({ datatime: i.yue, value: parseFloat(i.ccsyul).toFixed(3) })),
              name: '平均值',
              theme: 'theme2',
            },
            {
              unit: '',
              type: 'line',
              data: data.map((i) => ({ datatime: i.yue, value: parseFloat(i.zdccsyul).toFixed(3) })),
              name: '最小值',
              theme: 'theme3',
            },
          ]),
          name: factory,
          icon: './assets/icons/factory.png',
        },
      ];
      return echartsList;
    });
  }
  production_yul_year(date: string[], factory: string) {
    const dateNow = date.map((i) => format(new Date(i), 'yyyy'));
    return Promise.all([
      this.apiService.production_yul_year(dateNow, factory),
    ]).then(([current]) => {
      const data = current.sort((a, b) => a.year_ - b.year_);
      const echartsList = [
        {
          option: getLineOptions([
            {
              unit: 'mg/L',
              type: 'line',
              data: data.map((i) => ({ datatime: i.year_, value: parseFloat(i.zgccsyul).toFixed(3) })),
              name: '最大值',
              theme: 'theme1',
            },
            {
              unit: '',
              type: 'line',
              data: data.map((i) => ({ datatime: i.year_, value: parseFloat(i.ccsyul).toFixed(3) })),
              name: '平均值',
              theme: 'theme2',
            },
            {
              unit: '',
              type: 'line',
              data: data.map((i) => ({ datatime: i.year_, value: parseFloat(i.zdccsyul).toFixed(3) })),
              name: '最小值',
              theme: 'theme3',
            },
          ]),
          name: factory,
          icon: './assets/icons/factory.png',
        },
      ];
      return echartsList;
    });
  }
  production_ph_day(date: string[], factory: string) {
    const dateNow = date.map((i) => format(new Date(i), 'yyyyMMdd'));
    return Promise.all([
      this.apiService.production_ph_day(dateNow, factory),
    ]).then(([current]) => {
      const data = current.sort((a, b) => a.vdate - b.vdate);
      data.map((i) => {
        i.vdate = moment(i.vdate).format('MM/DD');
      });
      const echartsList = [
        {
          option: getLineOptions([
            {
              unit: '',
              type: 'line',
              data: data.map((i) => ({ datatime: i.vdate, value: parseFloat(i.zgccsph).toFixed(3) })),
              name: '最大值',
              theme: 'theme1',
            },
            {
              unit: '',
              type: 'line',
              data: data.map((i) => ({ datatime: i.vdate, value: parseFloat(i.ccsph).toFixed(3) })),
              name: '平均值',
              theme: 'theme2',
            },
            {
              unit: '',
              type: 'line',
              data: data.map((i) => ({ datatime: i.vdate, value: parseFloat(i.zdccsph).toFixed(3) })),
              name: '最小值',
              theme: 'theme3',
            },
          ]),
          name: factory,
          icon: './assets/icons/factory.png',
        },
      ];
      return echartsList;
    });
  }
  production_ph_month(date: string[], factory: string) {
    const dateNow = date.map((i) => format(new Date(i), 'yyyyMM'));
    return Promise.all([
      this.apiService.production_ph_month(dateNow, factory),
    ]).then(([current]) => {
      const data = current.sort((a, b) => a.yue - b.yue);
      data.map((i) => {
        i.yue = moment(i.yue).format('YYYY/MM');
      });
      const echartsList = [
        {
          option: getLineOptions([
            {
              unit: '',
              type: 'line',
              data: data.map((i) => ({ datatime: i.yue, value: parseFloat(i.zgccsph).toFixed(3) })),
              name: '最大值',
              theme: 'theme1',
            },
            {
              unit: '',
              type: 'line',
              data: data.map((i) => ({ datatime: i.yue, value: parseFloat(i.ccsph).toFixed(3) })),
              name: '平均值',
              theme: 'theme2',
            },
            {
              unit: '',
              type: 'line',
              data: data.map((i) => ({ datatime: i.yue, value: parseFloat(i.zdccsph).toFixed(3) })),
              name: '最小值',
              theme: 'theme3',
            },
          ]),
          name: factory,
          icon: './assets/icons/factory.png',
        },
      ];
      return echartsList;
    });
  }
  production_ph_year(date: string[], factory: string) {
    const dateNow = date.map((i) => format(new Date(i), 'yyyy'));
    return Promise.all([
      this.apiService.production_ph_year(dateNow, factory),
    ]).then(([current]) => {
      const data = current.sort((a, b) => a.year_ - b.year_);
      const echartsList = [
        {
          option: getLineOptions([
            {
              unit: '',
              type: 'line',
              data: data.map((i) => ({ datatime: i.year_, value: parseFloat(i.zgccsph).toFixed(3) })),
              name: '最大值',
              theme: 'theme1',
            },
            {
              unit: '',
              type: 'line',
              data: data.map((i) => ({ datatime: i.year_, value: parseFloat(i.ccsph).toFixed(3) })),
              name: '平均值',
              theme: 'theme2',
            },
            {
              unit: '',
              type: 'line',
              data: data.map((i) => ({ datatime: i.year_, value: parseFloat(i.zdccsph).toFixed(3) })),
              name: '最小值',
              theme: 'theme3',
            },
          ]),
          name: factory,
          icon: './assets/icons/factory.png',
        },
      ];
      return echartsList;
    });
  }
}
