import { Injectable } from '@angular/core';
import { MessageService } from '@shared/components/message/message.service';
import { MonitoringApiService } from '@shared/services/monitoring-api.service';
import { ItsysApiService } from '@shared/services/_itsys-api.service';
import { DatabaseService } from '@shared/services/_database.service';
import { SdaApiService } from '@shared/services/_sda-api.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class MonitoringService {

  sensornos: any = [];
  sensor_item_map: any = {};
  /** 泵房信息 */
  house: any = {};
  /** 泵区信息 */
  data: any = [];

  dmaPromise = this.sdaApiService.querysecondary({ queryfield: 'id,name,parentid' }).toPromise();
  /** 表格数据 */
  tableData = [];
  constructor(
    private apiService: MonitoringApiService,
    private messageService: MessageService,
    private itsysApiService: ItsysApiService,
    private sdaApiService: SdaApiService,
    private databaseService: DatabaseService,
  ) { }

  /** 查询水箱容量 */
  async queryeffcapacity(params: any): Promise<any> {
    let effcapacity = null;
    await this.apiService.queryTank(params).toPromise().then((res) => {
      if (res.code !== '0') {
        this.messageService.show({ content: '错误', type: 'danger' });
        return;
      }
      effcapacity = res.items[0]?.effcapacity;
    });
    return effcapacity;
  }

  /** 查询泵房泵区数据 */
  async readHouseAndPareas(params: any): Promise<any> {
    this.sensornos = [];
    this.sensor_item_map = {};
    this.house = {};
    this.data = [];
    await this.apiService.readHouseAndPareas(params).toPromise().then((res) => {
      this.house.id = res.item.id;
      this.house.name = res.item.name;
      if (res.item.classno_sensorno_map) {
        this.house.classno_sensorno_map = res.item.classno_sensorno_map;
        if (res.item.classno_sensorno_map.JSGDYL) {
          const JSGDYL = res.item.classno_sensorno_map.JSGDYL;
          this.sensor_item_map[JSGDYL] = {
            ownerid: res.item.id,
            classno: 'JSGDYL',
          };
          this.sensornos.push(JSGDYL);
        }

        if (res.item.classno_sensorno_map.JSGDSSLL) {
          const JSGDSSLL = res.item.classno_sensorno_map.JSGDSSLL;
          this.sensor_item_map[JSGDSSLL] = {
            ownerid: res.item.id,
            classno: 'JSGDSSLL',
          };
          this.sensornos.push(JSGDSSLL);
        }

        if (res.item.classno_sensorno_map.FMSSLL) {
          const FMSSLL = res.item.classno_sensorno_map.FMSSLL;
          this.sensor_item_map[FMSSLL] = {
            ownerid: res.item.id,
            classno: 'FMSSLL',
          };
          this.sensornos.push(FMSSLL);
        }

        if (res.item.classno_sensorno_map.WTVOL) {
          const WTVOL = res.item.classno_sensorno_map.WTVOL;
          this.sensor_item_map[WTVOL] = {
            ownerid: res.item.id,
            classno: 'WTVOL',
          };
          this.sensornos.push(WTVOL);
        }

        if (res.item.classno_sensorno_map.SXYW) {
          const SXYW = res.item.classno_sensorno_map.SXYW.split(',');
          SXYW.forEach((no: any) => {
            this.sensor_item_map[no] = {
              ownerid: res.item.id,
              classno: 'SXYW',
            };
            this.sensornos.push(no);
          });

        }
      }
      // 泵区
      res.item.pareas.map((item: any) => {
        if (item.classno_sensorno_map) {
          if (item.classno_sensorno_map.JSGDYL) {
            let JSGDYL = item.classno_sensorno_map.JSGDYL;
            if (JSGDYL.indexOf(',') !== -1) {
              JSGDYL = JSGDYL.split(',')[0];
            }
            this.sensor_item_map[JSGDYL] = {
              ownerid: item.id,
              classno: 'JSGDYL',
            };
            this.sensornos.push(JSGDYL);
          }

          if (item.classno_sensorno_map.YLBYL) {
            let YLBYL = item.classno_sensorno_map.YLBYL;
            if (YLBYL.indexOf(',') !== -1) {
              YLBYL = YLBYL.split(',')[0];
            }
            this.sensor_item_map[YLBYL] = {
              ownerid: item.id,
              classno: 'YLBYL',
            };
            this.sensornos.push(YLBYL);
          }

          if (item.classno_sensorno_map.YLBSDYL) {
            let YLBSDYL = item.classno_sensorno_map.YLBSDYL;
            if (YLBSDYL.indexOf(',') !== -1) {
              YLBSDYL = YLBSDYL.split(',')[0];
            }
            this.sensor_item_map[YLBSDYL] = {
              ownerid: item.id,
              classno: 'YLBSDYL',
            };
            this.sensornos.push(YLBSDYL);
          }

          if (item.classno_sensorno_map.FMSSLL) {
            let FMSSLL = item.classno_sensorno_map.FMSSLL;
            if (FMSSLL.indexOf(',') != -1) {
              FMSSLL = FMSSLL.split(',')[0];
            }
            this.sensor_item_map[FMSSLL] = {
              ownerid: item.id,
              classno: 'FMSSLL',
            };
            this.sensornos.push(FMSSLL);
          }

          if (item.classno_sensorno_map.PUMPOPEN) {
            item.PUMPOPEN = [];
            if (item.classno_sensorno_map.PUMPOPEN.indexOf(',') != -1) {
              const PUMPOPENArray = item.classno_sensorno_map.PUMPOPEN.split(',');
              PUMPOPENArray.forEach((PUMPOPEN: any, index: any) => {
                this.sensor_item_map[PUMPOPEN] = {
                  ownerid: item.id,
                  classno: 'PUMPOPEN',
                  index
                };
                this.sensornos.push(PUMPOPEN);
                item.PUMPOPEN.push(0);
              });
            } else {
              const PUMPOPEN = item.classno_sensorno_map.PUMPOPEN;
              this.sensor_item_map[PUMPOPEN] = {
                ownerid: item.id,
                classno: 'PUMPOPEN',
                index: 0
              };
              this.sensornos.push(PUMPOPEN);
              item.PUMPOPEN.push(0);
            }
          }

          item.BJYXPL = item.classno_sensorno_map.BJYXPL;
        }
        item.favorite = 0;
        if (item.pareacls !== '1') {
          this.data.push(item);
        }
      });
    });
    // await this.queryFavorite();
    await this.queryLastValue();
    return { house: this.house, pareaData: this.data };
  }

  /**
   * 查询收藏
   */
  async queryFavorite(): Promise<void> {
    const userid = this.databaseService.user.id;
    const params = {
      criteria: [
        { name: 'userid', value1: userid },
        { name: 'tablename', value1: 'sws_parea' }
      ]
    };
    await this.itsysApiService.favoriteQuery(params).toPromise().then((res) => {
      if (res.code !== '0') {
        this.messageService.show({ content: '错误', type: 'danger' });
        return;
      }
      res.items.map((favorite: any) => {
        const item = this.data.find((parea: any) => favorite.entityid === parea.id);
        if (item) {
          item.favorite = 1;
        }
      });
    });
  }

  /**
   * 查询最终值
   */
  async queryLastValue(): Promise<void> {
    if (this.sensornos.length === 0) {
      this.messageService.show({ content: '没有传感器', type: 'warning' });
      return;
    }
    const sensornosStr = this.sensornos.join(',');
    const params = [{
      name: 'sensornos',
      value1: sensornosStr
    }];
    await this.sdaApiService.queryLastvalue({ criteria: params }).toPromise().then((res) => {
      if (res.code !== '0') {
        this.messageService.show({ content: '错误', type: 'danger' });
        return;
      }
      res.items.map((sensor: any) => {
        const mapItem = this.sensor_item_map[sensor.sensorno];
        let item = null;
        if (mapItem.ownerid === this.house.id) {
          item = this.house;
        } else {
          item = this.data.find((i: any) => i.id === mapItem.ownerid);
        }
        sensor.color = this.getStatusColor(sensor);
        if (item) {
          switch (mapItem.classno) {
            case 'YLBSDYL':
              item.YLBSDYL = sensor;
              break;
            case 'JSGDYL':
              item.JSGDYL = sensor;
              if (this.house.JSGDYL) {
                this.house.JSGDYL.lastvalue = (this.house.JSGDYL.lastvalue + sensor.lastvalue) / 2;
              } else {
                this.house.JSGDYL = sensor;
              }
              break;
            case 'YLBYL':
              item.YLBYL = sensor;
              break;
            case 'PUMPOPEN':
              if (sensor.lastvalue >= 0.9) {
                item.PUMPOPEN[mapItem.index] = { timeout: ((Math.floor(new Date().getTime() / 1000) - sensor.secondstamp) > 180 || sensor.secondstamp == 0) ? true : false, value: 1 };
              } else {
                item.PUMPOPEN[mapItem.index] = { timeout: ((Math.floor(new Date().getTime() / 1000) - sensor.secondstamp) > 180 || sensor.secondstamp == 0) ? true : false, value: 0 };
              }
              break;
            case 'JSGDSSLL':
              item.JSGDSSLL = sensor;
              break;
            case 'FMSSLL':
              item.FMSSLL = sensor;
              break;
            case 'WTVOL':
              item.WTVOL = sensor;
              break;
            case 'SXYW':
              item.SXYW = sensor;
              break;
          }
        }
      });
    });
  }

  /** 根据数据状态设置颜色 */
  getStatusColor(value: any): any {
    return value ? value.status === 1 ? '#7D83F2' : '#FF5F5F' : '#7D83F2';
  }

  /** 查询列表数据 */
  async queryList(params: any) {
    const { pager, items } = await this.apiService.queryPareaLastvalues(params).toPromise().then((res) => {
      return { pager: res.pager, items: res.items };
    });
    items.forEach((item: any) => {
      Object.values(item.lastvalues).forEach((values: any) => {
        values.forEach((valueItem: any) => {
          valueItem.color = this.getStatusColor(valueItem);
        })
      })
    })
    const data = await this.apiService.queryTank({ houseid: items?.map((i: any) => i.houseid).toString() }).toPromise().then((res) => {
      return res;
    });
    data.items.forEach((i: any) => {
      data.items.filter((j: any) => i.houseid === j.houseid).forEach((k: any) => {
        i.height += k.effcapacity;
      });
    });
    const pareaids: any = [];
    // 填充dma_parentid、dma_name字段值
    items.forEach(async (item: any) => {
      item.setPressure = item.lastvalues.YLBSDYL?.length > 0 ? item.lastvalues.YLBSDYL[0].value : '';
      item.minvalue = item.lastvalues.YLBYL?.length > 0 ? item.lastvalues.YLBYL[0].minvalue : '';
      item.maxvalue = item.lastvalues.YLBYL?.length > 0 ? item.lastvalues.YLBYL[0].maxvalue : '';
      item.pareacls = parseInt(item.pareacls, 10);
      pareaids.push(item.id);
      let dma: any;
      this.dmaPromise.then((dmas) => {
        dma = dmas.items.find((tmp: any) => tmp.id === item.house_dmanodeid);
      });
      item.dma_parentid = dma?.parentid;
      item.dma_name = dma?.name;
      // 水箱高度
      data.items.forEach((i: any) => {
        if (i.houseid === item.houseid) {
          item.height = i.height;
        }
      });
      // 停机状态
      if (!item.alarmstatus && !item.pareastatus) {
        item.shutdownState = 0;
      } else {
        if (item.alarmstatus !== 0) {
          item.shutdownState = item.alarmstatus === 1 ? 2 : 3; // 未报警，已报警
        } else {
          item.shutdownState = item.pareastatus === 1 ? 1 : 0; // 正常，故障
        }
      }
    });
    await this.getPumpIndicate(items, pareaids);
    // 计算上传时间字段
    items.forEach((item: any) => {
      item.lastUploadTime = this.getValueTime(item);
      // 计算上传时间的颜色
      item.lastUploadTimeColor = '#000000'; // 正常
      if (!!item.lastUploadTime) {
        const itemtime = moment(item.lastUploadTime);
        const diff = moment().diff(itemtime, 'minutes');
        if (diff > 30) {
          // 超过半小时的显示橘色
          item.lastUploadTimeColor = '#FA8C15';
        }
        if (diff > 2880) {
          // 超过两天的显示红色
          item.lastUploadTimeColor = '#F5242D';
        }
      }
    });
    this.tableData = items;
  }

  /** 填充水泵运行值和是否收藏 */
  async getPumpIndicate(items: any, pareaids: any) {
    // 查询ids对应的sensorlinks
    const pareaidsstr = pareaids.join(",");
    await this.apiService.queryByparea({ pareaids: pareaidsstr }).toPromise().then((res: any) => {
      // 把查询到的sensorlinks分配给对应的主数据
      items.forEach((item: any) => {
        const sensorlinks = res.items.filter((owner: any) => owner.ownerid === item.id);
        item.sensorlinks = sensorlinks;
      });
    });
    items = await this.addFavoriteFlag(
      Promise.resolve(items),
      this.getfavorite(),
    );
    items.forEach((item: any) => {
      const obj: any = {};
      if (!!item.lastvalues.BJYXPL) {
        item.lastvalues.BJYXPL.forEach((sensor: any) => {
          obj[sensor.sensorno] = { value: sensor.value, lasttime: sensor.secondstamp, sensorno: sensor.sensorno };
        });
      }
      if (!!item.lastvalues.BJYXZT) {
        item.lastvalues.BJYXZT.forEach((sensor: any) => {
          obj[sensor.sensorno] = { value: sensor.value, lasttime: sensor.secondstamp, sensorno: sensor.sensorno };
        });
      }
      item.pump = this.getItemPump(
        item.sensorlinks || [],
        obj,
      );
      // 计算值的状态
      item.pump.forEach((pump: any) => {
        // 状态
        pump.pumpopen = pump.open.openstatus;
        pump.pumpfreq = !!pump.freq;
        pump.hzValue = pump.open && pump.open.value;
        // 值
        if (pump.pumpfreq) {
          if (pump.freq.value) {

          }
        } else {
          if (pump.hzValue && pump.pumpopen) {
            // pump.hzValue = parseInt(pump.hzValue, 10);
            pump.hzValue = pump.open.value > 0 ? pump.open.value : 0
          } else {
            pump.hzValue = 0;
          }
          if (pump.pumpopen && pump.hzValue > 0) {
            pump.color = '#52C41A'; // 正常 绿色
          } else {
            pump.color = '#c1c1c1'; // 超时 灰色
          }
        }
      });
    });
    this.tableData = items;
  }

  addFavoriteFlag(
    data: Promise<any[]>,
    favorite: any,
    dataId = 'id',
    favoriteId = 'entityid',
  ) {
    return Promise.all([data, favorite]).then(([data, favorite]) => {
      data.forEach((element) => {
        element.favorite = !!favorite.find(
          (val: any) => val[favoriteId] == element[dataId],
        );
      });
      return data;
    });
  }


  getfavorite() {
    const userid = this.databaseService.user.id;
    const params = {
      criteria: [
        { name: 'userid', value1: userid },
        { name: 'tablename', value1: 'sws_parea' }
      ]
    };
    return this.itsysApiService.favoriteQuery(params).toPromise().then((res) => res.items);
  }

  getItemPump(list: any[], obj: any) {
    const openClass = list.find((item) => item.classno == 'BJYXPL');
    let sensorList: any = [];
    if (openClass) {
      (openClass.sensorno || '').split(',').forEach((sensorno: any) => {
        if (obj[sensorno]) {
          sensorList.push(obj[sensorno])
        }
      });
      const freqClass = list.find((item) => item.classno == 'BJYXZT');
      let freqList: any = [];
      if (freqClass) {
        (freqClass.sensorno || '').split(',').forEach((sensorno: any) => {
          if (obj[sensorno]) {
            freqList.push()
          }
        });
      }
      // 水泵运行值 时间距离现在超过3分钟的 显示关闭状态
      // 状态有值就不需要频率的值
      if (freqList.length > 0) {
        freqList.forEach((item: any) => {
          const a = sensorList.find((val: any) => item.charAt(item.sensorno.length - 1) == val.sensorno.charAt(val.sensorno.length - 1))
          if (item.data && item.data.lasttime) {
            const itemtime = moment(item.lasttime * 1000);
            const diff = moment().diff(itemtime, 'minutes');
            if (diff > 3) {
              a.openstatus = false;
            } else {
              a.openstatus = true;
            }
          }
        });
      } else {
        sensorList.forEach((res: any) => {
          if (res && res.lasttime) {
            const itemtime = moment(res.lasttime * 1000);
            const diff = moment().diff(itemtime, 'minutes');
            if (diff > 3) {
              res.openstatus = false;
            } else {
              res.openstatus = true;
            }
          }
        });
      }
      return sensorList.map((item: any, i: any) => ({ open: { ...item }, freq: freqList[i] }));
    } else {
      return [];
    }
  }

  getValueTime(item: any) {
    if (item.lastvalues) {
      const keys = Object.keys(item.lastvalues);
      const times: any = [];
      keys.forEach((key) => {
        item.lastvalues[key].forEach((lastvalue: any) => {
          times.push(lastvalue.secondstamp);
        });
      });
      if (times.length === 0) {
        return null;
      }
      const maxtime = Math.max(...times);
      return maxtime * 1000;
    } else {
      return null;
    }
  }


}
