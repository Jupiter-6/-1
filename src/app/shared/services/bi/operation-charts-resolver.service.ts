import { Injectable } from '@angular/core';
import { subMonths, subYears, format } from 'date-fns';
import * as moment from 'moment';
import { BiApiService } from '@shared/services/bi-api.service';
import { getLineOptions } from '@shared/components/bi-echarts/echarts-options';

const companies = ["西郊水厂", "金岭水厂", "东风水厂", "沣水水厂", "张店水厂", "新城水库", "新城净水厂", "石桥配水厂", "南定水厂", "湖田水厂", "黄士崖泵站"];
@Injectable({
  providedIn: 'root',
})
export class OperationChartsResolverService {
  [key: string]: any;
  constructor(private apiService: BiApiService) { }

  operation_gsl_day(date: string[]) {
    const dateNow = date.map((i) => format(new Date(i), 'yyyyMMdd'));
    const dateSubMonths = date.map((i) =>
      format(subMonths(new Date(i), 1), 'yyyyMMdd')
    );
    return Promise.all([
      this.apiService.operation_gsl_day(dateNow),
      this.apiService.operation_gsl_day(dateSubMonths),
    ]).then(([current, sub]) => {
      const all = this.operation_gsl_day_paser(
        current.filter((i) => {
          return companies.includes(i.factory);
        }),
        sub.filter((i) => {
          return companies.includes(i.factory);
        })
      );

      const companyData = companies.map(company => {
        return {
          company,
          ...this.operation_gsl_day_paser(
            current.filter((i) => {
              return i.factory === company;
            }),
            sub.filter((i) => {
              return i.factory === company;
            })
          )
        }
      })
      const echartsList = [
        {
          option: getLineOptions([
            {
              unit: '万吨',
              type: 'bar',
              data: all.daySummary,
              name: '供水量',
              theme: 'theme3',
            },
            {
              unit: '%',
              type: 'line',
              data: all.dayRateList,
              name: '环比',
              theme: 'theme2',
              yAxisIndex: 1,
            },
          ]),
          name: '公司供水量',
          icon: './assets/icons/company.png',
        },
        ...companyData.map(data => {
          return {
            option: getLineOptions([
              {
                unit: '万吨',
                type: 'bar',
                data: data.daySummary,
                name: '供水量',
                theme: 'theme3',
              },
              {
                unit: '%',
                type: 'line',
                data: data.dayRateList,
                name: '环比',
                theme: 'theme2',
                yAxisIndex: 1,
              },
            ]),
            name: data.company + '供水量',
            icon: './assets/icons/factory.png',
          }
        })
      ];
      return echartsList;
    });
  }
  operation_gsl_month(date: string[]) {
    const dateNow = date.map((i) => format(new Date(i), 'yyyyMM'));
    const dateSubYears = date.map((i) =>
      format(subYears(new Date(i), 1), 'yyyyMMdd')
    );
    return Promise.all([
      this.apiService.operation_gsl_month(dateNow),
      this.apiService.operation_gsl_month(dateSubYears),
    ]).then(([current, sub]) => {
      const all = this.operation_gsl_month_paser(
        current.filter((i) => {
          return companies.includes(i.factory);
        }),
        sub.filter((i) => {
          return companies.includes(i.factory);
        })
      );
      const companyData = companies.map(company => {
        return {
          company,
          ...this.operation_gsl_month_paser(
            current.filter((i) => {
              return i.factory === company;
            }),
            sub.filter((i) => {
              return i.factory === company;
            })
          )
        }
      })
      const echartsList = [
        {
          option: getLineOptions([
            {
              unit: '万吨',
              type: 'bar',
              data: all.daySummary,
              name: '供水量',
              theme: 'theme3',
            },
            {
              unit: '%',
              type: 'line',
              data: all.dayRateList,
              name: '同比',
              theme: 'theme2',
              yAxisIndex: 1,
            },
          ]),
          name: '公司供水量',
          icon: './assets/icons/company.png',
        },
        ...companyData.map(data => {
          return {
            option: getLineOptions([
              {
                unit: '万吨',
                type: 'bar',
                data: data.daySummary,
                name: '供水量',
                theme: 'theme3',
              },
              {
                unit: '%',
                type: 'line',
                data: data.dayRateList,
                name: '环比',
                theme: 'theme2',
                yAxisIndex: 1,
              },
            ]),
            name: data.company + '供水量',
            icon: './assets/icons/factory.png',
          }
        })
      ];
      return echartsList;
    });
  }
  operation_gsl_year(date: string[]) {
    const dateNow = date.map((i) => format(new Date(i), 'yyyy'));
    return Promise.all([this.apiService.operation_gsl_year(dateNow)]).then(
      ([current]) => {
        const all = this.operation_gsl_year_paser(
          current.filter((i) => {
            return companies.includes(i.factory);
          })
        );


        const companyData = companies.map(company => {
          return {
            company,
            ...this.operation_gsl_year_paser(
              current.filter((i) => {
                return i.factory === company;
              })
            )
          }
        })

        const echartsList = [
          {
            option: getLineOptions([
              {
                unit: '万吨',
                type: 'bar',
                data: all.daySummary,
                name: '供水量',
                theme: 'theme3',
              },
            ]),
            name: '公司供水量',
            icon: './assets/icons/company.png',
          },
          ...companyData.map(data => {
            return {
              option: getLineOptions([
                {
                  unit: '万吨',
                  type: 'bar',
                  data: data.daySummary,
                  name: '供水量',
                  theme: 'theme3',
                },
              ]),
              name: data.company + '供水量',
              icon: './assets/icons/factory.png',
            }
          })
        ];
        return echartsList;
      }
    );
  }
  operation_ydl_day(date: string[]) {
    const dateNow = date.map((i) => format(new Date(i), 'yyyyMMdd'));
    const dateSubMonths = date.map((i) =>
      format(subMonths(new Date(i), 1), 'yyyyMMdd')
    );
    return Promise.all([
      this.apiService.operation_ydl_day(dateNow),
      this.apiService.operation_ydl_day(dateSubMonths),
    ]).then(([current, sub]) => {
      const all = this.operation_ydl_day_paser(
        current.filter((i) => {
          return companies.includes(i.factory);
        }),
        sub.filter((i) => {
          return companies.includes(i.factory);
        })
      );

      const companyData = companies.map(company => {
        return {
          company,
          ...this.operation_ydl_day_paser(
            current.filter((i) => {
              return i.factory === company;
            }),
            sub.filter((i) => {
              return i.factory === company;
            })
          )
        }
      })


      const echartsList = [
        {
          option: getLineOptions([
            {
              unit: 'Kwh',
              type: 'bar',
              data: all.daySummary,
              name: '用电量',
              theme: 'theme3',
            },
            {
              unit: '%',
              type: 'line',
              data: all.dayRateList,
              name: '环比',
              theme: 'theme2',
              yAxisIndex: 1,
            },
          ]),
          name: '公司用电量',
          icon: './assets/icons/company.png',
        },

        ...companyData.map(data => {
          return {
            option: getLineOptions([
              {
                unit: 'Kwh',
                type: 'bar',
                data: data.daySummary,
                name: '用电量',
                theme: 'theme3',
              },
              {
                unit: '%',
                type: 'line',
                data: data.dayRateList,
                name: '环比',
                theme: 'theme2',
                yAxisIndex: 1,
              },
            ]),
            name: data.company + '用电量',
            icon: './assets/icons/factory.png',
          }
        })
      ];
      return echartsList;
    });
  }
  operation_ydl_month(date: string[]) {
    const dateNow = date.map((i) => format(new Date(i), 'yyyyMM'));
    const dateSubYears = date.map((i) =>
      format(subYears(new Date(i), 1), 'yyyyMMdd')
    );
    return Promise.all([
      this.apiService.operation_ydl_month(dateNow),
      this.apiService.operation_ydl_month(dateSubYears),
    ]).then(([current, sub]) => {
      const all = this.operation_ydl_month_paser(
        current.filter((i) => {
          return companies.includes(i.factory);
        }),
        sub.filter((i) => {
          return companies.includes(i.factory);
        })
      );

      const companyData = companies.map(company => {
        return {
          company,
          ...this.operation_ydl_month_paser(
            current.filter((i) => {
              return i.factory === company;
            }),
            sub.filter((i) => {
              return i.factory === company;
            })
          )
        }
      })

      const echartsList = [
        {
          option: getLineOptions([
            {
              unit: 'Kwh',
              type: 'bar',
              data: all.daySummary,
              name: '用电量',
              theme: 'theme3',
            },
            {
              unit: '%',
              type: 'line',
              data: all.dayRateList,
              name: '同比',
              theme: 'theme2',
              yAxisIndex: 1,
            },
          ]),
          name: '公司用电量',
          icon: './assets/icons/company.png',
        },
        ...companyData.map(data => {
          return {
            option: getLineOptions([
              {
                unit: 'Kwh',
                type: 'bar',
                data: data.daySummary,
                name: '用电量',
                theme: 'theme3',
              },
              {
                unit: '%',
                type: 'line',
                data: data.dayRateList,
                name: '环比',
                theme: 'theme2',
                yAxisIndex: 1,
              },
            ]),
            name: data.company + '用电量',
            icon: './assets/icons/factory.png',
          }
        })
      ];
      return echartsList;
    });
  }
  operation_ydl_year(date: string[]) {
    const dateNow = date.map((i) => format(new Date(i), 'yyyy'));
    return Promise.all([this.apiService.operation_ydl_year(dateNow)]).then(
      ([current]) => {
        const all = this.operation_ydl_year_paser(
          current.filter((i) => {
            return companies.includes(i.factory);
          })
        );

        const companyData = companies.map(company => {
          return {
            company,
            ...this.operation_ydl_year_paser(
              current.filter((i) => {
                return i.factory === company;
              })
            )
          }
        })

        const echartsList = [
          {
            option: getLineOptions([
              {
                unit: 'Kwh',
                type: 'bar',
                data: all.daySummary,
                name: '用电量',
                theme: 'theme3',
              },
            ]),
            name: '公司用电量',
            icon: './assets/icons/company.png',
          },
          ...companyData.map(data => {
            return {
              option: getLineOptions([
                {
                  unit: 'Kwh',
                  type: 'bar',
                  data: data.daySummary,
                  name: '用电量',
                  theme: 'theme3',
                },
              ]),
              name: data.company + '用电量',
              icon: './assets/icons/factory.png',
            }
          })
        ];
        return echartsList;
      }
    );
  }
  operation_power_day(date: string[]) {
    const dateNow = date.map((i) => format(new Date(i), 'yyyyMMdd'));
    const dateSubMonths = date.map((i) =>
      format(subMonths(new Date(i), 1), 'yyyyMMdd')
    );
    return Promise.all([
      this.apiService.operation_power_day(dateNow),
      this.apiService.operation_power_day(dateSubMonths),
    ]).then(([current, sub]) => {
      const allList = ['生产类', '二次供水', '增管所', '办公用电'];
      const all = this.operation_power_day_paser(
        current.filter((i) => {
          return allList.includes(i.type);
        }),
        sub.filter((i) => {
          return allList.includes(i.type);
        })
      );
      const shengchan = this.operation_power_day_paser(
        current.filter((i) => {
          return i.type === '生产类';
        }),
        sub.filter((i) => {
          return i.type === '生产类';
        })
      );
      const sws = this.operation_power_day_paser(
        current.filter((i) => {
          return i.type === '二次供水';
        }),
        sub.filter((i) => {
          return i.type === '二次供水';
        })
      );
      const zengya = this.operation_power_day_paser(
        current.filter((i) => {
          return i.type === '增管所';
        }),
        sub.filter((i) => {
          return i.type === '增管所';
        })
      );
      const bangong = this.operation_power_day_paser(
        current.filter((i) => {
          return i.type === '办公用电';
        }),
        sub.filter((i) => {
          return i.type === '办公用电';
        })
      );

      const echartsList = [
        {
          option: getLineOptions([
            {
              unit: 'Kwh',
              type: 'bar',
              data: all.daySummary,
              name: '能耗',
              theme: 'theme3',
            },
            {
              unit: '%',
              type: 'line',
              data: all.dayRateList,
              name: '环比',
              theme: 'theme2',
              yAxisIndex: 1,
            },
          ]),
          name: '公司能耗',
          icon: './assets/icons/company.png',
        },
        {
          option: getLineOptions([
            {
              unit: 'Kwh',
              type: 'bar',
              data: shengchan.daySummary,
              name: '能耗',
              theme: 'theme3',
            },
            {
              unit: '%',
              type: 'line',
              data: shengchan.dayRateList,
              name: '环比',
              theme: 'theme2',
              yAxisIndex: 1,
            },
          ]),
          name: '生产类能耗',
          icon: './assets/icons/factory.png',
        },
        {
          option: getLineOptions([
            {
              unit: 'Kwh',
              type: 'bar',
              data: sws.daySummary,
              name: '能耗',
              theme: 'theme3',
            },
            {
              unit: '%',
              type: 'line',
              data: sws.dayRateList,
              name: '环比',
              theme: 'theme2',
              yAxisIndex: 1,
            },
          ]),
          name: '二次供水能耗',
          icon: './assets/icons/factory.png',
        },
        {
          option: getLineOptions([
            {
              unit: 'Kwh',
              type: 'bar',
              data: zengya.daySummary,
              name: '能耗',
              theme: 'theme3',
            },
            {
              unit: '%',
              type: 'line',
              data: zengya.dayRateList,
              name: '环比',
              theme: 'theme2',
              yAxisIndex: 1,
            },
          ]),
          name: '增管所能耗',
          icon: './assets/icons/factory.png',
        },
        {
          option: getLineOptions([
            {
              unit: 'Kwh',
              type: 'bar',
              data: bangong.daySummary,
              name: '能耗',
              theme: 'theme3',
            },
            {
              unit: '%',
              type: 'line',
              data: bangong.dayRateList,
              name: '环比',
              theme: 'theme2',
              yAxisIndex: 1,
            },
          ]),
          name: '办公用电能耗',
          icon: './assets/icons/factory.png',
        },
      ];
      return echartsList;
    });
  }
  operation_power_month(date: string[]) {
    const dateNow = date.map((i) => format(new Date(i), 'yyyyMM'));
    const dateSubYears = date.map((i) =>
      format(subYears(new Date(i), 1), 'yyyyMMdd')
    );
    return Promise.all([
      this.apiService.operation_power_month(dateNow),
      this.apiService.operation_power_month(dateSubYears),
    ]).then(([current, sub]) => {
      const allList = ['生产类', '二次供水', '增管所', '办公用电'];
      const all = this.operation_power_month_paser(
        current.filter((i) => {
          return allList.includes(i.type);
        }),
        sub.filter((i) => {
          return allList.includes(i.type);
        })
      );
      const shengchan = this.operation_power_month_paser(
        current.filter((i) => {
          return i.type === '生产类';
        }),
        sub.filter((i) => {
          return i.type === '生产类';
        })
      );
      const sws = this.operation_power_month_paser(
        current.filter((i) => {
          return i.type === '二次供水';
        }),
        sub.filter((i) => {
          return i.type === '二次供水';
        })
      );
      const zengya = this.operation_power_month_paser(
        current.filter((i) => {
          return i.type === '增管所';
        }),
        sub.filter((i) => {
          return i.type === '增管所';
        })
      );
      const bangong = this.operation_power_month_paser(
        current.filter((i) => {
          return i.type === '办公用电';
        }),
        sub.filter((i) => {
          return i.type === '办公用电';
        })
      );

      const echartsList = [
        {
          option: getLineOptions([
            {
              unit: 'Kwh',
              type: 'bar',
              data: all.daySummary,
              name: '能耗',
              theme: 'theme3',
            },
            {
              unit: '%',
              type: 'line',
              data: all.dayRateList,
              name: '同比',
              theme: 'theme2',
              yAxisIndex: 1,
            },
          ]),
          name: '公司能耗',
          icon: './assets/icons/company.png',
        },
        {
          option: getLineOptions([
            {
              unit: 'Kwh',
              type: 'bar',
              data: shengchan.daySummary,
              name: '能耗',
              theme: 'theme3',
            },
            {
              unit: '%',
              type: 'line',
              data: shengchan.dayRateList,
              name: '同比',
              theme: 'theme2',
              yAxisIndex: 1,
            },
          ]),
          name: '生产类能耗',
          icon: './assets/icons/factory.png',
        },
        {
          option: getLineOptions([
            {
              unit: 'Kwh',
              type: 'bar',
              data: sws.daySummary,
              name: '能耗',
              theme: 'theme3',
            },
            {
              unit: '%',
              type: 'line',
              data: sws.dayRateList,
              name: '同比',
              theme: 'theme2',
              yAxisIndex: 1,
            },
          ]),
          name: '二次供水能耗',
          icon: './assets/icons/factory.png',
        },
        {
          option: getLineOptions([
            {
              unit: 'Kwh',
              type: 'bar',
              data: zengya.daySummary,
              name: '能耗',
              theme: 'theme3',
            },
            {
              unit: '%',
              type: 'line',
              data: zengya.dayRateList,
              name: '同比',
              theme: 'theme2',
              yAxisIndex: 1,
            },
          ]),
          name: '增管所能耗',
          icon: './assets/icons/factory.png',
        },
        {
          option: getLineOptions([
            {
              unit: 'Kwh',
              type: 'bar',
              data: bangong.daySummary,
              name: '能耗',
              theme: 'theme3',
            },
            {
              unit: '%',
              type: 'line',
              data: bangong.dayRateList,
              name: '同比',
              theme: 'theme2',
              yAxisIndex: 1,
            },
          ]),
          name: '办公用电能耗',
          icon: './assets/icons/factory.png',
        },
      ];
      return echartsList;
    });
  }
  operation_power_year(date: string[]) {
    const dateNow = date.map((i) => format(new Date(i), 'yyyy'));
    return Promise.all([this.apiService.operation_power_year(dateNow)]).then(
      ([current]) => {
        const allList = ['生产类', '二次供水', '增管所', '办公用电'];
        const all = this.operation_power_year_paser(
          current.filter((i) => {
            return allList.includes(i.type);
          })
        );
        const shengchan = this.operation_power_year_paser(
          current.filter((i) => {
            return i.type === '生产类';
          })
        );
        const sws = this.operation_power_year_paser(
          current.filter((i) => {
            return i.type === '二次供水';
          })
        );
        const zengya = this.operation_power_year_paser(
          current.filter((i) => {
            return i.type === '增管所';
          })
        );
        const bangong = this.operation_power_year_paser(
          current.filter((i) => {
            return i.type === '办公用电';
          })
        );

        const echartsList = [
          {
            option: getLineOptions([
              {
                unit: 'Kwh',
                type: 'bar',
                data: all.daySummary,
                name: '能耗',
                theme: 'theme3',
              },
            ]),
            name: '公司能耗',
            icon: './assets/icons/company.png',
          },
          {
            option: getLineOptions([
              {
                unit: 'Kwh',
                type: 'bar',
                data: shengchan.daySummary,
                name: '能耗',
                theme: 'theme3',
              },
            ]),
            name: '生产类能耗',
            icon: './assets/icons/factory.png',
          },
          {
            option: getLineOptions([
              {
                unit: 'Kwh',
                type: 'bar',
                data: sws.daySummary,
                name: '能耗',
                theme: 'theme3',
              },
            ]),
            name: '二次供水能耗',
            icon: './assets/icons/factory.png',
          },
          {
            option: getLineOptions([
              {
                unit: 'Kwh',
                type: 'bar',
                data: zengya.daySummary,
                name: '能耗',
                theme: 'theme3',
              },
            ]),
            name: '增管所能耗',
            icon: './assets/icons/factory.png',
          },
          {
            option: getLineOptions([
              {
                unit: 'Kwh',
                type: 'bar',
                data: bangong.daySummary,
                name: '能耗',
                theme: 'theme3',
              },
            ]),
            name: '办公用电能耗',
            icon: './assets/icons/factory.png',
          },
        ];
        return echartsList;
      }
    );
  }

