import { Injectable } from '@angular/core';
import { MessageService } from '@shared/components/message/message.service';
import { MonitoringApiService } from '@shared/services/monitoring-api.service';
import { ItsysApiService } from '@shared/services/_itsys-api.service';
import { format } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class HouseRecordsService {

  constructor(
    private apiService: MonitoringApiService,
    private messageService: MessageService,
    private itsysApiService: ItsysApiService
  ) { }

  /** 查询泵房信息 */
  async houseRead(params: any): Promise<any> {
    let data = {};
    await this.apiService.houseRead(params).toPromise().then((res) => {
      if (res.code !== '0') {
        this.messageService.show({ content: '错误', type: 'danger' });
        return;
      }
      const house = res.item;
      data = {
        code: house.houseno,
        name: house.name,
        fullname: house.fullname,
        houseaddr: house.location,
        date: house.pumpdate ? format(house.pumpdate, 'yyyy-MM-dd') : '',
        status: house.running === 0 ? '运行' : '停止',
        addr: house.address,
        company: house.managment,
        person: house.contacts,
        meternum: house.meters,
        buildingnum: house.buildings,
        info: house.remark,
        estatedate: house.estatedate,
        meters: house.meters
      };
    });
    return data;
  }

  /** 获取泵房下面的泵组列表 */
  async queryParea(params: any): Promise<any> {
    let data: any = [];
    await Promise.all([
      this.itsysApiService.queryOptselect(),
      this.apiService.pareaQuery(params).toPromise()
    ]).then(([options, res]) => {
      // 字典处理，start
      const manufacturer = new Map();
      const supplyprocess = new Map();
      const controlmode = new Map();
      const manu_map = options.find((i: any) => i.optselectno === 'sws_house.manufacturer');
      const supply_map = options.find((i: any) => i.optselectno === 'sws_parea.supplyprocess');
      const control_map = options.find((i: any) => i.optselectno === 'sws_parea.controlmode');
      manu_map && manu_map.options.forEach((item: any) => {
        manufacturer.set(item.value, item.label);
      });
      supply_map && supply_map.options.forEach((item: any) => {
        supplyprocess.set(item.value, item.label);
      });
      control_map && control_map.options.forEach((item: any) => {
        controlmode.set(item.value, item.label);
      });
      // 字典处理，end
      if (res.code !== '0') {
        this.messageService.show({ content: '错误', type: 'danger' });
        return;
      }
      // todo: 需要从rn获取OptionMap来解析supplyprocess、manufacturer、controlmode字段
      if (res.items.length > 0) {

        res.items.forEach((item: any) => {
          item.manufacturer = manufacturer.get(item.manufacturer) || item.manufacturer;
          item.supplyprocess = supplyprocess.get(item.supplyprocess) || item.supplyprocess;
          item.controlmode = controlmode.get(item.controlmode) || item.controlmode;
        });
        res.items[0].hidden = false;
      }
      data = res.items;
    })

    return data;
  }
}
