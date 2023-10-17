import { Injectable } from '@angular/core';
import { MessageService } from '@shared/components/message/message.service';
import { RealtimeApiService } from '@shared/services/realtime-api.service';
import { SensorService } from '@shared/services/sensor.service';
import { FactoryService } from '@shared/services/factory.service';
import { StationService } from '@shared/services/station.service';
import { SdaApiService } from '@shared/services/_sda-api.service';
import { optionsToObject } from '@shared/utils/optionsToObj';
import { ItsysApiService } from '@shared/services/_itsys-api.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { getFields, getOrderFields } from './realtime.config';

@Injectable({
  providedIn: 'root'
})
export class RealtimeService {

  init = true;
  searchValue = '';
  selectedIndex = 1;
  itemList: any = [];

  houseOptions: any = [];

  /** 报警说明中ruletypeno字段对应的纸面意思 */
  ruletype_label_map: any = {
    HIGH: '超过设定值',
    HH: '超过设定值',
    HHH: '超过设定值',
    LOW: '低于设定值',
    LL: '低于设定值',
    LLL: '低于设定值',
    CP: '变化率超过',
    CV: '变化值超过',
    OL: '超时',
  };

  /** 选中的数据 */
  selectedItem: any;

  /** 报警对象 */
  objectObjPromise = Promise.all([
    this.sensorApiService.queryAll({}).toPromise(),
    this.factoryApiService.queryAll({}).toPromise(),
    this.stationApiService.queryAll({}).toPromise(),
  ])
    .then(([sensorRes, facRes, staRes]) => {
      return [].concat(...sensorRes.items, ...facRes.items, ...staRes.items);
    })
    .then((list) => list.map((item: any) => ({ label: item.name, value: item.id })))
    .then((list) => {
      return optionsToObject(list);
    });

  /** 用户 */
  usermapPromise = this.itsysApiService.getUsers();

  constructor(
    private apiService: RealtimeApiService,
    private messageService: MessageService,
    private itsysApiService: ItsysApiService,
    private sensorApiService: SensorService,
    private factoryApiService: FactoryService,
    private stationApiService: StationService,
    public sdaApiService: SdaApiService,
  ) { }

  /** 查询列表数据 */
  async queryList(params: any): Promise<any> {
    let data: any = [];
    let page: any;
    await this.apiService.queryList(params).toPromise().then((res) => {
      if (res.code !== '0') {
        this.messageService.show({ content: '错误', type: 'danger' });
        return;
      }
      res.items.forEach((item: any) => {
        item.duration = this.cb(item.ctime - item.stime);
      });
      data = [...res.items];
      page = res.pager;
    });
    const p = {
      criteria: [
        { name: 'sourceids', value1: data.map((i: any) => i.id).join(',') },
        { name: 'status', value1: '0,1,2,3,8' }
      ]
    };
    const res1 = await this.maintenanceWorkOrder(p);
    res1.forEach((i: any) => {
      data.forEach((val: any) => {
        if (i.sourceid === val.id) {
          val.releaseStatus = '已发布';
          val.val = i;
          val.phenomenon = i.phenomenon;
          val.isWork = true;
        }
      });
    });
    return { items: data, pager: page };
  }

  /** 获得天数 */
  getNumberOfDays(date: string): string {
    const a1 = Date.parse(new Date() + '');
    const a2 = Date.parse(new Date(date) + '');
    // 核心：时间戳相减，然后除以天数
    const day = parseInt((a2 - a1) / (1000 * 60 * 60 * 24) + '');
    return `(${day}天)`;
  }

  /** 设置颜色 */
  setColor(i: any): any {
    let style;
    if (i.alarmlevel === 1) {
      style = { color: '#fab100' };
    } else if (i.alarmlevel === 2) {
      style = { color: '#ff7f02' };
    } else if (i.alarmlevel === 3) {
      style = { color: '#fc1c02' };
    }
    if (i.confirmed === 3) {
      style = { color: '#ccc' };
    }
    return style;
  }


  decimal(num: any, v: any) {
    const vv = Math.pow(10, v);
    return Math.round(num * vv) / vv;
  }


  /** 初始化表单 */
  initFields(pagestatus: string, item: any, model?: any): FormlyFieldConfig[] {
    const fields = getFields(pagestatus, item, this.itsysApiService, model);
    return fields;
  }

  /** 初始化工单表单 */
  initOrderFields(pagestatus: string, item: any, model?: any): FormlyFieldConfig[] {
    const fields = getOrderFields(pagestatus, item, this, this.itsysApiService, model);
    return fields;
  }

  /** 确定 */
  async confirm(params: any): Promise<any> {
    let result = null;
    await this.apiService.confirm(params).toPromise().then(res => {
      if (res.code !== '0') {

      } else {
        this.messageService.show({ content: '已完成', type: 'success' });
        result = res;
      }
    });
    return result;
  }