  private operation_gsl_day_paser(current: any[], sub: any[]) {
    const currentMap: { [key: string]: any } = {};
    const subMap: { [key: string]: any } = {};
    const setAttr = (mapObj: { [key: string]: any }, i: any) => {
      if (!mapObj[i.vdate]) {
        mapObj[i.vdate] = { date: i.vdate, csl: 0 };
      }
      mapObj[i.vdate].csl += i.csl;
    };

    current.map((i) => {
      setAttr(currentMap, i);
    });
    sub.map((i) => {
      setAttr(subMap, i);
    });

    const rateList: any[] = [];
    Object.values(currentMap).map((item) => {
      item.csl = Math.round(item.csl * 100) / 100;
      const subKey = moment(item.date).subtract(1, 'months').format('YYYYMMDD');
      item.date = moment(item.date).format('MM/DD');
      const subitem = subMap[subKey];
      if (subitem) {
        rateList.push({
          datatime: item.date,
          value: Math.round(((item.csl - subitem.csl) / subitem.csl) * 10000) / 100,
        });
      } else {
        rateList.push({
          datatime: item.date,
          value: null,
        });
      }
    });

    return {
      dayRateList: rateList.sort((a, b) => +a.datatime - +b.datatime),
      daySummary: Object.values(currentMap).map((item) => ({
        datatime: item.date,
        value: item.csl,
      })),
    };
  }
  private operation_gsl_month_paser(current: any[], sub: any[]) {
    const currentMap: { [key: string]: any } = {};
    const subMap: { [key: string]: any } = {};
    const setAttr = (mapObj: { [key: string]: any }, i: any) => {
      if (!mapObj[i.yue]) {
        mapObj[i.yue] = { date: i.yue, csl: 0 };
      }
      mapObj[i.yue].csl += i.csl;
    };

    current.map((i) => {
      setAttr(currentMap, i);
    });
    sub.map((i) => {
      setAttr(subMap, i);
    });

    const rateList: any[] = [];
    Object.values(currentMap).map((item) => {
      item.csl = Math.round(item.csl * 100) / 100;
      const subKey = moment(item.date).subtract(1, 'years').format('YYYYMM');
      item.date = moment(item.date).format('YYYY/MM');
      const subitem = subMap[subKey];
      if (subitem) {
        rateList.push({
          datatime: item.date,
          value: Math.round(((item.csl - subitem.csl) / subitem.csl) * 10000) / 100,
        });
      } else {
        rateList.push({
          datatime: item.date,
          value: null,
        });
      }
    });

    return {
      dayRateList: rateList.sort((a, b) => +a.datatime - +b.datatime),
      daySummary: Object.values(currentMap).map((item) => ({
        datatime: item.date,
        value: item.csl,
      })),
    };
  }
  private operation_gsl_year_paser(current: any[]) {
    const currentMap: { [key: string]: any } = {};
    const setAttr = (mapObj: { [key: string]: any }, i: any) => {
      if (!mapObj[i.year_]) {
        mapObj[i.year_] = { date: i.year_, csl: 0 };
      }
      mapObj[i.year_].csl += i.csl;
    };

    current.map((i) => {
      setAttr(currentMap, i);
    });
    return {
      daySummary: Object.values(currentMap).map((item) => ({
        datatime: item.date,
        value: item.csl,
      })),
    };
  }

