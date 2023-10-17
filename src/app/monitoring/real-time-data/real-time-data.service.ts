import { Injectable } from '@angular/core';
import { MessageService } from '@shared/components/message/message.service';
import { SdaApiService } from '@shared/services/_sda-api.service';
import { format } from 'date-fns';
import { MonitoringApiService } from '@shared/services/monitoring-api.service';

@Injectable({
  providedIn: 'root'
})
export class RealTimeDataService {

  data: any = [];

  sensorids: any = [];

  constructor(
    private messageService: MessageService,
    private sdaApiService: SdaApiService,
    public apiservice: MonitoringApiService,
  ) { }

  /** 根据sensornos查询对应的sensor实体 */
  async queryenabled(type: any, house: any, pareas: any): Promise<any> {
    const sensornos = [];
    this.data = [];
    switch (type) {
      case '流量':
        let FLOWIN_no = house.classno_sensorno_map?.JSGDSSLL;
        if (FLOWIN_no) {
          sensornos.push(FLOWIN_no);
          this.data.push({ title: '进水流量', yName: '(m³/h)', sno: FLOWIN_no });
        }
        let FLOWOUT_no = house.classno_sensorno_map?.FMSSLL;
        if (FLOWOUT_no) {
          sensornos.push(FLOWOUT_no);
          this.data.push({ title: '供水流量', yName: '(m³/h)', sno: FLOWOUT_no });
        }

        pareas.forEach((parea: any) => {
          let parea_FLOWOUT_no = parea.classno_sensorno_map?.FMSSLL;
          if (parea_FLOWOUT_no) {
            sensornos.push(parea_FLOWOUT_no);
            this.data.push({ title: parea.name + '供水流量', yName: '(m³/h)', sno: parea_FLOWOUT_no, pareano: parea.pareano });
          }
        });
        break;
      case '频率':
        pareas.forEach((parea: any, index: any) => {
          let parea_BJYXPL_no = parea.classno_sensorno_map?.BJYXPL;
          if (parea_BJYXPL_no) {
            let Nos = [];
            if (parea_BJYXPL_no.indexOf(',') !== -1) {
              Nos = parea_BJYXPL_no.split(',');
            } else {
              Nos.push(parea_BJYXPL_no);
            }

            Nos.forEach((item: any, i: any) => {
              sensornos.push(item);
              const num = i + 1;
              this.data.push({ title: parea.name + num + '#水泵频率', yName: 'HZ', sno: item, pareano: parea.pareano });
            });
          }
        });
        break;
      case '压力':
        let PIN_no = house.classno_sensorno_map?.JSGDYL;
        if (PIN_no) {
          if (PIN_no.indexOf(',') !== -1) {
            PIN_no = PIN_no.split(',')[0];
          }
          sensornos.push(PIN_no);
          this.data.push({ title: '进水压力', yName: '(Mpa)', sno: PIN_no });
        }

        pareas.forEach((parea: any) => {
          let parea_POUT_no = parea.classno_sensorno_map?.YLBYL;
          if (parea_POUT_no) {
            sensornos.push(parea_POUT_no);
            this.data.push({ title: parea.name + '供水压力', yName: '(Mpa)', sno: parea_POUT_no, pareano: parea.pareano });
          }
        });
        break;
      case '液位':
        let TANKLEVEL_no = house.classno_sensorno_map?.SXYW;
        if (TANKLEVEL_no) {
          sensornos.push(...TANKLEVEL_no.split(','));
          sensornos.forEach((item: any, i: any) => {
            this.data.push({ title: '水箱液位', yName: '(m)', sno: item });
          });

        }

        pareas.forEach((parea: any) => {
          let parea_TANKLEVEL_no = parea.classno_sensorno_map?.SXYW;
          if (parea_TANKLEVEL_no) {
            let Nos = [];
            Nos = parea_TANKLEVEL_no.split(',');
            Nos.forEach((item: any, i: any) => {
              sensornos.push(item);
              const num = i + 1;
              this.data.push({ title: parea.name + num + '水箱液位', yName: '(m)', sno: item, pareano: parea.pareano });
            });
          }
        });
        break;
      case '水质':
        const arr = house.classno_sensorno_map?.SZ?.split(',');
        let TURB1_no = arr.find((i: string) => i.includes('_SZZD'));
        if (TURB1_no) {
          sensornos.push(TURB1_no);
          this.data.push({ title: '进水浊度', yName: '(NTU)', sno: TURB1_no });
        }
        let CHLR1_no = arr.find((i: string) => i.includes('_SZYL'));
        if (CHLR1_no) {
          sensornos.push(CHLR1_no);
          this.data.push({ title: '进水余氯', yName: '(NTU)', sno: CHLR1_no });
        }
        break;
    }
    if (sensornos.length === 0) {
      this.messageService.show({ content: '没有传感器', type: 'warning' });
      return;
    } else {
      const sensornosStr = sensornos.join(',');
      const params = {
        criteria: [
          { name: 'stationcls', value1: 'factory' },
          { name: 'stationid', value1: house.id },
          { name: 'sensornos', value1: sensornosStr },
        ]
      };
      await this.sdaApiService.queryenabled(params).toPromise().then(async (res) => {
        if (res.code !== '0') {
          this.messageService.show({ content: '错误', type: 'danger' });
          return;
        }
        this.sensorids = [];
        res.items.map((item: any, index: any) => {
          const housList = this.data.filter((h: any) => h.sno === item.sensorno);
          housList.map((h: any) => {
            h.sensorid = item.id;
          });
          this.sensorids.push(item.id);
        });
        if (this.sensorids.length > 0) {
          await this.queryOneDay();
        } else {
          this.data = [];
          this.messageService.show({ content: '获取sensorids出现异常', type: 'danger' });
        }
      });
    }
    return this.data;
  }