  /** 延迟 */
  async delay(params: any): Promise<any> {
    let result = null;
    await this.apiService.delay(params).toPromise().then(res => {
      if (res.code !== '0') {
        this.messageService.show({ content: '错误', type: 'danger' });
      } else {
        this.messageService.show({ content: '已延迟', type: 'success' });
        result = res;
      }
    });
    return result;
  }

  /** 沉默/取消沉默 */
  async realTimeSilence(params: any): Promise<any> {
    let result = null;
    await this.apiService.realTimeSilence(params).toPromise().then(res => {
      if (res.code !== '0') {
        this.messageService.show({ content: '错误', type: 'danger' });
        result = false;
      } else {
        this.messageService.show({ content: '已完成', type: 'success' });
        result = true;
      }
    });
    return result;
  }

  /** 泵房沉默 */
  async houseSilence(params: any): Promise<any> {
    let result = null;
    await this.apiService.houseSilence(params).toPromise().then(res => {
      if (res.code !== '0') {
        this.messageService.show({ content: '错误', type: 'danger' });
        result = false;
      } else {
        this.messageService.show({ content: '已完成', type: 'success' });
        result = true;
      }
    });
    return result;
  }

  /** 获取泵房列表 */
  async getHouseList(): Promise<any> {
    let houseItems: any = [];
    await this.apiService.queryHouse({}).toPromise().then((res) => {
      if (res.code !== '0') {
        this.messageService.show({ content: '错误', type: 'danger' });
        return;
      }
      houseItems = res.items.map((item: any) => ({ value: item.id, label: item.name }));
    });
    houseItems.sort((a: any, b: any) => {
      return a.label.localeCompare(b.label, 'zh-CN');
    });

    return houseItems;
  }

  /** 查询维修小组 */
  async queryTeam(params: any) {
    let list: any = [];
    await this.apiService.queryTeam(params).toPromise().then((res) => {
      if (res.code !== '0') {
        this.messageService.show({ content: '错误', type: 'danger' });
        return;
      }
      list = res.items.map((item: any) => ({ value: item.id, label: item.name }));
    });
    list.sort((a: any, b: any) => {
      return a.label.localeCompare(b.label, 'zh-CN');
    });

    return list;
  }

  /** 根据houseid查询泵区列表 */
  async getPareaList(houseid: string): Promise<any> {
    let pareaList: any = [];
    const params = {
      criteria: [{
        name: 'houseid',
        value1: houseid
      }]
    };
    await this.apiService.pareaQuery(params).toPromise().then((res) => {
      if (res.code !== '0') {
        this.messageService.show({ content: '错误', type: 'danger' });
        return;
      }
      pareaList = res.items.map((item: any) => ({ value: item.id, label: item.name }));
    });
    pareaList.sort((a: any, b: any) => {
      return a.label.localeCompare(b.label, 'zh-CN');
    });

    return pareaList;
  }

  /** 根据pareaid查询设备列表 */
  async getDeviceList(pareaid: string): Promise<any> {
    let deviceList: any = [];
    const params = {
      criteria: [{
        name: 'pareaid',
        value1: pareaid
      }]
    };
    await this.apiService.deviceQuery(params).toPromise().then((res) => {
      if (res.code !== '0') {
        this.messageService.show({ content: '错误', type: 'danger' });
        return;
      }
      deviceList = res.items.map((item: any) => ({ value: item.id, label: item.name }));
    });
    deviceList.sort((a: any, b: any) => {
      return a.label.localeCompare(b.label, 'zh-CN');
    });

    return deviceList;
  }


  /** 新建事件 */
  async create(): Promise<any> {
    let item: any;
    await this.apiService.create({}).toPromise().then((res) => {
      if (res.code !== '0') {
        this.messageService.show({ content: '错误', type: 'danger' });
        return;
      }
      item = res.item;
    });
    return item;
  }

  /** 补全数据 */
  async getInfo(): Promise<void> {
    const promises: Promise<any>[] = [];
    // 填入deviceRelation
    const stationids = [this.selectedItem.stationid];
    if (this.selectedItem.objectcls === 2) {
      stationids.push(this.selectedItem.objectid);
    }
    const relparams = {
      criteria: [{
        name: 'ids',
        value1: stationids.join(',')
      }]
    };
    promises.push(this.deviceQuery(relparams));
    // 填入datatype
    promises.push(this.queryDataType({}));
    // 填入datatypeEntity
    const datatypeParam = {
      criteria: [{
        name: 'ids',
        value1: this.selectedItem.objectid
      }]
    };
    promises.push(this.queryenabled(datatypeParam));
    // 填入ruleentity
    const rulesparams = {
      criteria: [{
        name: 'ids',
        value1: this.selectedItem.ruleid
      }]
    };

    if (this.selectedItem.rulesrc === 0) {
      promises.push(this.queryDevicerule(rulesparams));
    } else if (this.selectedItem.rulesrc === 1) {
      promises.push(this.querySensorrule(rulesparams));
    }

    await Promise.all(promises).then(([rels, dataTypes, sensors, rules]) => {
      this.selectedItem.deviceRelation = rels.find((device: any) => device.id = this.selectedItem.stationid);
      this.selectedItem.dataTypeEntity = dataTypes.find((dataType: any) => dataType.datatypeno === this.selectedItem.datatypeno);
      this.selectedItem.dataTypeEntity = sensors.find((sensor: any) => sensor.id === this.selectedItem.objectid);
      this.selectedItem.ruleEntity = rules.length ? rules[0] : null;
    });
    if (!this.selectedItem.phenomenon) {
      this.selectedItem.phenomenon = this.getAlarmDetail();
    }
  }