  private operation_ydl_day_paser(current: any[], sub: any[]) {
    const currentMap: { [key: string]: any } = {};
    const subMap: { [key: string]: any } = {};
    const setAttr = (mapObj: { [key: string]: any }, i: any) => {
      if (!mapObj[i.vdate]) {
        mapObj[i.vdate] = { date: i.vdate, ydl: 0 };
      }
      mapObj[i.vdate].ydl += i.ydl;
    };

    current.map((i) => {
      setAttr(currentMap, i);
    });
    sub.map((i) => {
      setAttr(subMap, i);
    });

    const rateList: any[] = [];
    Object.values(currentMap).map((item) => {
      item.ydl = Math.round(item.ydl * 100) / 100;
      const subKey = moment(item.date).subtract(1, 'months').format('YYYYMMDD');
      item.date = moment(item.date).format('MM/DD');
      const subitem = subMap[subKey];
      if (subitem) {
        rateList.push({
          datatime: item.date,
          value: Math.round(((item.ydl - subitem.ydl) / subitem.ydl) * 10000) / 100,
        });
      } else {
        rateList.push({
          datatime: item.date,
          value: null,
        });
      }
    });

    return {
      dayRateList: rateList.sort((a, b) => +a.datatime - +b.datatime),
      daySummary: Object.values(currentMap).map((item) => ({
        datatime: item.date,
        value: item.ydl,
      })),
    };
  }
  private operation_ydl_month_paser(current: any[], sub: any[]) {
    const currentMap: { [key: string]: any } = {};
    const subMap: { [key: string]: any } = {};
    const setAttr = (mapObj: { [key: string]: any }, i: any) => {
      if (!mapObj[i.yue]) {
        mapObj[i.yue] = { date: i.yue, ydl: 0 };
      }
      mapObj[i.yue].ydl += i.ydl;
    };

    current.map((i) => {
      setAttr(currentMap, i);
    });
    sub.map((i) => {
      setAttr(subMap, i);
    });

    const rateList: any[] = [];
    Object.values(currentMap).map((item) => {
      item.ydl = Math.round(item.ydl * 100) / 100;
      const subKey = moment(item.date).subtract(1, 'years').format('YYYYMM');
      item.date = moment(item.date).format('YYYY/MM');
      const subitem = subMap[subKey];
      if (subitem) {
        rateList.push({
          datatime: item.date,
          value: Math.round(((item.ydl - subitem.ydl) / subitem.ydl) * 10000) / 100,
        });
      } else {
        rateList.push({
          datatime: item.date,
          value: null,
        });
      }
    });

    return {
      dayRateList: rateList.sort((a, b) => +a.datatime - +b.datatime),
      daySummary: Object.values(currentMap).map((item) => ({
        datatime: item.date,
        value: item.ydl,
      })),
    };
  }
  private operation_ydl_year_paser(current: any[]) {
    const currentMap: { [key: string]: any } = {};
    const setAttr = (mapObj: { [key: string]: any }, i: any) => {
      if (!mapObj[i.year_]) {
        mapObj[i.year_] = { date: i.year_, ydl: 0 };
      }
      mapObj[i.year_].ydl += i.ydl;
    };

    current.map((i) => {
      setAttr(currentMap, i);
    });
    return {
      daySummary: Object.values(currentMap).map((item) => ({
        datatime: item.date,
        value: item.ydl,
      })),
    };
  }