  /** 根据sensorids查询日内分钟数据 */
  async queryOneDay(): Promise<any> {
    const sensoridsStr = this.sensorids.join(',');
    const params = {
      criteria: [
        { name: 'date', value1: format(new Date(), 'yyyy-MM-dd') },
        // { name: 'date', value1: '2022-01-04' },
        { name: 'sensorids', value1: sensoridsStr },
      ]
    };
    await this.sdaApiService.queryoneday_sensors(params).toPromise().then((res) => {
      this.data.forEach((item: any) => {
        item.yData = [];
        item.data = [];
      });

      res.items.forEach((sensorValue: any) => {
        if (sensorValue.minute && sensorValue.value) {
          const dataList = this.data.filter((item: any) => item.sensorid === sensorValue.sensorid);
          dataList.forEach((item: any) => {
            item.yData.push({
              time: sensorValue.minute,
              sensorValue: Math.round(sensorValue.value * 100) / 100,
              value: [
                sensorValue.minute,
                Math.round(sensorValue.value * 100) / 100
              ]
            });
          });
        }
      });

      this.data.forEach((item: any) => {
        for (let i = 0; i < 10 && i < item.yData.length; i++) {
          item.data.push({ time: item.yData[i].time, value: item.yData[i].sensorValue });
        }
        item.yData.reverse();
      });
    });
  }

  /** 查询泵区最新值 */
  async queryPareaLastvalues(params: any): Promise<any> {
    let items = null;
    await this.apiservice.queryPareaLastvalues(params).toPromise().then((res: any) => {
      if (res.code !== '0') {
        this.messageService.show({ content: '错误', type: 'danger' });
        return;
      }
      res.items.forEach((item: any) => {
        item.YLBYL = {
          id: item.lastvalues['YLBYL']?.length > 0 ? item.lastvalues['YLBYL'][0].id : '',
          no: item.lastvalues['YLBYL']?.length > 0 ? item.lastvalues['YLBYL'][0].sensorno : '',
          valueItem: {
            minvalue: item.lastvalues['YLBYL']?.length > 0 ? item.lastvalues['YLBYL'][0].minvalue : '-',
            maxvalue: item.lastvalues['YLBYL']?.length > 0 ? item.lastvalues['YLBYL'][0].maxvalue : '-',
            lastvalue: item.lastvalues['YLBYL']?.length > 0 ? item.lastvalues['YLBYL'][0].lastvalue : '-',
            avgvalue: item.lastvalues['YLBYL']?.length > 0 ? item.lastvalues['YLBYL'][0].avgvalue : '-',
          }
        };
        item.YLBSDYL = {
          id: item.lastvalues['YLBSDYL']?.length > 0 ? item.lastvalues['YLBSDYL'][0].id : '',
          no: item.lastvalues['YLBSDYL']?.length > 0 ? item.lastvalues['YLBSDYL'][0].sensorno : '',
          valueItem: {
            minvalue: item.lastvalues['YLBSDYL']?.length > 0 ? item.lastvalues['YLBSDYL'][0].minvalue : '-',
            maxvalue: item.lastvalues['YLBSDYL']?.length > 0 ? item.lastvalues['YLBSDYL'][0].maxvalue : '-',
            lastvalue: item.lastvalues['YLBSDYL']?.length > 0 ? item.lastvalues['YLBSDYL'][0].lastvalue : '-',
          }
        };
        item.offset =
          item.lastvalues['POFFSET']?.length > 0 ?
            (item.lastvalues['POFFSET'][0].value ? item.lastvalues['POFFSET'][0].value.toFixed(2) : '-') : '-';
      });
      items = res.items;
    });
    return items;
  }

  /** 查询泵房最新值 */
  async queryHouseLastvalues(params: any): Promise<any> {
    let items = null;
    await this.apiservice.queryHouseLastvalues(params).toPromise().then((res: any) => {
      if (res.code !== '0') {
        this.messageService.show({ content: '错误', type: 'danger' });
        return;
      }
      res.items.forEach((item: any) => {
        if (item.lastvalues && Object.keys(item.lastvalues).length && item.lastvalues['JSGDYL'].length) {
          item.JSGDYL = {
            id: item.lastvalues['JSGDYL'][0].id,
            no: item.lastvalues['JSGDYL'][0].sensorno,
            valueItem: {
              minvalue: item.lastvalues['JSGDYL'][0].minvalue,
              maxvalue: item.lastvalues['JSGDYL'][0].maxvalue,
              lastvalue: item.lastvalues['JSGDYL'][0].lastvalue,
              avgvalue: item.lastvalues['JSGDYL'][0].avgvalue,
            },
            alarmItem: null
          };
        }
      });
      items = res.items;
    });
    return items;
  }

}