  /** 查询设备关联 */
  async deviceQuery(params: any): Promise<any> {
    let data: any = [];
    await this.apiService.deviceQuery(params).toPromise().then((res) => {
      if (res.code !== '0') {
        this.messageService.show({ content: '错误', type: 'danger' });
        return;
      }
      data = [...res.items];
    });
    return data;
  }

  /** 查询数据类型 */
  async queryDataType(params: any): Promise<any> {
    let data: any = [];
    await this.apiService.queryDataType(params).toPromise().then((res) => {
      if (res.code !== '0') {
        this.messageService.show({ content: '错误', type: 'danger' });
        return;
      }
      data = [...res.items];
    });
    return data;
  }

  /** 查询设备规则 */
  async queryDevicerule(params: any): Promise<any> {
    let data: any = [];
    await this.apiService.queryDevicerule(params).toPromise().then((res) => {
      if (res.code !== '0') {
        this.messageService.show({ content: '错误', type: 'danger' });
        return;
      }
      data = [...res.items];
    });
    return data;
  }

  /** 查询传感器规则 */
  async querySensorrule(params: any): Promise<any> {
    let data: any = [];
    await this.apiService.querySensorrule(params).toPromise().then((res) => {
      if (res.code !== '0') {
        this.messageService.show({ content: '错误', type: 'danger' });
        return;
      }
      data = [...res.items];
    });
    return data;
  }

  /** 拼接报警说明 */
  getAlarmDetail(): string {
    if (this.selectedItem.dataTypeEntity && this.selectedItem.ruleEntity) {
      let reallimit = null;
      // 如果是上下限，需要把死值计算进去
      if (this.selectedItem.ruleEntity.ruletype === 'HIGH' || this.selectedItem.ruleEntity.ruletype === 'HH') {
        reallimit = this.selectedItem.ruleEntity.limitvalue - this.selectedItem.ruleEntity.limitdead;
      } else if (this.selectedItem.ruleEntity.ruletype === 'LOW' || this.selectedItem.ruleEntity.ruletype === 'LL') {
        reallimit = this.selectedItem.ruleEntity.limitvalue + this.selectedItem.ruleEntity.limitdead;
      } else {
        reallimit = this.selectedItem.ruleEntity.limitvalue;
      }
      const str =
        this.selectedItem.dataTypeEntity.name
        + this.ruletype_label_map[this.selectedItem.ruleEntity.ruletype]
        + reallimit.toFixed(2) + this.selectedItem.dataTypeEntity.unit;
      return str;
    } else {
      return '';
    }
  }

  async doInsert(model: any): Promise<any> {
    let result: any;
    await this.apiService.doInsert(model).toPromise().then(res => {
      if (res.code !== '0') {
        this.messageService.show({ content: '错误', type: 'danger' });
      } else {
        this.messageService.show({ content: '成功', type: 'success' });
        result = res;
      }
    });
    return result;
  }

  async insertAndpublish(model: any): Promise<any> {
    let result: any;
    await this.apiService.insertAndpublish(model).toPromise().then(res => {
      if (res.code !== '0') {
        this.messageService.show({ content: '错误', type: 'danger' });
      } else {
        this.messageService.show({ content: '成功', type: 'success' });
        result = res;
      }
    });
    return result;
  }

  /** 查询维修工单 */
  async maintenanceWorkOrder(params: any): Promise<any> {
    let data: any = [];
    await this.apiService.maintenanceWorkOrder(params).toPromise().then((res) => {
      if (res.code !== '0') {
        this.messageService.show({ content: '错误', type: 'danger' });
        return;
      }
      if (res.items) {
        data = [...res.items];
      }
    });
    return data;
  }

  cb(time: any) {
    let str = '';
    if (time >= 86400000) {
      str = `${Math.round(time / 86400000)}天`;
    } else if (time < 86400000 && time >= 3600000) {
      str = `${Math.round(time / 3600000)}小时`;
    } else if (time < 3600000 && time >= 60000) {
      str = `${Math.round(time / 60000)}分钟`;
    } else {
      str = '0';
    }
    return str;
  }

  async queryenabled(param: any) {
    let data: any = [];
    await this.sdaApiService.queryenabled(param).toPromise().then((res) => {
      if (res.code !== '0') {
        this.messageService.show({ content: '错误', type: 'danger' });
        return;
      }
      data = [...res.items];
    });
    return data;
  }


}