  private operation_power_day_paser(current: any[], sub: any[]) {
    const currentMap: { [key: string]: any } = {};
    const subMap: { [key: string]: any } = {};
    const setAttr = (mapObj: { [key: string]: any }, i: any) => {
      if (!mapObj[i.ri]) {
        mapObj[i.ri] = { date: i.ri, ydl: 0 };
      }
      mapObj[i.ri].ydl += i.ydl;
    };

    current.map((i) => {
      setAttr(currentMap, i);
    });
    sub.map((i) => {
      setAttr(subMap, i);
    });

    const rateList: any[] = [];
    Object.values(currentMap).map((item) => {
      item.ydl = Math.round(item.ydl * 100) / 100;
      const subKey = moment(item.date).subtract(1, 'months').format('YYYYMMDD');
      item.date = moment(item.date).format('MM/DD');
      const subitem = subMap[subKey];
      if (subitem) {
        rateList.push({
          datatime: item.date,
          value: Math.round(((item.ydl - subitem.ydl) / subitem.ydl) * 10000) / 100,
        });
      } else {
        rateList.push({
          datatime: item.date,
          value: null,
        });
      }
    });

    return {
      dayRateList: rateList.sort((a, b) => +a.datatime - +b.datatime),
      daySummary: Object.values(currentMap).map((item) => ({
        datatime: item.date,
        value: item.ydl,
      })),
    };
  }
  private operation_power_month_paser(current: any[], sub: any[]) {
    const currentMap: { [key: string]: any } = {};
    const subMap: { [key: string]: any } = {};
    const setAttr = (mapObj: { [key: string]: any }, i: any) => {
      if (!mapObj[i.yue]) {
        mapObj[i.yue] = { date: i.yue, ydl: 0 };
      }
      mapObj[i.yue].ydl += i.ydl;
    };

    current.map((i) => {
      setAttr(currentMap, i);
    });
    sub.map((i) => {
      setAttr(subMap, i);
    });

    const rateList: any[] = [];
    Object.values(currentMap).map((item) => {
      item.ydl = Math.round(item.ydl * 100) / 100;
      const subKey = moment(item.date).subtract(1, 'years').format('YYYYMM');
      item.date = moment(item.date).format('YYYY/MM');
      const subitem = subMap[subKey];
      if (subitem) {
        rateList.push({
          datatime: item.date,
          value: Math.round(((item.ydl - subitem.ydl) / subitem.ydl) * 10000) / 100,
        });
      } else {
        rateList.push({
          datatime: item.date,
          value: null,
        });
      }
    });

    return {
      dayRateList: rateList.sort((a, b) => +a.datatime - +b.datatime),
      daySummary: Object.values(currentMap).map((item) => ({
        datatime: item.date,
        value: item.ydl,
      })),
    };
  }
  private operation_power_year_paser(current: any[]) {
    const currentMap: { [key: string]: any } = {};
    const setAttr = (mapObj: { [key: string]: any }, i: any) => {
      if (!mapObj[i.year_]) {
        mapObj[i.year_] = { date: i.year_, ydl: 0 };
      }
      mapObj[i.year_].ydl += i.ydl;
    };

    current.map((i) => {
      setAttr(currentMap, i);
    });
    return {
      daySummary: Object.values(currentMap).map((item) => ({
        datatime: item.date,
        value: Math.round(item.ydl).toString(),
      })),
    };
  }
}
