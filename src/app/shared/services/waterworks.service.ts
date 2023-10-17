import { Injectable, Injector } from '@angular/core';
import { BaseApi, BaseUrl, FORM, Payload, POST, _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';
import { StatisticalTypes } from '@shared/data/statistical-types.data';
import { Observable } from 'rxjs';
import { ItsysApiService } from './_itsys-api.service';
import { SdaApiService } from './_sda-api.service';
import { format } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
@BaseUrl(environment.api_prefix + '/sda')
export class WaterworksService extends BaseApi {
  /** 年月日当前数据类型缓存 */
  public selectedTypes = {
    day: StatisticalTypes[0],
    month: StatisticalTypes[0],
    year: StatisticalTypes[0],
  }
  factorynos: string = '';
  factoryMap: { [key: string]: string } = {};
  sensor: any;
  
  constructor(
    public injector: Injector,
    private itsysApiService: ItsysApiService,
    private sdaApiService: SdaApiService
  ) {
    super(injector);
  }
  /** 获取PageConfig中的水厂并获取所有厂站 */
  async InitBasicData() {
    if (this.factorynos) {
      return Promise.resolve({
        factorynos: this.factorynos,
        factoryMap: this.factoryMap
      })
    }
    const [pageConfig, factories] = await Promise.all([
      this.itsysApiService.pageconfigQuery({
        criteria: [{ name: "configno", value1: "tapwater.process" }]
      }).toPromise(),
      this.factoryQuery({}).toPromise(),
    ])
    const factorynos = JSON.parse(pageConfig.items[0].configjson).factorys.map((item: any) => { return item.factoryno }).toString();
    const factoryMap: { [key: string]: any } = {};
    factories.items.map((item: any) => {
      factoryMap[item.factoryno] = item.name;
    })
    this.factorynos = factorynos;
    this.factoryMap = factoryMap;
    return { factorynos, factoryMap }
  }

  header: string[] = [];
  table: any[] = [];
  factorys: any[] = [];
  sensorEntityMap = new Map();
  sensorValueMap = new Map();
  dataTypeMap = new Map();

  async InitRealTimeData() {
    if (this.factorys.length) {
      return Promise.resolve(false);
    }
    const data = await this.itsysApiService.pageconfigQuery({
      criteria: [{ name: "configno", value1: "sda.app.factory" }]
    }).toPromise();
    const config = JSON.parse(data.items[0].configjson)
    this.header = config.titleitem.header.split(',');
    this.table = config.titleitem.table.map((i: any) => ({ ...i, sensornos: i.sensorno.split(',') }));

    console.log({ config });

    let sensornos = '';
    config.titleitem.table.map((item: any) => {
      sensornos += ',' + item.sensorno
    })
    
    config.factorys.map((factory: any) => {
      factory.kpiitems.map((kpi: any) => {
        sensornos += ',' + kpi.sensorno
      })
      factory.pump.sensors.map((pump: any) => {
        sensornos += ',' + (pump.pumptype == 0 ? pump.opensensorno : pump.otimesensorno)
      })
    })
    sensornos = sensornos.substring(1)
    const suc = await this.sdaApiService.queryenabled({
      criteria: [
        { name: 'stationcls', value1: 'factory' },
        { name: 'sensornos', value1: sensornos },
      ]
    }).toPromise();
    // log(suc)
    let sensorids = ''
    suc.items.map((item: any) => {
      this.sensorEntityMap.set(item.sensorno, item)
      sensorids += "," + item.id
    })
    if (sensorids) {
      sensorids = sensorids.substring(1)
      const result = await this.sdaApiService.queryLastvalue({
        criteria: [
          { name: 'sensorids', value1: sensorids },
        ]
      }).toPromise();

      console.log(result);
      result.items.map((item: any) => {
        this.sensorValueMap.set(item.sensorno, item)
      })
      this.factorys = config.factorys.map((i: any) => {
        const timelist: number[] = [];
        const kpiitems = i.kpiitems.map((i: any) => {
          const sensornos = i.sensorno.split(',')
            .map((i: any) => ({
              no: i,
              value: this.sensorValueMap.get(i)?.lastvalue || 0,
              name: this.sensorEntityMap.get(i)?.name || '-',
              unit: this.sensorEntityMap.get(i)?.unit || '-',
              precisions: this.sensorEntityMap.get(i)?.precisions || (this.sensorEntityMap.get(i)?.precisions===0&&0)|| 3,
            }));
          sensornos.forEach((i: any) => {
            timelist.push(this.sensorValueMap.get(i.no)?.lasttime);
          });
          return { ...i, sensornos };
        });
        timelist.sort((a, b) => (b - a));
        const date = format(timelist[0] * 1000, 'yyyy-MM-dd HH:mm:ss');

        const sensors = i.pump.sensors.map((i: any) => {
          let value = this.sensorValueMap.get(i.pumptype == 0 ? i.opensensorno : i.otimesensorno)
          return {
            pumptype: i.pumptype,
            open: value?.lastvalue > 0.05 || false
          }
        })
        return { ...i, kpiitems, date, sensors }
      });
    }

    return true;
  }

  /** 天数据 */
  @POST('/ribb/statisticday.api')
  statisticday(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 月数据 */
  @POST('/ribb/statisticsmoth.api')
  statisticsmoth(@Payload data: any): Observable<any> {
    return new Observable();
  }

  /** 年数据 */
  @POST('/ribb/statisticsyear.api')
  statisticsyear(@Payload data: any): Observable<any> {
    return new Observable();
  }
  /** 厂站字典 */
  @POST('/factory/query_forcache.api')
  factoryQuery(@Payload data: any): Observable<any> {
    return new Observable();
  }
}
